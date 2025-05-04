"use client"

import { AdvancedMarker, APIProvider, Map, Marker } from "@vis.gl/react-google-maps";


export default function GoogleMap({coords} : any) {
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
    const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID as string

    return(
        <div>
            <APIProvider apiKey={GOOGLE_API_KEY}>
                <Map
                    style={{width: '50vw', height: '50vh'}}
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