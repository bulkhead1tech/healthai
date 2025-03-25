import FitnessData from "@/models/data";
import { connectdb } from "@/utils/mongoose";

const handler = async (req, res) => {
  try {
    await connectdb();

    if (req.method === "POST") {
      const {
        userName,
        activity,
        cardio_fitness,
        electrocardiogram,
        heartrate,
        irregular_rhythm_notifications,
        nutrition,
        oxygen_saturation,
        profile,
        respiratory_rate,
        sleep,
        temperature,
        weight,
      } = req.body.formData;

      if (!userName || !activity) {
        return res.status(400).json({ message: "userName and activity are required." });
      }

    

      await FitnessData.create({
        userName,
        activity,
        cardio_fitness,
        electrocardiogram,
        heartrate,
        irregular_rhythm_notifications,
        nutrition,
        oxygen_saturation,
        profile,
        respiratory_rate,
        sleep,
        temperature,
        weight,
      });

      return res.status(201).json({ message: "User created successfully" });
    }

    if (req.method === "GET") {
      const users = await FitnessData.find().sort({ _id: -1 }).limit(5);
      return res.status(200).json({
        data: users,
        message: "Data fetched successfully",
      });
    }

    res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;