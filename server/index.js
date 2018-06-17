const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const Twitter = require('twitter')

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_TOKEN_SECRET,
})

app.set('port', port)
app.use('/api/', bodyParser.json())

app.post('/api/emit_new_name', (req, res) => {
  client.post('account/update_profile', {name: `(/ɯ̹t͡ɕʲi/) ${req.body.name}`}, function(error, data, response) {
    if (!error) {
      // success
      res.status(201).json(data)
    }
    else {
      // error
      res.status(200).json({ error: '不正なリクエストです' })
    }
  });
})


const config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const nuxt = new Nuxt(config)

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(nuxt.render)
app.listen(port, host)

console.log(`Server listening on http://${host}:${port}`)

