import { useState, useEffect } from 'react'
import axios from 'axios'

const useLoadData = (url, options) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {
                const res = await axios.get(url, options)
                console.log(res.data)
                const json = await res.data.json()
                setResponse(json)
                setIsLoading(false)
            } catch (err) {
                setError(err)
            }
        }
        loadData()
    }, [])
    useEffect(() => {
        console.log('useLoadData', response, error, isLoading)
    }, [response, error, isLoading])
    return { response, error, isLoading }
}

export default useLoadData

// usage
// const res = useLoadData("https://dog.ceo/api/breeds/image/random", {})
// if (!res.response) {
//     return <div>Loading...</div>
// }

// const loadData = async (url) => {  
//     dispatch({ type: TYPES.IS_LOADING, value: true })
//     try {
//       const response = await axios.get(`./${url}.json`)
//       // console.log('Success!',response.data.kits);
//       dispatch({ type: TYPES.DATA_LOADED, value: response.data })
//     } catch (err) {
//       dispatch({ type: TYPES.HAS_ERROR, value: err })
//     }
//   }