const ONE_CALL_URL = "https://api.openweathermap.org/data/3.0/onecall";

export async function fetchWeather({lat,lon}) 
{
    const api_key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    try {
        const response  = await fetch('${ONE_CALL_URL}?lat=${lat}&lon=${lon}&appid=${api_key}');

        if(!response.ok)
        {
            throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        return data;
        
    } catch (error) {
        console.error("Error fetching data:", error)
        return null;
    }
}