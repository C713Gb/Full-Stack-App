import { URL } from "../../APIUtils";
import { Types } from "../constants/action-types";
import axios from "axios";

export const loginUser = (vals) => async (dispatch) => {
  var data = JSON.stringify({
    email: vals.email,
    password: vals.password,
  });

  console.log(data);

  var config = {
    method: "post",
    url: `${URL}/login`,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log("LOGIN RESPONSE -> ", response.data);

      if (response.status == 201){
        dispatch({
          type: Types.LOGIN,
          payload: response.data,
        });
        
        vals.navigate('/dashboard');
      } else {
        alert("Something went wrong");
      }

      
    })
    .catch(function (error) {
      console.log("LOGIN ERROR", error);
    });
};

export const signupUser = (vals) => async (dispatch) => {
  var data = JSON.stringify({
    email: vals.email,
    password: vals.password,
  });

  var config = {
    method: "post",
    url: `${URL}/sign-up`,
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {

      console.log(response);

      if (response.status == 201){
        dispatch({
          type: Types.LOGIN,
          payload: response.data,
        });
        
        vals.navigate('/dashboard');
      } else {
        alert("Something went wrong");
      }

      
    })
    .catch(function (error) {
      console.log("ERROR", error);
    });
};
