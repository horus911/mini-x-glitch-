const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });
app.use(express.static('public'));
app.use(express.json());

const postsFile = './posts.json';
let posts = fs.existsSync(postsFile) ? JSON.parse(fs.readFileSync(postsFile)) : [];

// API: Get all posts
app.get('/api/posts', (req, res) => {
  res.json(posts.reverse());
});

// API: New post
app.post('/api/post', upload.single('media'), (req, res) => {
  const { text, username } = req.body;
  const media = req.file ? '/uploads/' + req.file.filename : null;
  const post = { id: Date.now(), text, username, media, date: new Date().toISOString() };
  posts.push(post);
  fs.writeFileSync(postsFile, JSON.stringify(posts));
  res.json({ success: true });
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, () => console.log('Mini X lancé sur port', PORT));