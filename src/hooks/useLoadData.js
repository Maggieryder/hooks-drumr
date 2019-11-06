import { useState, useEffect } from 'react'
import axios from 'axios'

const useLoadData = (url, options) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isDataLoading, setDataLoading] = useState(null)
    useEffect(() => {
        const loadData = async () => {
            setDataLoading(true)
            try {
                const res = await axios.get(url, options)
                setResponse(res.data)
                setDataLoading(false)
            } catch (error) {
                setError(error)
                setDataLoading(false)
            }
        }
        loadData()
        return (() => {
            setDataLoading(false)
        })
    }, [])
    return { response, error, isDataLoading }
}

export default useLoadData
