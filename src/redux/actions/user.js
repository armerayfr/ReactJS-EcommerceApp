import Axios from "axios";
import { API_URL } from "../../constants/api";

export const registerUser = ({ fullName, username, email, password }) => {
  return (dispatch) => {
    Axios.post(`${API_URL}/user`, {
      fullName,
      username,
      email,
      password,
      role: "user",
    })
      .then((result) => {
        alert("berhasil mendaftarkan user");
        delete result.data.password;
        dispatch({
          type: "USER_LOGIN",
          payload: result.data,
        });
      })
      .catch(() => {
        alert("gagal mendaftarkan user");
      });
  };
};
