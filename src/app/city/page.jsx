"use client";

import WeatherInfo from "@/components/WeatherInfo";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { fetchWeather } from "@/utils/fetchWeather";

export default async function Home({params})
{
    const searchParams = useSearchParams();
    let lattitude = searchParams.get("lat");
    let longitude = searchParams.get("lon");
    return(
        <div className="h-screen bg-cover bg-center">
            <WeatherInfo
            />
        </div>
    );
}