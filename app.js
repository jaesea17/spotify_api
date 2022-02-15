const express = require('express');
const app = express();
const cors = require('cors')
const SpotifywebApi = require("spotify-web-api-node")
require("dotenv/config");

const db = require('./config/db');
const musicsRouter = require('./api/musicsRoutes');

//middlewear
app.use(express.json());
app.use(cors());

//Route middlewear
app.use('/musics', musicsRouter);

//getting user credentials
let clientId;
let clientSecret;
let redirectUri = 'https://spotify-r.herokuapp.com/'

app.post('/credentials', (req, res) => {
  clientId = req.body.clientId;
  clientSecret = req.body.clientSecret;
  res.send("success")
})

//login with credentials gotten from the client
app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifywebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: clientSecret
  })
  spotifyApi.authorizationCodeGrant(code).then(data => {
    res.json({
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in
    })
  }).catch((err) => {
    console.log(err)
    res.sendStatus(400)
  })
})

//using refresh token to keep client logged in
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifywebApi({
    redirectUri: redirectUri,
    clientId: clientId,
    clientSecret: clientSecret,
    refreshToken
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})


//printing out a welcome message when the api link is visited on the browser
app.get('/', (req, res) => {
  res.send(`<h1>Welcome to heroMusic</h1>
            `);
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}...`)
})