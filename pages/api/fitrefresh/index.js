import { connectdb } from "@/utils/mongoose";
import Token from "@/models/api";

const handler = async (req, res) => {
  try {
    const refreshToken = async () => {
      const url = "https://api.fitbit.com/oauth2/token";

      await connectdb();
      const tokenRecord = await Token.findOne({_id:"67e21a4d7749ccc39ee46b82"});
      if (!tokenRecord || !tokenRecord.refresh_token) {
        throw new Error("No refresh token found in the database");
      }

      const params = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: tokenRecord.refresh_token, 
        client_id: "23QBVY",
        client_secret: "650befb9fed8392b9bbd6d2b1cd61ecb",
      });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Failed to refresh Fitbit tokens. Details:", errorDetails);
        throw new Error("Failed to refresh Fitbit tokens");
      }

      const data = await response.json();
      const accessToken = data.access_token;
      const newRefreshToken = data.refresh_token;

      await Token.findOneAndUpdate(
        { _id: tokenRecord._id }, 
        { access_token: accessToken, refresh_token: newRefreshToken },
        { upsert: true, new: true } 
      );

      return accessToken;
    };

    const fetchFitbitData = async (accessToken) => {
      const url = "https://api.fitbit.com/1/user/-/activities/steps/date/today/1d.json";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Failed to fetch Fitbit data. Details:", errorDetails);
        throw new Error("Failed to fetch Fitbit data");
      }

      return await response.json();
    };

    const accessToken = await refreshToken();
    const fitbitData = await fetchFitbitData(accessToken);

    res.status(200).json({ message: "done" });
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;