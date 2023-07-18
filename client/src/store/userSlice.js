import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserAPI } from "../api/User";
export const login = createAsyncThunk("login", async (userData) => {
  try {
    const response = await UserAPI.login(userData);
    console.log(response?.data);
    localStorage.setItem(
      "userLogin",
      JSON.stringify(response?.data?.data)
    );
    localStorage.setItem("token", response.data.accessToken);
    return response;
  } catch (error) {
    return error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: "",
    token: "",
    isLoggedIn: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      console.log("xem action >>>>>", action.payload);
      state.data = action.payload?.data?.data;
      state.token = action.payload?.data?.data?.accessToken;
      state.isLoggedIn = true;
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
