
import axios from "axios";
import { AppDispatch } from "../store"; // Adjust if needed
import {
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
} from "../reducer/user"; // Updated to user reducer
import { server } from "@/app/server";



export const loadUser = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get(`${server}/api/auth/profile`, {
      withCredentials: true,
    });

    dispatch(loadUserSuccess(data?.user));
  } catch (error: any) {
    dispatch(
      loadUserFail(
        error.response?.data?.message || "Failed to load user profile"
      )
    );
  }
};





