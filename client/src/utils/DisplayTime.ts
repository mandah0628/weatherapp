export default function DisplayTime(unixTimestamp : number) {
  // Convert to milliseconds and create a Date object
  const date : Date = new Date(unixTimestamp * 1000);

  // format options
  const options = {
    hour: '2-digit',
    hour12: false, 
  };

  // Return the formatted time
  return date.toLocaleTimeString([], options);
}

