import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
        name: "authToken",
        initialState: {},
        reducers: {
                SignInReducer(state, action) {
                        state.userToken = action.payload.userToken;
                }
        }
})