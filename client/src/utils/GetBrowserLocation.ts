export default async function GetBrowserLocation() {
  try {
    const coords: { lat: number; lon: number } = await new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by your browser."));
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          },
          
          (error) => {
            reject(new Error(`Error getting location: ${error.message}`));
          }
        );
      }
    });

    console.log("Latitude:", coords.lat);
    console.log("Longitude:", coords.lon);

    return coords
  } catch (err: any) {
    console.error("Failed to get location:", err.message);
  }
}
