export default function uvIndex(index){
    if(index < 3){
        return "Low"
    } else if(index >=3 && index < 6){
        return "Moderate"
    } else if(index >= 6 && index < 8){
        return "High"
    } else if(index >= 8 && index <11){
        return "Very High"   
    } else if(index >= 11){
        return "Extreme"   
    }
}