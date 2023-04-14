import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggidIn: false,
  isAvailabe: false,
  uname: "",
};

const sliceState = createSlice({
  name: "state",
  initialState: initialState,
  reducers: {
    handleAuth: (state, action) => {
      state.isLoggidIn = action.payload;
      state.uname = action.payload.uname;
      state.isAvailabe = action.payload.isAvailabe;
    },
  },
});

const reducer = {
  state: sliceState.reducer,
};

export const { handleAuth } = sliceState.actions;
export default reducer;
