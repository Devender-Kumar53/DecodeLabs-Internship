import 'dotenv/config';
import express, { type Request, type Response, type NextFunction } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { db } from './prisma/db';

const app = express();
const PORT = 3000;

app.use(express.json());

const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Authentication token is required',
    });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      error: 'Authentication token is required',
    });
  }

  const jwtSecret = process.env['JWT_SECRET'];

  if (!jwtSecret) {
    console.error('JWT_SECRET is not configured');

    return res.status(500).json({
      error: 'Internal server error',
    });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    res.locals.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      error: 'Invalid or expired token',
    });
  }
};

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'DecodeLabs Project 3 - Secure Authentication API',
  });
});
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        error: 'Email and password must be strings',
      });
    }

    const existingUser = await db.orm.public.User
      .where({ email })
      .first();

    if (existingUser) {
      return res.status(409).json({
        error: 'A user with this email already exists',
      });
    }

    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
    });

    const user = await db.orm.public.User.create({
      email,
      passwordHash,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required',
      });
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return res.status(400).json({
        error: 'Email and password must be strings',
      });
    }

    const user = await db.orm.public.User
      .where({ email })
      .first();

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    const passwordMatches = await argon2.verify(
      user.passwordHash,
      password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        error: 'Invalid email or password',
      });
    }

    const jwtSecret = process.env['JWT_SECRET'];

    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not configured');
    }

    const token = jwt.sign(
      {
        sub: String(user.id),
        email: user.email,
      },
      jwtSecret,
      {
        expiresIn: '1h',
      }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Login error:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});
app.get('/api/protected', authenticateToken, (req, res) => {
  return res.status(200).json({
    message: 'Access granted to protected route',
    user: res.locals.user,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});