import { ServerResponse } from 'http'
import { ServerMiddleware } from '@nuxt/types'
import Twitter from 'twitter'

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '',
  access_token_key: process.env.TWITTER_TOKEN_KEY || '',
  access_token_secret: process.env.TWITTER_TOKEN_SECRET || ''
})

interface RequestBody {
  name: string
}

const emitNewName: ServerMiddleware = function(req, res, _next) {
  const requestBody: RequestBody = (req as any).body
  if (typeof requestBody !== 'object') {
    sendResponse(res, true)
  } else {
    client.post(
      'account/update_profile',
      {
        name: requestBody.name
      },
      (error, data, _response) => {
        sendResponse(res, error, data)
      }
    )
  }
}

const sendResponse: (
  res: ServerResponse,
  error: any,
  data?: Twitter.ResponseData
) => void = (res, error, data?) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  if (!error) {
    // success
    res.statusCode = 201
    res.end(JSON.stringify(data))
  } else {
    // error
    res.statusCode = 200
    res.end(JSON.stringify({ error: '不正なリクエストです' }))
  }
}

export default emitNewName
