const express = require("express");
const followController = require("../Controller/follow.controller");
const identifyUser = require("../middleware/auth.middleware");

const followRouter = express.Router();

followRouter.post(
    "/follow/:username",
    identifyUser,
    followController.followControll
);

followRouter.delete(
    "/unfollow/:username",
    identifyUser,
    followController.unfollowControll
);

followRouter.patch(
    "/follow/accept/:requestId",
    identifyUser,
    followController.acceptfollowControll
);

followRouter.patch(
    "/follow/reject/:requestId",
    identifyUser,
    followController.rejectfollowControll
);

module.exports = followRouter;