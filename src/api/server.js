// server.js
const express = require('express');
const axios = require('axios');

const app = express();
const CLIENT_ID = 'fj2WvQTOmkIhKHJZW67L';
const CLIENT_SECRET = 'HmWv1kqeBG';
const REDIRECT_URI = 'http://localhost:3000/auth/naver/callback';

app.get('/auth/naver', (req, res) => {
  const state = Math.random().toString(36).substring(2, 15);
  const apiURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&state=${state}`;
  res.redirect(apiURL);
});

app.get('/auth/naver/callback', async (req, res) => {
  const { code, state } = req.query;

  try {
    const tokenResponse = await axios.get(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&state=${state}`
    );

    const { access_token } = tokenResponse.data;

    // Get user profile
    const userResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const userProfile = userResponse.data;
    res.send(userProfile);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(4000, () => {
  console.log('Server is running on http://localhost:3000');
});
