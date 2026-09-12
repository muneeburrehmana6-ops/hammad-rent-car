// Run with: npm run seed
// Populates the database with an admin user and sample cars so the frontend
// has something to show immediately.
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Car from "../models/Car.js";

dotenv.config();

const run = async () => {
  await connectDB();

  await User.deleteMany({ email: "admin@hammadrentcar.com" });
  await Car.deleteMany({});

  const admin = await User.create({
    name: "Hammad Admin",
    email: "admin@hammadrentcar.com",
    password: "admin123",
    role: "admin",
  });

  const sampleCars = [
    {
      title: "Toyota Corolla Altis 2023",
      brand: "Toyota",
      model: "Corolla Altis",
      year: 2023,
      category: "Sedan",
      transmission: "Automatic",
      fuelType: "Petrol",
      seats: 5,
      pricePerDay: 8500,
      images: [],
      description: "Comfortable and fuel-efficient sedan, perfect for city and highway trips.",
      features: ["AC", "Bluetooth", "Cruise Control", "Backup Camera"],
      location: { city: "Islamabad", pickupPoint: "Blue Area, Islamabad" },
      owner: admin._id,
    },
    {
      title: "Honda Civic 2022",
      brand: "Honda",
      model: "Civic",
      year: 2022,
      category: "Sedan",
      transmission: "Automatic",
      fuelType: "Petrol",
      seats: 5,
      pricePerDay: 9500,
      images: [],
      description: "Sporty and stylish, great for a smooth premium drive.",
      features: ["AC", "Sunroof", "Bluetooth", "Alloy Rims"],
      location: { city: "Rawalpindi", pickupPoint: "Saddar, Rawalpindi" },
      owner: admin._id,
    },
    {
      title: "Suzuki Alto VXL 2023",
      brand: "Suzuki",
      model: "Alto",
      year: 2023,
      category: "Economy",
      transmission: "Manual",
      fuelType: "Petrol",
      seats: 4,
      pricePerDay: 4500,
      images: [],
      description: "Budget-friendly hatchback, ideal for short city trips.",
      features: ["AC", "Power Steering"],
      location: { city: "Rawalpindi", pickupPoint: "Committee Chowk, Rawalpindi" },
      owner: admin._id,
    },
    {
      title: "Toyota Fortuner 2023",
      brand: "Toyota",
      model: "Fortuner",
      year: 2023,
      category: "SUV",
      transmission: "Automatic",
      fuelType: "Diesel",
      seats: 7,
      pricePerDay: 22000,
      images: [],
      description: "Powerful 4x4 SUV, great for family trips and rough terrain.",
      features: ["AC", "4x4", "Leather Seats", "GPS"],
      location: { city: "Lahore", pickupPoint: "Gulberg, Lahore" },
      owner: admin._id,
    },
    {
      title: "Audi A6 2021",
      brand: "Audi",
      model: "A6",
      year: 2021,
      category: "Luxury",
      transmission: "Automatic",
      fuelType: "Petrol",
      seats: 5,
      pricePerDay: 35000,
      images: [],
      description: "Premium executive sedan for special occasions and business travel.",
      features: ["AC", "Leather Seats", "Sunroof", "Premium Sound"],
      location: { city: "Islamabad", pickupPoint: "F-7, Islamabad" },
      owner: admin._id,
    },
    {
      title: "Toyota Hiace 2022",
      brand: "Toyota",
      model: "Hiace",
      year: 2022,
      category: "Van",
      transmission: "Manual",
      fuelType: "Diesel",
      seats: 15,
      pricePerDay: 15000,
      images: [],
      description: "Spacious van, perfect for group travel and tours.",
      features: ["AC", "Extra Luggage Space"],
      location: { city: "Islamabad", pickupPoint: "Airport, Islamabad" },
      owner: admin._id,
    },
  ];

  await Car.insertMany(sampleCars);

  console.log("Seed complete!");
  console.log("Admin login -> email: admin@hammadrentcar.com | password: admin123");
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
