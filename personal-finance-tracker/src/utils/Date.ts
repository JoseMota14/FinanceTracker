export const formatDateOld = (dateString: string): string => {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date); // Formats as DD/MM/YYYY
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth is 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
};
