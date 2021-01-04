import { configureStore } from '@reduxjs/toolkit'
import plaidReducer from "./slices/plaidSlice"

export default configureStore({
    reducer: {
        plaid: plaidReducer
    }
})