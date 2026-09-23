import { db } from './prisma/db';
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'DecodeLabs Project 2 - Database CRUD API',
  });
});

app.post('/api/users', async (req, res) => {
  try {
    const { email, age } = req.body;

    if (!email || age === undefined) {
      return res.status(400).json({
        error: 'Email and age are required',
      });
    }

    if (!Number.isInteger(age) || age < 0) {
      return res.status(400).json({
        error: 'Age must be a non-negative integer',
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

    const user = await db.orm.public.User.create({
      email,
      age,
      isActive: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await db.orm.public.User.all();

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: 'Invalid user ID',
      });
    }

    const user = await db.orm.public.User
      .where({ id })
      .first();

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});
app.put('/api/users/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { email, age, isActive } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: 'Invalid user ID',
      });
    }

    if (age !== undefined && (!Number.isInteger(age) || age < 0)) {
      return res.status(400).json({
        error: 'Age must be a non-negative integer',
      });
    }

    if (isActive !== undefined && typeof isActive !== 'boolean') {
      return res.status(400).json({
        error: 'isActive must be a boolean',
      });
    }

    if (email !== undefined) {
      const duplicateUser = await db.orm.public.User
        .where({ email })
        .first();

      if (duplicateUser && duplicateUser.id !== id) {
        return res.status(409).json({
          error: 'A user with this email already exists',
        });
      }
    }

    const updatedUser = await db.orm.public.User
      .where({ id })
      .update({
        ...(email !== undefined && { email }),
        ...(age !== undefined && { age }),
        ...(isActive !== undefined && { isActive }),
      });

    if (!updatedUser) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});
app.delete('/api/users/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: 'Invalid user ID',
      });
    }

    const deletedUser = await db.orm.public.User
      .where({ id })
      .delete();

    if (!deletedUser) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);

    return res.status(500).json({
      error: 'Internal server error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});