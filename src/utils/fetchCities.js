const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

export async function fetchCities(query, limit = 10) {
  if (!query) return []; // If the query is empty, return an empty array.

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  try 
  {
    const response = await fetch(
      `${GEO_URL}?q=${encodeURIComponent(query)}&limit=${limit}&appid=${apiKey}`
    );

    if (!response.ok) 
        {
      throw new Error("Failed to fetch cities");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return [];
  }
}
