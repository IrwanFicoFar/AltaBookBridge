import { configureStore } from "@reduxjs/toolkit";

import reducer from "../reducers/reducers";

const store = configureStore({
  reducer: {
    data: reducer.state,
  },
});

export default store;
