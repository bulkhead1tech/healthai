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

    const accessToken ="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1FCVlkiLCJzdWIiOiJDSzJDWVoiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJlY2cgcnNldCByaXJuIHJveHkgcnBybyBybnV0IHJzbGUgcmNmIHJhY3QgcnJlcyBybG9jIHJ3ZWkgcmhyIHJ0ZW0iLCJleHAiOjE3NDI4OTc4NzIsImlhdCI6MTc0Mjg2OTA3Mn0.eeDCm_IopXJhEeXWvmPqlF2lI7t82DKLjj1_0_8A5X8"    
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