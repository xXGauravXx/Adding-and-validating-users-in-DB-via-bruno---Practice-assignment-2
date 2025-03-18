const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// Mock database (Replace with actual database integration)
const users = [
    { email: 'user@example.com', password: '$2b$10$Z3NzUXV8Zt9Zq8lf2.JoNeyG6B0/LwtdE3wZJXXVp2vh4ymXQiKi6' } // hashed password: 'password123'
];

const app = express();
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check if user exists
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ message: 'Invalid credentials.' });
    }

    res.status(200).json({ message: 'Login successful!' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});