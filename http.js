const { get } = require('https') // use https for 'https://', http for 'http://'
const { createServer } = require('http')
const { readFile } = require('fs')

// Ajax like request:
get('https://node-http.firebaseio.com/.json', (res) => {
    let body = ''
    res.on('data', (buff) => {
        body += buff.toString()
    })
    res.on('end', () => {
        console.log(JSON.parse(body).slice(0, 10))
    })
})

// first web server
const server = createServer()

// respond with arbitrary text:
// server.on('request', (req, res) => {
//   // req and res are streams
//   // res.write('test') // write a chunk
//   res.end('test') // end the stream with a chunk
// })

// respond with an HTML file:
// server.on('request', (req, res) => {
//   readFile('index.html', (err, buff) => {
//     res.end(buff)
//   })
// })

// respond with any file (like: http-server)
// 404 if no file exists
server.on('request', ({ url }, res) => {
  const path = url.slice(-1) === '/'
    ? url.slice(1).concat('index.html')
    : url.slice(1)

  console.log('Request received for:', path)

  readFile(path, (err, buff) => {
      if (err) {
          res.statusCode = 404
          return res.end('not found\n')
      }
      res.end(buff)
  })
})

// Listen for requests on a port
server.listen(3000)
