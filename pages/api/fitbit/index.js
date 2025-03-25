const handler = async (req, res) => {
  try {
    const url = "https://api.fitbit.com/1/user/-/activities/steps/date/2023-03-20/2023-03-24.json";
   const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1FCVlkiLCJzdWIiOiJDSzJDWVoiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByaXJuIHJveHkgcnBybyBybnV0IHJzbGUgcmNmIHJhY3QgcmxvYyBycmVzIHJ3ZWkgcmhyIHJ0ZW0iLCJleHAiOjE3NDI4ODY0OTksImlhdCI6MTc0Mjg1NzY5OX0.5ls0dekf5zLPDSQVePUONY3SIg6Ji--ilOeTIoTy4lw";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch Fitbit data");
    }

    const data = await response.json();
    res.status(200).json({ data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;