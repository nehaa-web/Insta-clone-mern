const postModel = require("../model/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../model/like.model");

const Imgkit = new ImageKit({
  privatKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostControll(req, res) {
  const file = await Imgkit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    postImg: file.url,
    users: req.user.id,
  });

  res.status(201).json({
    message: "Post created succesfully",
    post,
  });
}
async function getPostControll(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    users: userId,
  });

  res.status(200).json({
    message: "Post fetched succesfully",
    posts,
  });
}

async function getPostDetailControll(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post is not found",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content",
    });
  }

  res.status(201).json({
    message: "Post created succesfully",
    post,
  });
}
async function likePostControll(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  console.log("REQ.USER:", req.user);
console.log("USERNAME:", req.user?.username);
  const like = await likeModel.create({
    post: postId,
    user: userId,
  });

  res.status(201).json({
    message: "Post Liked succesfully",
    like,
  });
}

async function unlikePostControll(req, res) {
  const userId = req.user.id ;
  const postId = req.params.postId;

  const isLiked = await likeModel.findOne({
    post: postId,
    user: userId,
  });

if(!isLiked){
  return res.status(400).json({
    message: "Post didn't like"
  })
}
await likeModel.findOneAndDelete({ _id : isLiked._id })

return res.status(200).json({
  message : "post unliked succesfully"
})

}

async function getFeedControll(req, res) {
  const user = req.user;
  const posts = await Promise.all(
    (await postModel.find().populate("users").lean()).map(async (post) => {
      // typeof post => mongooseobject
      // lean()
      // typeof post => Object
      const likes = await likeModel.find();

      const isLiked = await likeModel.findOne({
        user: user.id,
        post: post._id,
      });
      post.isLiked = !!isLiked;
      // post.isLiked = Boolean(isLiked)

      console.log("LIKE FOUND:", isLiked);

      return post;
    }),
  );

  res.status(200).json({
    message: "posts fetched succesfully",
    posts,
  });
}

module.exports = {
  createPostControll,
  getPostControll,
  getPostDetailControll,
  likePostControll,
  unlikePostControll,
  getFeedControll,
};
