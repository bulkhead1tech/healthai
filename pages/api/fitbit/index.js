import {connectdb} from "@/utils/mongoose"
import Token from "@/models/api";

const handler = async (req, res) => {
  try {
    async function fetchFitnessData(accessToken, endpoint) {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Failed to fetch data:", response.status, response.statusText);
        return null;
      }
    }
    await connectdb();
    const tokenRecord = await Token.findOne({_id:"67e21a4d7749ccc39ee46b82"});

    const accessToken =tokenRecord.access_token;
   const endpoints = [
      "https://api.fitbit.com/1/user/-/activities/steps/date/2023-03-21/2023-03-25.json",
      "https://api.fitbit.com/1/user/-/activities/calories/date/2023-03-21/2023-03-25.json",
      "https://api.fitbit.com/1/user/-/activities/distance/date/2023-03-21/2023-03-25.json",
  
    ];

    const results = await Promise.all(
      endpoints.map((endpoint) => fetchFitnessData(accessToken, endpoint))
    );

    res.json({ data: results });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred while fetching fitness data." });
  }
};

export default handler;