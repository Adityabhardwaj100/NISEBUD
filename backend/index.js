const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');

dotenv.config();

// Required environment variables
const requiredEnv = ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET', 'SESSION_SECRET', 'MONGODB_URI'];
const missingEnv = requiredEnv.filter((env) => !process.env[env]);

if (missingEnv.length > 0) {
    console.error('\x1b[31m%s\x1b[0m', 'Missing required environment variables:', missingEnv.join(', '));
    console.error('\x1b[33m%s\x1b[0m', 'Please create a .env file in the backend directory with these values.');
    process.exit(1);
}

// Passport config
require('./config/passport');

const app = express();

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        credentials: true,
    })
);

// Session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Set to true if using https
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
        },
    })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect(process.env.CLIENT_URL + '/dashboard');
    }
);

app.get('/auth/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect(process.env.CLIENT_URL);
    });
});

app.get('/api/user', (req, res) => {
    if (req.user) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

// Mock dashboard data
app.get('/api/dashboard/stats', (req, res) => {
    res.json({
        coursesCompleted: 12,
        lessonsCompleted: 45,
        streak: 5,
        badges: [
            { id: 1, name: 'Quick Learner', icon: 'zap' },
            { id: 2, name: '7-Day Streak', icon: 'calendar' },
            { id: 3, name: 'AI Explorer', icon: 'cpu' },
        ],
    });
});

app.get('/api/learning-paths', (req, res) => {
    res.json([
        {
            id: 1,
            title: 'AI Fundamentals',
            description: 'Master the basics of Artificial Intelligence and Machine Learning.',
            difficulty: 'Beginner',
            duration: '10 hours',
            progress: 65,
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
        },
        {
            id: 2,
            title: 'Generative AI Applications',
            description: 'Learn how to build and deploy generative AI solutions.',
            difficulty: 'Intermediate',
            duration: '15 hours',
            progress: 30,
            image: 'https://images.unsplash.com/photo-1676299081847-824911ff586d?w=800&auto=format&fit=crop&q=60',
        },
        {
            id: 3,
            title: 'Cloud Computing Basics',
            description: 'Understand the core concepts of cloud platforms and services.',
            difficulty: 'Beginner',
            duration: '8 hours',
            progress: 0,
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60',
        },
    ]);
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/learning-platform')
    .then(() => {
        console.log('Connected to MongoDB');
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.error('MongoDB connection error:', err));
