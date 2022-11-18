// exports.getPosts = (req, res, next ) =>{
//     res.status(200).json({
//         posts:[{
//             _id: 1,
//             title:'first post',
//             content:'this is my first post!',
//             imageUrl:'image/duck.jpg',
//             creator:{
//                 name:"kumar"
//             },
//             createdAt: new Date()
//         },{
//             _id: 2,
//             title:'Second post',
//             content:'this is my second post!',
//             imageUrl:'image/duck.jpg',
//             creator:{
//                 name:"raju"
//             },
//             createdAt: new Date()
//         }]
//     })
// }

exports.getPosts = (req, res, next) => {
    res.status(200).json({
      posts: [
        {
          _id: 1,
          title: "First post",
          content: "This is my first post!",
          imageUrl: "images/duck.jpg",
          creator: {
            name: "Ravindra",
          },
          createdAt: new Date(),
        },
        {
          _id: 2,
          title: "Second post",
          content: "This is my Secont post!",
          imageUrl: "images/duck.jpg",
          creator: {
            name: "Vishal",
          },
          createdAt: new Date(),
        },
      ],
    });
  };
  

exports.createPost = (req, res, next ) =>{
    const title = req.body.title
    const content = req.body.content

    req.status(201).json({
        message: 'Post created successfully',
        post:{
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: {
                name:'Rajesh'
            },
            createdAt:new Date()
        }
    })
  
}