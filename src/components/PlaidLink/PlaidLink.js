import { useCallback, useEffect, useState } from 'react'
import { usePlaidLink } from "react-plaid-link"
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { createAccessToken, getTransactions } from '../../redux/slices/plaidSlice'

const PlaidLink = () => {
    const [token, setToken] = useState("")
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.plaid.accessToken)

    const onSuccess = useCallback(token => {
        dispatch(createAccessToken({publicToken: token}))
    }, [])

    const onEvent = useCallback((eventName, metadata) => {
        console.log("onEvent", eventName, metadata)
    }, [])

    const onExit = useCallback((err, metadata) => {
        console.log("onExit", err, metadata)
    }, [])

    const config = { token, onSuccess, onEvent, onExit }

    const { open, ready, error } = usePlaidLink(config)

    useEffect(() => {
        const createToken = async () => {
            const response = await axios.post("/api/plaid/create-link-token")
            setToken(response.data)
        }
        createToken()
    }, [])

    return (
        <input 
            type="button" 
            onClick={open} 
            disabled={!ready || error} 
            value="Connect a bank account"
        />
    )
}

export default PlaidLink