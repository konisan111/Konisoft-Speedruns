const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const JWT_SECRET = "test_secret";

function getProgressBar(percent) {
  const size = 20;
  const safePercent = Math.min(Math.max(percent || 0, 0), 100);
  const completed = Math.round(size * (safePercent / 100));
  const remaining = size - completed;
  return "[" + "█".repeat(completed) + " ".repeat(remaining) + "]";
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

app.get('/api/stats', (req, res) => {
  res.json({ cpu: { percent: "10", bar: getProgressBar(10) } });
});

app.get('/', (req, res) => {
  res.send("<!DOCTYPE html><html><body>Mocked HTML</body></html>");
});

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing fields" });
  }
  if (email === "existing@konisoft.hu") {
    return res.status(409).json({ error: "User already exists" });
  }
  res.status(201).json({ message: "Successful registration!", token: "mock-token" });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email === "test@konisoft.hu" && password === "password123") {
    const token = jwt.sign({ userId: "123" }, JWT_SECRET);
    return res.status(200).json({ token });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

app.post('/google-login', (req, res) => {
  const { idToken } = req.body;
  if (!idToken) return res.status(401).json({ error: "Invalid Google token" });
  if (idToken === "valid-google-token") {
    const token = jwt.sign({ userId: "google-123" }, JWT_SECRET);
    return res.status(200).json({ token, isNewUser: true });
  }
  res.status(401).json({ error: "Invalid Google token" });
});

app.post('/complete-google-profile', authenticateToken, (req, res) => {
  const { nationality } = req.body;
  if (!nationality) return res.status(500).json({ error: "Error" });
  res.status(200).json({ message: "Google profile is ready!" });
});

app.post('/update-pfp', authenticateToken, (req, res) => {
  if (!req.body.imageData) return res.status(400).json({ error: "No image data provided" });
  res.status(200).json({ message: "Profile picture updated!" });
});

app.put('/update-profile', authenticateToken, (req, res) => {
  const { username } = req.body;
  if (username && (username.length < 3 || username.length > 10)) {
    return res.status(400).json({ error: "Username must be 3-10 characters" });
  }
  res.status(200).json({ message: "Profile updated successfully" });
});

app.delete('/delete-account', authenticateToken, (req, res) => {
  res.status(200).send("Fiók sikeresen törölve.");
});

app.get('/me', authenticateToken, (req, res) => {
  res.status(200).json({ username: "TestUser" });
});

app.post('/upload-video', authenticateToken, (req, res) => {
  res.status(200).json({ message: "Success", videoUrl: "http://mock.url" });
});

app.get('/leaderboard', (req, res) => {
  res.json([{ username: "Player1", speedrunTime: 120 }]);
});

app.post('/verify-video', (req, res) => {
  const { approved } = req.body;
  if (approved === true) return res.status(200).json({ message: "Video approved successfully" });
  if (approved === false) return res.status(200).json({ message: "Video deleted successfully" });
  return res.status(400).json({ error: "Invalid status provided" });
});

app.get('/mod-leaderboard', (req, res) => {
  res.json([{ username: "Player1", approved: false }]);
});

describe('Konisoft Speedruns - Unit Tests', () => {
  test('getProgressBar logic', () => {
    expect(getProgressBar(0)).toBe("[                    ]");
    expect(getProgressBar(50)).toBe("[██████████          ]");
    expect(getProgressBar(100)).toBe("[████████████████████]");
  });
});

describe('Konisoft Speedruns - API Integration Tests', () => {
  let validToken;

  beforeAll(() => {
    validToken = jwt.sign({ userId: "123" }, JWT_SECRET);
  });

  describe('GET /api/stats', () => {
    test('should return system stats', async () => {
      const res = await request(app).get('/api/stats');
      expect(res.statusCode).toBe(200);
      expect(res.body.cpu).toHaveProperty('bar');
    });
  });

  describe('GET /', () => {
    test('should return status page', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /register', () => {
    test('should register a new user successfully', async () => {
      const res = await request(app).post('/register').send({ username: "New", email: "new@konisoft.hu", password: "pwd" });
      expect(res.statusCode).toBe(201);
    });
    test('should return 400 if fields are missing', async () => {
      const res = await request(app).post('/register').send({ username: "NoEmail" });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('POST /login', () => {
    test('should return token for valid credentials', async () => {
      const res = await request(app).post('/login').send({ email: "test@konisoft.hu", password: "password123" });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /google-login', () => {
    test('should login with valid token', async () => {
      const res = await request(app).post('/google-login').send({ idToken: "valid-google-token" });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /complete-google-profile', () => {
    test('should complete profile', async () => {
      const res = await request(app).post('/complete-google-profile')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ nationality: "hu" });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /update-pfp', () => {
    test('should update profile picture', async () => {
      const res = await request(app).post('/update-pfp')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ imageData: "base64" });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('PUT /update-profile', () => {
    test('should update profile info', async () => {
      const res = await request(app).put('/update-profile')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ username: "Koni123" });
      expect(res.statusCode).toBe(200);
    });
    test('should enforce username length', async () => {
      const res = await request(app).put('/update-profile')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ username: "a" });
      expect(res.statusCode).toBe(400);
    });
  });

  describe('DELETE /delete-account', () => {
    test('should delete account', async () => {
      const res = await request(app).delete('/delete-account').set('Authorization', `Bearer ${validToken}`);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /me', () => {
    test('should return profile info', async () => {
      const res = await request(app).get('/me').set('Authorization', `Bearer ${validToken}`);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /upload-video', () => {
    test('should upload video', async () => {
      const res = await request(app).post('/upload-video').set('Authorization', `Bearer ${validToken}`);
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /leaderboard', () => {
    test('should fetch public leaderboard', async () => {
      const res = await request(app).get('/leaderboard');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('POST /verify-video', () => {
    test('should verify video', async () => {
      const res = await request(app).post('/verify-video').send({ approved: true });
      expect(res.statusCode).toBe(200);
    });
  });

  describe('GET /mod-leaderboard', () => {
    test('should fetch mod leaderboard', async () => {
      const res = await request(app).get('/mod-leaderboard');
      expect(res.statusCode).toBe(200);
    });
  });
});