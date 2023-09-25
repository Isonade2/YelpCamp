const mongoose = require("mongoose");
const path = require("path");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
mongoose
  .connect("mongodb+srv://Isonade:5164@yelpcamp.xvjzsl3.mongodb.net/yelp")
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.log("ERROR:", err.message);
  });

const db = mongoose.connection;

const sample = (array) => array[Math.floor(Math.random() * array.length)];

seedDB = async () => {
  await Campground.deleteMany({}).then(() => {
    console.log("deleted all campgrounds");
  });

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://source.unsplash.com/collection/483251`,
      description:
        "scientific yesterday send gently usually hair success list muscle choose few tree wonder wood giant sort eat stuck five real graph task busy both",
      price: Math.floor(Math.random() * 20) + 10,
    });
    await camp.save();
  }
};

seedDB();
