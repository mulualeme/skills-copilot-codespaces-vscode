// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

// Read comments from file
function readComments() {
  const comments = fs.readFileSync('comments.json', 'utf8');
  return JSON.parse(comments);
}

// Write comments to file
function writeComments(comments) {
  fs.writeFileSync('comments.json', JSON.stringify(comments, null, 2));
}

// Get all comments
app.get('/comments', (req, res) => {
  const comments = readComments();
  res.json(comments);
});

// Add a comment
app.post('/comments', (req, res) => {
  const comments = readComments();
  const comment = req.body;
  comments.push(comment);
  writeComments(comments);
  res.json(comment);
});

// Start web server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

// Test the server
// curl http://localhost:3000/comments
// curl -X POST -H 'Content-Type: application/json' -d '{"author": "Alice", "content": "Hello"}' http://localhost:3000/comments
// curl http://localhost:3000/comments