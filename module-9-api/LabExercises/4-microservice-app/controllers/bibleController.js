'use strict';

const axios = require('axios');

const getBibleVerse = async (req, res) => {
  const { book, chapter, verse } = req.query;

  if (!book || !chapter) {
    return res
      .status(400)
      .json({ error: 'Please indicate both Book and Chapter' });
  }
  // Book and chapter are required, verse is optional
  let url = `https://bible-api.com/${encodeURIComponent(book)}%20${chapter}`;
  if (verse) url += `:${verse}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Bible verse' });
  }
};

module.exports = { getBibleVerse };
