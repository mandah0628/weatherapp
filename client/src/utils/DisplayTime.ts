/**
 * Formats an offset adjusted unix timestamp to a readable time format, displaying hour and minutes.
 * @param offsetAdjustedTime Offset adjusted unix timestamp in seconds.
 * @returns A string displaying the hour and minutes.
 */
export default function DisplayTime( offsetAdjustedTime: number) :string{
  
  const date = new Date(offsetAdjustedTime * 1000);

  return date.toLocaleTimeString("en-GB", {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: "UTC"
  });
}
