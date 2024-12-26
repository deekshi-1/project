// export const base_url = "http://localhost:3001/api/";
export const base_url = "https://shopyfy-shopping-app.onrender.com/api/";
const localStorageToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  header: {
    Authorization: `Bearer ${
      localStorageToken !== null ? localStorageToken.token : ""
    }`,
    Accept: "application/H",
  },
};
export const getAuthHeaders = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return {
    headers: {
      Authorization: `Bearer ${user !== null ? user.token : ""}`,
      Accept: "application/json",
    },
  };
};
