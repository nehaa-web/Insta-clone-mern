const authModel = require("../model/auth.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function RegisterControll(req, res) {
  const { username, email, password, bio, profileImg } = req.body;

  const isUserAlreadyExist = await authModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist)
    return res.status(409).json({
      message:
        isUserAlreadyExist.email == email
          ? "Email already exist"
          : "Username already exist",
    });

  const hash = await bcrypt.hash(password, 10);

  const user = await authModel.create({
    username,
    email,
    bio,
    profileImg,
    password: hash,
  });

  const token = jwt.sign(
    { id: user.id, email: user.email  },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Registored succesfully ",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  });
}

async function loginControll(req, res) {
  const { username, email, password } = req.body;

  const user = await authModel.findOne({
    $or: [{ username }, { email }],
  }).select("+password")

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "password is Invalid",
    });
  }

  const token = jwt.sign({ id: user._id , username: user.username   } , process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "User Logined succesfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  });
}
async function getMeControll(req, res) {
 
  const userId = req.user.id

  const user = await authModel.findById(userId)

  res.status(201).json({
   
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  });
}

module.exports = {
  RegisterControll,
  loginControll,
  getMeControll
};
