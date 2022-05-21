import { SOCKET_ORIGIN } from "../constants.js";
import { errorHandler } from "../helpers/dbErrorHandler.js";
import FoodDonation from "../models/foodDonation.model.js";
import User from "../models/user.model.js";
import { sendMail } from "../services/mail.services.js";
import { assginingTask } from "../services/mail.templates.js";

export const createFoodDonation = (req, res) => {
  const { donator, location, foodDesc, contact, foodWeight, expectedExpiry } =
    req.body;

  const foodDonation = new FoodDonation({
    donator,
    location,
    foodDesc,
    contact,
    foodWeight,
    expectedExpiry,
  });

  foodDonation.save((err, fd) => {
    if (err) {
      return res.status(400).json({
        message: errorHandler(err),
      });
    }
    return res.status(200).json(fd);
  });
};

export const assignVolenteer = async(req, res) => {
  const { id, volunteer } = req.body;
  const user  = await User.findById(volunteer);
  if(!user){
    return res.status(400).json({
      message:"User Not FOund"
    })
  }
  FoodDonation.findByIdAndUpdate(
    id,
    {
      $set: {
        volunteer: volunteer,
        status:'Assigned'
      },
    },
    { new: true },
    async(err, fd) => {
      if (err) {
        return res.status(400).json({
          message: errorHandler(err),
        });
      }
      await sendMail(user.email,user.name,SOCKET_ORIGIN,"Assignment Email",assginingTask);
      return res.status(200).json(fd);
    }
  );
};

export const updateStatus = (req, res) => {
  const { id, status } = req.body;
  FoodDonation.findByIdAndUpdate(
    id,
    {
      $set: {
        status: status,
      },
    },
    { new: true },
    (err, fd) => {
      if (err) {
        return res.status(400).json({
          message: errorHandler(err),
        });
      }
      return res.status(200).json(fd);
    }
  );
};

export const listAssignedTasks = (req, res) => {
  const user = req.profile._id;
  FoodDonation.find({
    volunteer: user,
    status:'Assigned'
  }).exec((err, fds) => {
    if (err || !fds) {
      return res.status(400).json({
        message: errorHandler(err),
      });
    }
    return res.status(200).json(fds);
  });
};

export const listDonations = (req, res) => {
  const user = req.profile._id;
  FoodDonation.find({
    donator: user,
  }).exec((err, fds) => {
    if (err || !fds) {
      return res.status(400).json({
        message: errorHandler(err),
      });
    }
    return res.status(200).json(fds);
  });
};
