const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Resume download route (serves file public/resume.pdf)
app.get('/resume', (req, res) => {
  const resumePath = path.join(__dirname, 'public', 'resume.pdf');
  if (fs.existsSync(resumePath)) {
    res.download(resumePath, 'Ayush_Mishra_Resume.pdf');
  } else {
    res.status(404).send('Resume not found on server.');
  }
});

// Contact form endpoint: saves messages to messages.json
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing fields' });
  }

  const messagesFile = path.join(__dirname, 'messages.json');
  let messages = [];
  if (fs.existsSync(messagesFile)) {
    try {
      messages = JSON.parse(fs.readFileSync(messagesFile, 'utf8'));
    } catch (e) {
      messages = [];
    }
  }

  const newMsg = {
    id: Date.now(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  messages.push(newMsg);
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));

  console.log('New contact message saved:', newMsg);

  // Optionally: send email here using nodemailer (instructions below)
  res.json({ ok: true, message: 'Message saved. Thank you!' });
});

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
