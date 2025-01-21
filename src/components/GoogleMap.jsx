import { LoadScript } from "@react-google-maps/api";

export default function GoogleMap({ children }) {
  return (
    <LoadScript 
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}
      preventGoogleFontsLoading={true}
    >
      {children}
    </LoadScript>
  );
}
