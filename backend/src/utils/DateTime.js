import moment from "moment";

export const abstractDateTime = (dateString) => {
  // Parse the date string using moment
  const dateObj = moment(dateString);

  // Get the date in YYYY-MM-DD format
  const date = dateObj.format('YYYY-MM-DD');

  // Get the time in HH:mm:ss format
  const time = dateObj.format('HH:mm:ss');
  console.log("STRING : ", dateString, " DATE : ", date, " TIME : ", time);
  return { date, time }
}
