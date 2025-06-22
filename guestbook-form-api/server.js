const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const guestbookFile = './guestbook.json';

// Ensure the guestbook file exists
if (!fs.existsSync(guestbookFile)) {
    fs.writeFileSync(guestbookFile, '[]');
}

// GET all entries
app.get('/api/guestbook', (req, res) => {
    fs.readFile(guestbookFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading guestbook data.');
        }
        res.json(JSON.parse(data));
    });
});

// POST a new entry
app.post('/api/guestbook', (req, res) => {
    const { name, comment } = req.body;

    if (!name || !comment) {
        return res.status(400).send('Name and comment are required.');
    }

    const newEntry = {
        id: Date.now(),
        name,
        comment,
        date: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }),
    };

    fs.readFile(guestbookFile, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading guestbook data.');
        }
        const entries = JSON.parse(data);
        entries.push(newEntry);
        fs.writeFile(guestbookFile, JSON.stringify(entries, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error saving new entry.');
            }
            res.status(201).json(newEntry);
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});