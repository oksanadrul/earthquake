export const parseCustomDate = (dateString: string) => {
  // Replace slashes with hyphens and space with 'T' to match the ISO 8601 format
  let formattedDateString = dateString
    .replace('/', '-')
    .replace('/', '-')
    .replace(' ', 'T');

  // Ensure that milliseconds are properly added (use .50 for the given example)
  if (!formattedDateString?.includes('.')) {
    formattedDateString = `${formattedDateString}.000`; // Adding milliseconds if missing
  }

  // Add UTC timezone at the end (Z stands for UTC time)
  formattedDateString = `${formattedDateString}Z`;

  return formattedDateString;
};
