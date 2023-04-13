import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggidIn: false,
  uname: "",
};

const sliceState = createSlice({
  name: "state",
  initialState: initialState,
  reducers: {
    handleAuth: (state, action) => {
      state.isLoggidIn = action.payload;
      state.uname = action.payload.uname;
    },
  },
});

const reducer = {
  state: sliceState.reducer,
};

export const { handleAuth } = sliceState.actions;
export default reducer;
