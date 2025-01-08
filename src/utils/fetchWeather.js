const ONE_CALL_URL = "https://api.openweathermap.org/data/3.0/onecall";

export async function fetchWeather(params) {

    const api_key = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    try {
        const response  = await fetch('${ONE_CALL_URL}?lat={lattitude}&lon={longitude}');
        
    } catch (error) {
        
    }
}