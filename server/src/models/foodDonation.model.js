import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const LocationSchema = mongoose.Schema(
  {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const foodDonationSchema = new mongoose.Schema(
  {
    donator: {
      type: ObjectId,
      ref: "User",
    },
    volunteer: {
      type: ObjectId,
      ref: "User",
    },
    location: LocationSchema,
    status: {
      type: String,
      enum: ["Pending", "Assigned", "Completed"],
      default: "Pending",
    },
    contact: {
      type: String,
      required: true,
    },
    foodDesc: {
      type: String,
    },
    foodWeight: {
      type: String,
    },
    expectedExpiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const FoodDonation = mongoose.model("FoodDonation", foodDonationSchema);

export default FoodDonation;
