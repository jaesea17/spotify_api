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

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifywebApi({
    redirectUri: "https://spotify-r.herokuapp.com/",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
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

app.post("/login", (req, res) => {

  const code = req.body.code
  const spotifyApi = new SpotifywebApi({
    redirectUri: "https://spotify-r.herokuapp.com/",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
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

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to heroMusic</h1>
              `);
  });

app.get('*', (req, res) => httpResponse(res, {
    statusCode: 400,
    status: 'failure',
    message: 'Oops! Not found',
  }));


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}...`)
})