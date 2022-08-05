const express = require("express");
const Car = require("../models/Car");
const { body, validationResult } = require("express-validator");

const router = express.Router();

//ROUTE 1: Get all details using: GET '/api/data/getdata
router.get("/fetchalldata", async (req, res) => {
  //If there are error(s), return bad request status and error(s)
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

  try {
    const car = await Car.find();
    res.json(car);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 2: Add a new car using: POST '/api/data/addcar
router.post(
  "/addcar",
  [body("car_name", "Enter valid car name").exists()],
  async (req, res) => {
    //If there are error(s), return bad request status and error(s)
    const errors = validationResult(req);
    try {
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }

    const { car_name, quantity } = req.body;

    try {
      const car = new Car({
        car_name,
        quantity
      });

      const savedCar = await car.save();
      res.json(savedCar);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
  }
);

//ROUTE 3: Updating an existing note using: PUT '/api/notes/updatenote/:id 
router.put("/updatecar/:id", async (req, res) => {
  //If there are error(s), return bad request status and error(s) 
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
  const { car_name, quantity } = req.body;
  try {
    //Create a new car
    const newCar = {};
    if (car_name) {
      newCar.car_name = car_name;
    }
    if (quantity) {
      newCar.quantity = quantity;
    }

    //Find the car to be update and update it
    let car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).send("Not found");
    }

    //Updating the car
    car = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: newCar },
      { new: true }
    );
    res.json({ car });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;