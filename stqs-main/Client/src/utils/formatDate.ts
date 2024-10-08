// Format date from date string
function formatDateString(dateString: string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Format the date as yyyy-mm-dd hh:ss
  return `${year}-${month}-${day} @ ${hours}:${seconds}`;
}

export default formatDateString