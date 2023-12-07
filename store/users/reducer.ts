import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

export enum USERINFO_STATUS {
  ok = 'OK',
  nouserrecord = 'NO_USER_RECORD',
  noFid = 'NO_FB_ID',
}

export interface UserInfo {
  displayName: string;

  photoUrl: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  mobileCode: string;
  mobile: string;
  mobileVerified: boolean;
  titleTh: string | null;
  titleEn: string | null;
  titleCn: string | null;
  nameTh: string | null;
  nameEn: string | null;
  nameCn: string | null;
  lastnameTh: string | null;
  lastnameEn: string | null;
  lastnameCn: string | null;
  personalId: number;
  dob: Date,
  gender: string | null;
  line: string | null;
  wechat: string | null;
  profileId: number;

  mandatoryInfo: boolean;
  status:  USERINFO_STATUS;
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