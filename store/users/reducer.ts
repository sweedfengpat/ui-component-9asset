import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface UserInfo {

}

export interface UserState {
  isLoading: boolean;
  userInfo: UserInfo | null;
}

export const fetchUserInfo = createAsyncThunk<UserInfo, User>(
  'user/fetchUserInfo',
  async (user: User) => {
    const token = await user.getIdToken();
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVICE_API_BASE}/users`,
      {
        method: 'GET',
        headers: { 'Authorization': `token ${token}`}
      }
    );
    return (await response.json());
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: true,
    userInfo: null
  } as UserState,
  reducers: {
    clearUser: (state: UserState) => {
      state.userInfo = null;
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.isLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.userInfo = action.payload;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.isLoading = false;
      })
  },
});


export const { clearUser, setUser } = userSlice.actions;
export default userSlice.reducer;