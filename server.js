const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const https = require('https');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { NodeHttpHandler } = require("@smithy/node-http-handler");
const { v4: uuidv4 } = require('uuid'); // We have to install UUIDs
require('dotenv').config();

const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const app = express();
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'https://konisoft.hu'], 
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Increased limit for base64 images

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
    nationality: { type: String},
    userId: { type: String, unique: true },
    videos: [{
        videoId: { type: String },
        approved: { type: Boolean, default: false },
        speedrunTime: { type: Number }
    }],
    accountCreation: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// JWT Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB error:', err));

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="hu">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Konisoft Speedruns Backend</title>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200..800&display=swap" rel="stylesheet">
        <style>
            body {
                background-color: #000000;
                margin: 0;
                padding: 30px;
                height: 100vh;
                width: 100vw;
                font-family: 'Oxanium', sans-serif;
                overflow: hidden;
                box-sizing: border-box;
                position: relative;
                color: white;
            }

            body::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
                background-size: 30px 30px;
                z-index: 0;
            }

            .content-wrapper {
                position: relative;
                z-index: 1;
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                text-align: left;
            }

            .rainbow-text {
                background: linear-gradient(-45deg, 
                     #b300ff, #ffff00, #00ff00, #0000ff, #b300ff
                );
                background-size: 200% 200%;
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                animation: rainbowShift 10s linear infinite;
            }

            pre {
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.1;
                margin: 0;
                padding: 0;
                font-weight: 800;
            }

            p {
                font-size: 14px;
                margin: 0;
                padding: 0;
                font-weight: 800;
            }

            @keyframes rainbowShift {
                0% { background-position: 0% 50%; }
                100% { background-position: 200% 50%; }
            }
        </style>
    </head>
    <body>
        <div class="content-wrapper rainbow-text">
            <pre>
 _           _         ___ _   
