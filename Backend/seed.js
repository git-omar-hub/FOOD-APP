import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import couponModel from "./models/couponModel.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
process.loadEnvFile(join(__dirname, ".env"));

const coupons = [
  { code: "111", discount: 5, type: "percentage", minAmount: 0 },
  { code: "222", discount: 10, type: "percentage", minAmount: 150 },
  { code: "333", discount: 15, type: "percentage", minAmount: 200 },
  { code: "444", discount: 20, type: "percentage", minAmount: 300 },
  { code: "555", discount: 25, type: "percentage", minAmount: 400 },
  { code: "666", discount: 30, type: "percentage", minAmount: 500 },
  { code: "777", discount: 50, type: "fixed", minAmount: 600 },
  { code: "888", discount: 75, type: "fixed", minAmount: 800 },
  { code: "999", discount: 100, type: "fixed", minAmount: 1000 },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("DB connected");

    await couponModel.deleteMany({});
    console.log("Cleared existing coupons");

    await couponModel.insertMany(coupons);
    console.log(`Seeded ${coupons.length} coupons`);

    await mongoose.disconnect();
    console.log("Done");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
