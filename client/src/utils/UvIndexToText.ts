/**
 * Converts a numerical UV index value into a text description
 * @param index The UV index
 * @returns The text description of the UV index
 */
export default function UvIndexToText(index :number) :string{
    if(index < 3){
        return "Low"
    } else if(index >=3 && index < 6){
        return "Moderate"
    } else if(index >= 6 && index < 8){
        return "High"
    } else if(index >= 8 && index <11){
        return "Very High"   
    } else {
        return "Extreme"   
    }
}