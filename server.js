const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid'); // We have to install UUIDs
const API_KEY = process.env.API_KEY; // API Key to validate every request made to the RESTFul backend
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for base64 images

// User schematics
const userSchema = new mongoose.Schema({
    username: { type: String, required: true }, // Username
    email: { type: String, required: true, unique: true }, // Email address of the user
    password: { type: String, required: true }, // Password for user
    avatarUrl: { type: String }, // R2 address link
    nationality: { type: String },
    userId: { type: String, unique: true } // UUID
});

// API Key Authentication
const authenticate = (req, res, next) => {
    const userApiKey = req.headers['x-api-key'];
    
    if (userApiKey && userApiKey === API_KEY) {
        next();
    } else {
        res.status(403).json({ error: "Unauthorized: Invalid API Key" });
    }
};

const User = mongoose.model('User', userSchema);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB error:', err));

// Cloudflare R2 connection
const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

// Backend responses
app.get('/', (req, res) => {
  res.send('The Konisoft-Speedruns backend is live!');
});

app.post('/register', authenticate, async (req, res) => {
    try {
        const { username, email, password, nationality, imageData, fileName } = req.body;

        // Uploading image to R2
        let profileImageUrl = "";
        if (imageData) {
            const fileKey = `avatars/${Date.now()}-${fileName}`;
            const uploadParams = {
                Bucket: process.env.R2_BUCKET,
                Key: fileKey,
                Body: Buffer.from(imageData, 'base64'),
                ContentType: 'image/png'
            };

            await s3.send(new PutObjectCommand(uploadParams));
            // Assembling the public URL
            profileImageUrl = `${process.env.R2_PUBLIC_URL}/${fileKey}`;
        }

        // Saving in MongoDB
        const newUser = new User({
            username,
            email,
            password,
            nationality,
            avatarUrl: profileImageUrl,
            userId: uuidv4() // Generating an ID
        });

        await newUser.save();
        res.status(201).json({ message: "Successful registration!", user: newUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "There was an error while registrating!" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});