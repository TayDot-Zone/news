import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.CURRENTS_API_KEY;

// Latest news
app.get('/api/latest', async (req, res) => {
  try {
    const { language, category, region } = req.query;
    let url = `https://api.currentsapi.services/v1/latest-news?apiKey=${API_KEY}`;
    if(language) url += `&language=${language}`;
    if(category) url += `&category=${category}`;
    if(region) url += `&country=${region}`;

    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch(err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Search news
app.get('/api/search', async (req, res) => {
  try {
    const { keywords } = req.query;
    const url = `https://api.currentsapi.services/v1/search?keywords=${encodeURIComponent(keywords)}&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch(err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Trending news
app.get('/api/trending', async (req, res) => {
  try {
    const url = `https://api.currentsapi.services/v1/trending?apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch(err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
