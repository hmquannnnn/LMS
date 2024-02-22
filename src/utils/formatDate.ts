export const FormatDate = (date: string) => {
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return new Date(date).toLocaleDateString("vi-VN", options);
};

export const FormatDateTime = (timeString: string) => {
  const formattedTime = new Date(timeString).toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  return formattedTime;
};
