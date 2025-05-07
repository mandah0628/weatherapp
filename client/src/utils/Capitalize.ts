/**
 * Capitalizes every first letter of a word in the string.
 * @param string The string to be capitalized.
 * @returns A string with each first letter of the word capitalized.
 */
export default function Capitalize(string : string) :string{
    return string.toLowerCase().replace(/\b\w/g, char => char.toUpperCase())
}
  

  