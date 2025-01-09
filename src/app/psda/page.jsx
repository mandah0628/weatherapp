"use client";

import { useSearchParams } from "next/navigation";

export default async function Home({params})
{
    const searchParams = useSearchParams();
    let lattitude = searchParams.get("lat");
    let longitude = searchParams.get("lon");

    console.log(lattitude);
    console.log(longitude);
    return(
        <div className="h-screen bg-[url('../img/background.jpg')] bg-cover bg-center">

        </div>
    );
}