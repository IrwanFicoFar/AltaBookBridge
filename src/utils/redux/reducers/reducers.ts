import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggidIn: false,
  isAvailabe: false,
};

const sliceState = createSlice({
  name: "state",
  initialState: initialState,
  reducers: {
    handleAuth: (state, action) => {
      state.isLoggidIn = action.payload;
      state.isAvailabe = action.payload.isAvailabe;
    },
  },
});

const reducer = {
  state: sliceState.reducer,
};

export const { handleAuth } = sliceState.actions;
export default reducer;
