import { urlConstants } from "../constants";
import { axios } from "../utils";

export const authService = {
  login,
  logout,
};

function login(username, password) {
  return axios
    .post(urlConstants.LOGIN, {
      email: username,
      password,
    })
    .then(response => {
      console.log("working fine")
      localStorage.setItem("user", JSON.stringify(response.data.data.associate_name));
      localStorage.setItem("id", JSON.stringify(response.data.data.associate_id));
      return response.data;
    });
}

function logout() {
  localStorage.removeItem("user");
}
