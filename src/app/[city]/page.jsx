import WeatherInfo from "../../components/WeatherInfo"
import NavBar from "@/components/NavBar";

export default function Home()
{
    return(
        <div className="h-screen bg-[url('../img/background.jpg')] bg-cover bg-center">
            <div>
                <NavBar/>
            </div>
        </div>
    );
}