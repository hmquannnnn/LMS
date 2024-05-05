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

export const convertDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  console.log(dateTime);
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1;
  const year = dateTime.getFullYear();

  // Định dạng lại chuỗi ngày giờ
  const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;

  return formattedDateTime;
};
