const express = require("express");

const router = express.Router();

// Temporary in-memory data
const items = [
  {
    id: 1,
    name: "Node.js",
    description: "JavaScript runtime for backend development"
  },
  {
    id: 2,
    name: "Express.js",
    description: "Framework for building REST APIs"
  }
];

// GET /api/items
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: items.length,
    data: items
  });
});

// GET /api/items/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const item = items.find((item) => item.id === id);

  if (!item) {
    return res.status(404).json({
      success: false,
      message: "Item not found"
    });
  }

  res.status(200).json({
    success: true,
    data: item
  });
});

// POST /api/items
router.post("/", (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      success: false,
      message: "Name and description are required"
    });
  }

  const newItem = {
    id: items.length + 1,
    name,
    description
  };

  items.push(newItem);

  res.status(201).json({
    success: true,
    message: "Item created successfully",
    data: newItem
  });
});

module.exports = router;