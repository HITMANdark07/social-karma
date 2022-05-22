import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { OAuth2Client } from "google-auth-library";
import { errorHandler } from "../helpers/dbErrorHandler.js";
import { GOOGLE_CLIENT_ID, NODE_JWT_SECRET, SOCKET_ORIGIN } from "../constants.js";
import { sendMail } from "../services/mail.services.js";
import { signedUpMailTemplate } from '../services/mail.templates.js';

const clinet = new OAuth2Client(GOOGLE_CLIENT_ID);

export const userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }
    req.profile = user;
    next();
  });
};
export const getProfile = (req, res) => {
  const { _id, name, email, activated, photo, role, verified } = req.profile;
  const token = jwt.sign({ _id: _id }, process.env.JWT_SECRET);
  return res.status(200).json({
    token,
    user: {
      _id,
      name,
      email,
      activated,
      photo,
      role,
      verified,
    },
  });
};
export const list = async (req, res) => {
  let q = {};
  let qry = req.query;
  let limit = qry.limit || 10;
  let skip = qry.skip || 0;
  if (qry?.role) {
    q["role"] = qry?.role;
  }
  let total = await User.countDocuments({});
  User.find(q)
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .sort({ createdAt: -1 })
    .exec((err, users) => {
      if (err || !users) {
        return res.status(400).json({
          message: "Failed to fetch Users",
        });
      }
      return res.status(200).json({
        total: total,
        users: users,
      });
    });
};

function generateOTP() {
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export const requireSignin = expressjwt({
  secret: NODE_JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

export const search = (req, res) => {
  let q = { isDeleted: false };
  let qry = req.query;
  if (qry?.email) {
    q["email"] = {
      $regex: `^${qry?.email}`,
      $options: "gi",
    };
  }
  if (qry?.role) {
    q["role"] = qry?.role;
  }
  User.find(q)
    .sort({ createdAt: -1 })
    .exec((err, users) => {
      if (err || !users) {
        return res.status(400).json({
          message: "Failed to fetch Users",
        });
      }
      return res.status(200).json(users);
    });
};

export const login = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (err || !user) {
      const { idToken, name, photo, subRole } = req.body;
      clinet
        .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
        .then((response) => {
          //console.log('GOOGLE LOGIN RESPONSE',response);
          const { email_verified, email } = response.payload;
          if (email_verified) {
            console.log(name, email, photo);
            const u = new User({ name, email, photo, subRole });
            u.save(async (err, us) => {
              if (err) {
                return res.status(400).json({
                  message: errorHandler(err),
                });
              }
              await sendMail(email,name,SOCKET_ORIGIN,"Registration Email",signedUpMailTemplate);
              const token = jwt.sign({ _id: us._id }, NODE_JWT_SECRET);
              res.cookie("t", token, { expire: new Date() + 9999 });
              await res.json({
                token,
                user: us,
              });
            });
          } else {
            return res.status(400).json({
              message: "Google login failed, Try again",
            });
          }
        })
        .catch(() => {
          return res.status(400).json({
            message: "something went wrong",
          });
        });
    } else {
      if (user && user.activated === 0) {
        return res.status(400).json({
          message: "Your Account is Locked",
        });
      } else if (user && user.activated === 1) {
        const token = jwt.sign({ _id: user._id }, NODE_JWT_SECRET);
        res.cookie("t", token, { expire: new Date() + 9999 });
        return res.json({
          token,
          user: user,
        });
      } else {
        return res.status(500).json({
          message: "SOMETHING WENT WRONG",
        });
      }
    }
  });
};

export const isUser = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      message: "Access denied",
    });
  }
  next();
};