| |_ ___ ___|_|___ ___|  _| |_ 
| '_| . |   | |_ -| . |  _|  _|
|_,_|___|_|_|_|___|___|_| |_|  
            </pre>
            <p>Welcome to Konisoft Speedruns!</p>
            <p>The backend is live and running... o(*￣▽￣*)o</p>
        </div>
    </body>
    </html>
  `);
});

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: "No token" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Invalid token" });
        req.user = user;
        next();
    });
};

app.post('/register', async (req, res) => {
    console.log("DEBUG: ", req.body);
    try {
        const { username, email, password, nationality, imageData, fileName } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

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
            password: hashedPassword,
            nationality,
            avatarUrl: profileImageUrl,
            userId: uuidv4() // Generating an ID
        });

        await newUser.save();
        const token = jwt.sign(
            { userId: newUser.userId, username: newUser.username }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(201).json({ 
            message: "Successful registration!", 
            token: token,
            user: { username, email, userId: newUser.userId } 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "There was an error while registrating!" });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.userId, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ error: "Login error" });
    }
});

app.post('/google-login', async (req, res) => {
    const { idToken } = req.body;

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        let user = await User.findOne({ email });
        let isNewUser = false;

        if (!user) {
            isNewUser = true;
            user = new User({
                username: name,
                email: email,
                password: "GOOGLE_AUTH_USER_" + uuidv4(),
                avatarUrl: picture,
                nationality: "Unknown",
                userId: uuidv4()
            });
            await user.save();
        }

        const token = jwt.sign(
            { userId: user.userId, username: user.username }, 
            JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.json({ 
            message: "Google Login Successful", 
            token, 
            avatarUrl: user.avatarUrl,
            isNewUser: isNewUser,
            nationality: user.nationality
        });
    } catch (error) {
        console.error("Google Auth Error:", error);
        res.status(401).json({ error: "Invalid Google token" });
    }
});

app.post('/complete-google-profile', authenticateToken, async (req, res) => {
    try {
        const { nationality, imageData, fileName } = req.body;
        const userId = req.user.userId;

        let updateData = { nationality: nationality };

        if (imageData) {
            const fileKey = `avatars/${userId}-${Date.now()}-${fileName}`;
            const uploadParams = {
                Bucket: process.env.R2_BUCKET,
                Key: fileKey,
                Body: Buffer.from(imageData, 'base64'),
                ContentType: 'image/png'
            };

            await s3.send(new PutObjectCommand(uploadParams));
            updateData.avatarUrl = `${process.env.R2_PUBLIC_URL}/${fileKey}`;
        }

        const updatedUser = await User.findOneAndUpdate(
            { userId: userId },
            updateData,
            { new: true }
        );

        res.json({ message: "Google profile is ready!", user: updatedUser });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "There was an error while finishing the google profile!" });
    }
});

app.post('/update-pfp', authenticateToken, async (req, res) => {
    try {
        const { imageData, fileName } = req.body;
        const userId = req.user.userId;

        if (!imageData) {
            return res.status(400).json({ error: "No image data provided" });
        }

        const fileKey = `avatars/${userId}-${Date.now()}-${fileName}`;
        const uploadParams = {
            Bucket: process.env.R2_BUCKET,
            Key: fileKey,
            Body: Buffer.from(imageData, 'base64'),
            ContentType: 'image/png'
        };

        await s3.send(new PutObjectCommand(uploadParams));
        const profileImageUrl = `${process.env.R2_PUBLIC_URL}/${fileKey}`;

        const updatedUser = await User.findOneAndUpdate(
            { userId: userId },
            { avatarUrl: profileImageUrl },
            { new: true }
        );

        res.json({ 
            message: "Profile picture updated!", 
            avatarUrl: profileImageUrl 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update profile picture" });
    }
});

app.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.user.userId });
        if (!user) return res.status(404).json({ error: "Felhasználó nem található" });

        res.json({
            username: user.username,
            avatarUrl: user.avatarUrl,
            nationality: user.nationality,
            accountCreation: user.accountCreation
        });
    } catch (err) {
        res.status(500).json({ error: "Hiba a profil lekérésekor" });
    }
});

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY,
        secretAccessKey: process.env.R2_SECRET_KEY,
    },
    forcePathStyle: true,
    requestHandler: new NodeHttpHandler({
        httpsAgent: new https.Agent({
            rejectUnauthorized: false
        }),
    }),
});

app.post('/upload-video', verifyToken, upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file" });
        }

        const videoId = uuidv4();
        const fileExtension = req.file.originalname.split('.').pop();   
        const fileName = `${videoId}.${fileExtension}`;

        await s3.send(new PutObjectCommand({
            Bucket: process.env.R2_BUCKET || "konisoft-speedruns",
            Key: fileName,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }));

        const publicUrl = process.env.R2_PUBLIC_URL.endsWith('/') 
            ? process.env.R2_PUBLIC_URL 
            : `${process.env.R2_PUBLIC_URL}/`;
            
        const videoUrl = `${publicUrl}${fileName}`;

        const newVideo = new Video({
            videoId: videoId,
            videoUrl: videoUrl,
            uploaderId: req.user.userId,
            speedrunTime: req.body.speedrunTime,
            isAccepted: false,
            uploadDate: new Date()
        });

        await newVideo.save();

        await User.findOneAndUpdate(
            { userId: req.user.userId },
            { 
                $push: { 
                    videos: { 
                        videoId: videoId, 
                        approved: false,
                        speedrunTime: req.body.speedrunTime 
                    } 
                } 
            }
        );

        res.status(200).json({ 
            message: "Success", 
            videoId, 
            videoUrl 
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.get('/leaderboard', async (req, res) => {
    try {
        const topVideos = await Video.find({ isAccepted: true })
                                     .sort({ speedrunTime: 1 })
                                     .limit(50);

        const leaderboardData = await Promise.all(topVideos.map(async (video) => {
            const user = await User.findOne({ userId: video.uploaderId });
            return {
                username: user ? user.username : "Ismeretlen",
                avatarUrl: user ? user.avatarUrl : null,
                nationality: user ? user.nationality : "Unknown",
                speedrunTime: video.speedrunTime,
                videoUrl: video.videoUrl
            };
        }));

        res.json(leaderboardData);
    } catch (err) {
        console.error("Hiba a ranglista lekérésekor:", err);
        res.status(500).json({ error: "Szerver hiba a ranglista betöltésekor" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

const createTestData = async () => {
    try {
        const testUserId = "test-user-uuid-123";

        await User.findOneAndUpdate(
            { userId: testUserId },
            {
                username: "KONCSIEHH",
                nationality: "Iceland",
                avatarUrl: "https://i.ibb.co/8Lq8QLYN/code-geass-cc.gif",
                accountCreation: new Date()
            },
            { upsert: true, new: true }
        );

        const testVideo = new Video({
            videoId: "video-uuid-999",
            videoUrl: "https://r2.konisoft.hu/test_run.mp4",
            uploaderId: testUserId,
            speedrunTime: 741410,
            isAccepted: true,
            uploadDate: new Date()
        });

        await Video.deleteOne({ videoId: "video-uuid-999" });
        await testVideo.save();

        console.log("Siker! A teszt adatok (felhasználó + videó) létrejöttek a MongoDB-ben! ᕙ( • ‿ • )ᕗ");
    } catch (err) {
        console.error("Hiba a teszt adatok létrehozásakor:", err);
    }
};

createTestData();

console.log("Is Google ID loaded:", process.env.GOOGLE_CLIENT_ID ? "Yes" : "No");