/**
 * Converts a numerical visibility value(in meters) into a text description
 * @param visibility The visibility in meters
 * @returns The text description of the visibility
 */
export default function VisibilityToText(visibility : number) :string{
  if (visibility < 50) {
    return "Dense fog";
  } else if (visibility >= 50 && visibility < 200) {
    return "Thick fog";
  } else if (visibility >= 200 && visibility < 500) {
    return "Moderate fog";
  } else if (visibility >= 500 && visibility < 1000) {
    return "Light fog";
  } else if (visibility >= 1000 && visibility < 2000) {
    return "Thin fog";
  } else if (visibility >= 2000 && visibility < 4000) {
    return "Haze";
  } else if (visibility >= 4000 && visibility < 10000) {
    return "Light haze";
  } else if (visibility >= 10000 && visibility < 20000) {
    return "Clear";
  } else if (visibility >= 20000 && visibility < 50000) {
    return "Very clear";
  } else if (visibility > 50000) {
    return "Exceptionally clear";
  } else {
    return "Unknown condition";
  }
}