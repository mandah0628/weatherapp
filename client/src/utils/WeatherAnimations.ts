import clearday from "../../public/weatherAnimations/clearday.json"
import clearnight from "../../public/weatherAnimations/clearnight.json";
import cloudyday from "../../public/weatherAnimations/cloudynight.json"
import cloudynight from "../../public/weatherAnimations/cloudynight.json"
import cloudy from "../../public/weatherAnimations/cloudy.json";
import drizzle from "../../public/weatherAnimations/drizzle.json";
import foggy from "../../public/weatherAnimations/foggy.json";
import rainy from "../../public/weatherAnimations/rainy.json";
import smoky from "../../public/weatherAnimations/smoky.json";
import snowy from "../../public/weatherAnimations/snowy.json";
import snowandrainy from "../../public/weatherAnimations/snowandrainy.json";
import thunderstorm from "../../public/weatherAnimations/thunderstorm.json";
import windy from "../../public/weatherAnimations/windy.json";
import humidity from "../../public/extra/humidity.json"
import uvIndex from "../../public/extra/uvIndex.json"
import visibility from "../../public/extra/visibility.json"

const WeatherAnimations: Record<string, any> = {
    "clearday.json": clearday,
    "clearnight.json": clearnight,
    "cloudy.json": cloudy,
    "drizzle.json": drizzle,
    "foggy.json": foggy,
    "rainy.json": rainy,
    "smoky.json": smoky,
    "snowy.json": snowy,
    "snowandrainy.json": snowandrainy,
    "thunderstorm.json": thunderstorm,
    "windy.json": windy,
    "cloudynight.json": cloudynight,
    "cloudyday.json": cloudyday,
    "humidity.json": humidity,
    "uvIndex.json": uvIndex,
    "visibility.json": visibility

}

export default WeatherAnimations