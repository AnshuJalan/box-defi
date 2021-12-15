export const getHHMMString = (time: number): string => {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time - hours * 3600000) / 60000);
  const hourString = hours < 10 ? `0${hours.toString()}` : hours;
  const minuteString = minutes < 10 ? `0${minutes.toString()}` : minutes;
  return `${hourString}H:${minuteString}M`;
};
