import DisplayTime from "@/utils/DisplayTime"
import VisibilityToText from "@/utils/VisibilityToText"

export default function ExtraInfo({data}) {
    return (
        <div className="bg-orange-400">
            {/*Sunrise*/}
            <div>
                <p>Sunrise:{DisplayTime(data.current.sunrise)}</p>
            </div>
        
            {/*Sunset*/}
            <div>
                <p>Sunset:{DisplayTime(data.current.sunset)}</p>
            </div>
        
            {/*Visibility*/}
            <p>Visibity: {VisibilityToText(data)}</p>
        </div>
    )
}