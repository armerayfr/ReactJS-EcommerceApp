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
    }).then((result) => {
      alert("berhasil mendaftarkan user");
      delete result.data.password;
      dispatch({
        type: "USER_LOGIN",
        payload: result.data,
      });
    });
  };
};

//4. membuat action creator
export const loginUser = ({ username, password }) => {
  //destructure atau inputan user
  return (dispatch) => {
    Axios.get(`${API_URL}/user`, {
      //memberi / menampilkan spesifik data yang diperlukan
      params: {
        username,
      },
    })
      .then((result) => {
        //yang dihasilkan array console.log(result.data)
        if (result.data.length) {
          //bernilai true, pas dicari username ada di json, jalan ke if password
          if (password === result.data[0].password) {
            //input password == password di db.json

            delete result.data[0].password;

            //set localStorage dengan key, value
            localStorage.setItem(
              "userDataEmmerce",
              JSON.stringify(result.data[0])
            );

            dispatch({
              type: "USER_LOGIN",
              payload: result.data[0],
            });
          } else {
            //fix error password
            //kondisi false
            dispatch({
              type: "USER_ERROR",
              payload: "Password Salah",
            });
          }
        } else {
          //fix error username
          //username tidak ada
          dispatch({
            type: "USER_ERROR",
            payload: "Username tidak ditemukan",
          });
        }
      })
      .catch(() => {
        alert("gagal mendaftarkan user");
      });
  };
};

export const logoutUser = () => {
  localStorage.removeItem("userDataEmmerce");
  return {
    type: "USER_LOGOUT",
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/user`, {
      params: {
        id: userData.id,
      },
    }).then((result) => {
      delete result.data[0].password; //data yang ditampilkan baru
      //data yang ditampilkan baru
      localStorage.setItem("userDataEmmerce", JSON.stringify(result.data[0]));
      dispatch({ type: "USER_LOGIN", payload: result.data[0] });
    });
  };
};

export const checkStorage = () => {
  return { type: "CHECK_STORAGE" };
};
