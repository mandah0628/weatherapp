/**
 * Asks the client to allow the browser to get the location(lat,lon)
 * @returns A promise that resolves into an object containing "lat" and "lon".
 * Throws an error if promise is rejected.
 */
export default function GetBrowserLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      return reject(new Error("Geolocation API is not available in this environment."));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        reject(new Error(`Error getting location: ${error.message}`));
      }
    );
  });
}
