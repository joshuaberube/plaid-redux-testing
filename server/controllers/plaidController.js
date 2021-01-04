import plaid from "plaid"
import dotenv from "dotenv"
dotenv.config()

const { PLAID_CLIENT_ID, PLAID_SECRET } = process.env

const client = new plaid.Client({
    clientID: PLAID_CLIENT_ID,
    secret: PLAID_SECRET,
    env: plaid.environments.sandbox,
})

const createLinkTokenFn = async (req, res) => {
    // const { user_id } = req.session.user
    const user_id = 1

    const response = await client.createLinkToken({
        user: {
            client_user_id: toString(user_id)
        },
        client_name: "Budgwit",
        products: ["auth", "transactions"],
        country_codes: ["US"],
        language: "en"
    }).catch(err => {res.sendStatus(500); console.log(err)})

    console.log(response)
    res.status(200).send(response.link_token)
}

const setAccessToken = async (req, res) => {
    const { publicToken } = req.body
    console.log("req.body: ", req.body)

    const response = await client.exchangePublicToken(publicToken)
    .catch(err => {res.sendStatus(500); console.log(err)})

    const accessToken = response.access_token
    //store access_token in DB with the current signed in user but have it be encrypted
    res.status(200).send(accessToken)
}

const getTransactionsFn = async (req, res) => {
    const { accessToken } = req.body
    const { transactions } = await client.getTransactions(accessToken)
    .catch(err => {res.sendStatus(500); console.log(err)})

    res.status(200).send(transactions)
}

export { createLinkTokenFn, setAccessToken, getTransactionsFn }