import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import history from "../../history"
import axios from 'axios'

const initialState = {
    user: {
        user_id: 1,
    },
    accessToken: "",
    transactions: [],
    error: null
}

export const createAccessToken = createAsyncThunk("plaid/createAccessToken", async (publicToken, thunkAPI) => {
    try {
        const response = await axios.post("/api/plaid/create-access-token", publicToken)
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.request.response)
    }
})

export const getTransactions = createAsyncThunk("plaid/getTransactions", async (accessToken, thunkAPI) => {
    try {
        const response = await axios.post("/api/plaid/get-transactions", accessToken)
        return response.data
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.request.response)
    }
})

export const plaidSlice = createSlice({
    name: "plaid",
    initialState,
    extraReducers: {
        [createAccessToken.fulfilled]: (state, action) => {
            state.accessToken = action.payload
        },
        [createAccessToken.rejected]: (state, action) => {
            state.error = action.payload
        },
        [getTransactions.fulfilled]: (state, action) => {
            state.transactions = action.payload
        },
        [getTransactions.rejected]: (state, action) => {
            state.error = action.payload
        }
    }
})

export default plaidSlice.reducer