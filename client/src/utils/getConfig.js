export const getConfig = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken || "";
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  };
  return config;
};
