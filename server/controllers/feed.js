// // const { validationResult } = require('express-validator/check')

// // const Post = require('../models/post');
// // const { post } = require('../routes/feed');

// // exports.getPosts = (req, res, next) => {
// //     res.status(200).json({
// //       posts: [
// //         {
// //           _id: 1,
// //           title: "First post",
// //           content: "This is my first post!",
// //           imageUrl: "images/duck.jpg",
// //           creator: {
// //             name: "DG",
// //           },
// //           createdAt: new Date(),
// //         },
// //         {
// //           _id: 2,
// //           title: "Second post",
// //           content: "This is my Secont post!",
// //           imageUrl: "images/duck.jpg",
// //           creator: {
// //             name: "Gowda",
// //           },
// //           createdAt: new Date(),
// //         },
// //       ],
// //     });
// // };
  
// // exports.createPost = (req, res, next) => {
// //     const errors = validationResult(req)
// //     if(!errors.isEmpty) {
// //       const error = new Error('validation failed,entered data is incorrect')
// //       error.statusCode = 422
// //       throw error
// //     }

// //     const title = req.body.title;
// //     const content = req.body.content;

// //     const post = new post({
// //       title: title,
// //       content: content,
// //       imageUrl: 'images/duck.jpg',
// //       creator: { name: 'kumar' }
// //     })

// //     post
// //       .save()
// //       .then(result => {
// //         res.status(201).json({
// //           message:'post created successfully',
// //           post: result
// //         })
// //       })
// //       .catch(err => {
// //         if(!err.statusCode) {
// //           err.statusCode = 500
// //         }
// //         next(err)
// //       })
// // };
  



const { validationResult } = require('express-validator/check')

const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      res.status(200).json({ message: 'Fetching posts successfull', posts: posts})
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req)
  if(!errors.isEmpty) {
    const error = new Error('Validation failed, entered data is incorrect')
    error.statusCode = 422
    throw error
  }

  if(!req.file) {
    const error = new Error('No image provided')
    error.statusCode = 422
    throw error
  }

  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.path;

  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: { name: 'Kumar' }
  })

  post
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Post created successfully',
        post: result
      })
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId

  Post.findById(postId)
    .then(post => {
      if(!post) {
        const error = new Error('Could not find the post')
        error.statusCode = 404
        throw error
      }
      res.status(200).json({message: 'post fetched', post: post})
    })
    .catch(err => {
      if(!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}