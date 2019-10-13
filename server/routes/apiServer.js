var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser')
const cors = require('cors')
const categories = require('./categories')
const posts = require('./posts')
const comments = require('./comments')
const config = require('./config')

router.use(cors())

router.use((req, res, next) => {
    const token = req.get('Authorization')
  
    if (token) {
      req.token = token
      next()
    } else {
      res.status(403).send({
        error: 'Please provide an Authorization header to identify yourself (can be whatever you want)'
      })
    }
  })


/* GET home page. */
router.get('/', function(req, res, next) {
    const help = `
    <pre>
      Welcome to the Udacity Readable API!
  
      Use an Authorization header to work with your own data:
  
      fetch(url, { headers: { 'Authorization': 'whatever-you-want' }})å
  
      The following endpoints are available:
  
      GET /categories
        USAGE:
          Get all of the categories available for the app. List is found in categories.js.
          Feel free to extend this list as you desire.
  
      GET /:category/posts
        USAGE:
          Get all of the posts for a particular category
  
      GET /posts
        USAGE:
          Get all of the posts. Useful for the main page when no category is selected.
  
      POST /posts
        USAGE:
          Add a new post
  
        PARAMS:
          id - UUID should be fine, but any unique id will work
          timestamp - timestamp in whatever format you like, you can use Date.now() if you like
          title - String
          body - String
          author - String
          category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.
  
      GET /posts/:id
        USAGE:
          Get the details of a single post
  
      POST /posts/:id
        USAGE:
          Used for voting on a post
        PARAMS:
          option - String: Either "upVote" or "downVote"
  
      PUT /posts/:id
        USAGE:
          Edit the details of an existing post
        PARAMS:
          title - String
          body - String
  
      DELETE /posts/:id
        USAGE:
          Sets the deleted flag for a post to 'true'.
          Sets the parentDeleted flag for all child comments to 'true'.
  
      GET /posts/:id/comments
        USAGE:
          Get all the comments for a single post
  
      POST /comments
        USAGE:
          Add a comment to a post
  
        PARAMS:
          id: Any unique ID. As with posts, UUID is probably the best here.
          timestamp: timestamp. Get this however you want.
          body: String
          author: String
          parentId: Should match a post id in the database.
  
      GET /comments/:id
        USAGE:
          Get the details for a single comment
  
      POST /comments/:id
        USAGE:
          Used for voting on a comment.
        PARAMS:
          option - String: Either "upVote" or "downVote"
  
      PUT /comments/:id
        USAGE:
          Edit the details of an existing comment
  
        PARAMS:
          timestamp: timestamp. Get this however you want.
          body: String
  
      DELETE /comments/:id
        USAGE:
          Sets a comment's deleted flag to 'true'
   </pre>
    `
  
    res.send(help)
  });    

router.get('/categories', (req, res) => {
    categories.getAll(req.token)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

router.get('/:category/posts', (req, res) => {
    posts.getByCategory(req.token, req.params.category)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

router.get('/posts', (req, res) => {
    posts.getAll(req.token)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                 error: 'There was an error.'
          })
        }
      )
})

router.post('/posts', bodyParser.json(), (req, res) => {
    posts.add(req.token, req.body)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                 error: 'There was an error.'
          })
        }
      )
})

router.get('/posts/:id', (req, res) => {
    posts.get(req.token, req.params.id)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

router.delete('/posts/:id', (req, res) => {
    posts.disable(req.token, req.params.id)
      .then(post => comments.disableByParent(req.token, post))
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

router.post('/posts/:id', bodyParser.json(), (req, res) => {
    const { option } = req.body
    const id = req.params.id
    posts.vote(req.token, id, option)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

router.put('/posts/:id', bodyParser.json(), (req, res) => {
    posts.edit(req.token, req.params.id, req.body)
      .then(
        (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

router.get('/posts/:id/comments', (req, res) => {
    comments.getByParent(req.token, req.params.id)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

router.get('/comments/:id', (req, res) => {
    comments.get(req.token, req.params.id)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

router.put('/comments/:id', bodyParser.json(), (req, res) => {
    comments.edit(req.token, req.params.id, req.body)
      .then(
        (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

router.post('/comments', bodyParser.json(), (req, res) => {
    comments.add(req.token, req.body)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

router.post('/comments/:id', bodyParser.json(), (req, res) => {
    const { option } = req.body
    comments.vote(req.token, req.params.id, option)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})

router.delete('/comments/:id', (req, res) => {
    comments.disable(req.token, req.params.id)
      .then(
          (data) => res.send(data),
          (error) => {
              console.error(error)
              res.status(500).send({
                  error: 'There was an error.'
              })
          }
      )
})



module.exports = router;
