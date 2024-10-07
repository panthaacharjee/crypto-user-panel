import { configureStore } from "@reduxjs/toolkit";

import {affiliateReducer, exchangeReducer, forgotPasswordReducer, tradeReducer, updateReducer, userReducer, userTransection, verificationReducer} from "./reducers/userReducer"



const store = configureStore({
  reducer: {
   user: userReducer,
   forgotPassword:forgotPasswordReducer,
   verification : verificationReducer,
   transection:userTransection,
   update:updateReducer,
   trade:tradeReducer,
   affilate:affiliateReducer,
   exchange : exchangeReducer
  },
});

export default store;
