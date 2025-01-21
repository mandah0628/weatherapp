export default function visibilityMeters(weatherData){
    const visibilityMeters = weatherData.current.visibilityMeters;
    if (visibilityMeters < 50) {
        return "Dense fog";
      } else if (visibilityMeters >= 50 && visibilityMeters < 200) {
        return "Thick fog";
      } else if (visibilityMeters >= 200 && visibilityMeters < 500) {
        return "Moderate fog";
      } else if (visibilityMeters >= 500 && visibilityMeters < 1000) {
        return "Light fog";
      } else if (visibilityMeters >= 1000 && visibilityMeters < 2000) {
        return "Thin fog";
      } else if (visibilityMeters >= 2000 && visibilityMeters < 4000) {
        return "Haze";
      } else if (visibilityMeters >= 4000 && visibilityMeters < 10000) {
        return "Light haze";
      } else if (visibilityMeters >= 10000 && visibilityMeters < 20000) {
        return "Clear";
      } else if (visibilityMeters >= 20000 && visibilityMeters < 50000) {
        return "Very clear";
      } else if (visibilityMeters > 50000) {
        return "Exceptionally clear";
      } else {
        return "Unknown condition";
      }
    }