import { connectdb } from "@/utils/mongoose";
import Token from "@/models/api";

const handler = async (req, res) => {
  try {
    const refreshToken = async () => {
      const url = "https://api.fitbit.com/oauth2/token";
      const params = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: "5cf903abbfb4f8c1558671c565e2b7d5b6068d60c37654e936f92fdecf481966",
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
        console.error("Failed to refresh Fitbit access token. Details:", errorDetails);
        throw new Error("Failed to refresh Fitbit access token");
      }

      const data = await response.json();
      const accessToken = data.access_token;

      await connectdb();
      await Token.create({ access_token: accessToken });

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

    res.status(200).json({ data: fitbitData });
  } catch (error) {
    console.error("Error in handler:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;