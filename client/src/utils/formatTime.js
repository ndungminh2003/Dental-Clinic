const formatTime = (time) => {
  if (typeof time != "string") return "";
  if (time.includes("T")) {
    const timeParts = time.split(":");
    const hour = timeParts[0].substr(-2);
    const minute = timeParts[1];
    return `${hour}:${minute}`;
  } else return time;
};

export default formatTime;
