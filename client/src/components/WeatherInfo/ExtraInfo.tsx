import DisplayTime from "@/utils/DisplayTime"
import VisibilityToText from "@/utils/VisibilityToText"

export default function ExtraInfo({data} : any) {
    return (
        <div className="bg-orange-400">
            {/*Sunrise*/}
            <div>
                <p>Sunrise:{DisplayTime(data.sunrise)}</p>
            </div>
        
            {/*Sunset*/}
            <div>
                <p>Sunset:{DisplayTime(data.sunset)}</p>
            </div>
        
            {/*Visibility*/}
            <p>Visibity: {VisibilityToText(data.visibility)}</p>

            {/* Pressure */}

        </div>
    )
}