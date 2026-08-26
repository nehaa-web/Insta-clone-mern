const followModel = require("../model/user.model");
const userModel = require("../model/user.model");


// Follow User
async function followControll(req, res) {

    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    // Cannot follow yourself
    if (followerUsername === followeeUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        });
    }

    // Check if user exists
    const isFolloweeExist = await userModel.findOne({
        username: followeeUsername
    });

    if (!isFolloweeExist) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    // Check if follow request already exists
    const alreadyFollow = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    });

    if (alreadyFollow) {
        return res.status(400).json({
            message: "Follow request already exists"
        });
    }

    // Create follow request
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    });

    res.status(201).json({
        message: "Follow request sent successfully",
        follow: followRecord
    });
}


// Unfollow User
async function unfollowControll(req, res) {

    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "accepted"
    });

    if (!isUserFollowing) {
        return res.status(400).json({
            message: "You are not following this user"
        });
    }

    await followModel.findOneAndDelete({
        follower: followerUsername,
        followee: followeeUsername,
        status: "accepted"
    });

    res.status(200).json({
        message: "Unfollowed successfully"
    });
}


// Accept Follow Request
async function acceptfollowControll(req, res) {

    const request = await followModel.findByIdAndUpdate(
        req.params.requestId,
        {
            status: "accepted"
        },
        {
            new: true
        }
    );

    if (!request) {
        return res.status(404).json({
            message: "Follow request not found"
        });
    }

    res.status(200).json({
        message: "Follow request accepted",
        request
    });
}


// Reject Follow Request
async function rejectfollowControll(req, res) {

    const request = await followModel.findByIdAndUpdate(
        req.params.requestId,
        {
            status: "rejected"
        },
        {
            new: true
        }
    );

    if (!request) {
        return res.status(404).json({
            message: "Follow request not found"
        });
    }

    res.status(200).json({
        message: "Follow request rejected",
        request
    });
}


module.exports = {
    followControll,
    unfollowControll,
    acceptfollowControll,
    rejectfollowControll
};