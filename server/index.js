import dotenv from "dotenv"
import express from "express"
import { createLinkTokenFn, getTransactionsFn, setAccessToken } from "./controllers/plaidController.js"
const app = express()
dotenv.config()

const { SERVER_PORT } = process.env



app.use(express.json())

app.post("/api/plaid/create-link-token", createLinkTokenFn)
app.post("/api/plaid/create-access-token", setAccessToken)
app.post("/api/plaid/transactions", getTransactionsFn)


app.listen(SERVER_PORT, () => console.log(`Server listening on port ${SERVER_PORT}.`))