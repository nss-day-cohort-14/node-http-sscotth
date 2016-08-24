const { createServer } = require('http')
const { get } = require('request')
const { load } = require('cheerio')

// const url = 'https://node-http.firebaseio.com/words.json'

const server = createServer()

server.on('request', (req, res) => {
  get('https://reddit.com', (err, _, body) => {
    const $ = load(body)

    // Mock reddit example:
    //
    // $('img').attr('src', 'https://media.giphy.com/media/EoXJra2wJMP1C/giphy.gif')
    // $('a.title').text('It\'s Hump Day!')
    // res.end($.html())

    // Scrape reddit example:
    // Goal: JSON object:
    // [
    //  {
    //    title: 'Trump did stuff today',
    //    link: 'http://cnn.com'
    //  },
    //  {
    //    title: 'Trump did even more stuff today',
    //    link: 'http://abcnews.com'
    //  }
    // ]

    // const topStories = []
    // for (let i = 0, titles = $('a.title'); i < titles.length; i++) {
    //   const $title = $(titles[i])
    //   topStories.push({
    //     title: $title.text(),
    //     link: $title.attr('href')
    //   })
    // }

    // const topStories = []
    // $('a.title').each((i, title) => {
    //   const $title = $(title)
    //   topStories.push({
    //     title: $title.text(),
    //     link: $title.attr('href')
    //   })
    // })

    const topStories = $('a.title')
      .toArray()
      .map($) // .map((el) => $(el))
      .map($el => ({
        title: $el.text(),
        link: $el.attr('href')
      }))

    res.end(JSON.stringify(topStories))
  })
})

server.listen(8080)

// get(url, (res) => {
//  let body = ''
//  res.on('data', (buff) => {
//    body += buff.toString()
//  }

//  res.on('end', () => {
//    console.log(JSON.parse(body).slice(0,10))
//  })
// })

// get(url, (err, res, body) => {
//  console.log(JSON.parse(body).slice(0,10))
// })

// get(url).pipe(process.stdout)
