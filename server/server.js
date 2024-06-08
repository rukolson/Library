const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 7195;

// Simulated Book data
const books = [
  { BookId: 1, BookName: "Book One", Category: "Category One", DateOfAdding: "2023-06-01", CoverPicture: "cover1.png" },
  { BookId: 2, BookName: "Book Two", Category: "Category Two", DateOfAdding: "2023-06-02", CoverPicture: "cover2.png" }
];

// Simulated Category data
const categories = [
  { CategoryId: 1, CategoryName: "Category One" },
  { CategoryId: 2, CategoryName: "Category Two" }
];

app.get('/api/Book', (req, res) => {
  res.json(books);
});

app.get('/api/Category', (req, res) => {
  res.json(categories);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
