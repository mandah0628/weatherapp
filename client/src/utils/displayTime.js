export default function displayTime(unixTimestamp) {
  // Convert to milliseconds and create a Date object
  const date = new Date(unixTimestamp * 1000);

  // Set formatting options for 24-hour format
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Force 24-hour format
  };

  // Return the formatted time
  return date.toLocaleTimeString([], options);
}

