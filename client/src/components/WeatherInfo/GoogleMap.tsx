"use client"

import { AdvancedMarker, APIProvider, Map, Marker } from "@vis.gl/react-google-maps";


export default function GoogleMap({coords} : any) {
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
    const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string

    return(
        <div className="w-full h-full">
            <APIProvider apiKey={GOOGLE_API_KEY}>
                <Map
                    style={{width: "100%", height: "100%"}}
                    defaultCenter={coords}
                    defaultZoom={11}
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                    mapId={MAP_ID}
                >
                    <AdvancedMarker position={coords} />
                </Map>
            </APIProvider>
        </div>

    )
}