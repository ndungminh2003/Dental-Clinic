const formatDate = (date) => {
  if (typeof date != "string") return "";
  if (date.includes("T")) {
    const dateParts = date.split("-");
    const jsDate = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2].substr(0, 2)
    );
    const year = jsDate.getFullYear();
    const month = (jsDate.getMonth() + 1).toString().padStart(2, "0");
    const day = jsDate.getDate().toString().padStart(2, "0");

    return `${day}/${month}/${year}`;
  } else return date;
};

export default formatDate;
