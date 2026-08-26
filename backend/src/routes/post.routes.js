const express = require("express");
const postController = require("../controller/post.controller");
const identifyUser = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const postRouter = express.Router();

postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostControll,
);

postRouter.get("/get", identifyUser, postController.getPostControll);

postRouter.get(
  "/detail/:postId",
  identifyUser,
  postController.getPostDetailControll,
);

postRouter.post("/like/:postId", identifyUser, postController.likePostControll);

postRouter.post(
  "/unlike/:postId",
  identifyUser,
  postController.unlikePostControll,
);

postRouter.get("/feed", identifyUser, postController.getFeedControll);

module.exports = postRouter;
