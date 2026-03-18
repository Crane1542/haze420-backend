const express = require('express');
const cors = require('cors');
const multer = require('multer');
const db = require('./db');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Create 'uploads' folder if it doesn't exist
const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) { fs.mkdirSync(uploadDir); }
app.use('/uploads', express.static('uploads'));

// Multer Config for GCash Receipts
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, uploadDir); },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// --- 1. GET PRODUCTS ---
app.get('/products', (req, res) => {
    db.query("SELECT * FROM products", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// --- 2. POST ORDERS (The actual Checkout) ---
app.post('/orders', upload.single('proof'), (req, res) => {
    const { name, address, phone, payment, total } = req.body;
    const proof = req.file ? req.file.filename : null;

    const sql = "INSERT INTO orders (name, address, phone, payment, total, proof, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [name, address, phone, payment, total, proof, 'Pending'];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, orderId: result.insertId });
    });
});

app.listen(3000, () => console.log("Backend is LIVE at http://localhost:3000"));