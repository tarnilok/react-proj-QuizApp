import axios from 'axios'

import { useState, useEffect } from 'react'

const ConnectApi = (url) => {
    const [fetch, setFetch] = useState({isFetching: false})
    const [dataState, setDataState] = useState({data: []})
    const [apiurl] = useState(url)

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                setFetch({isFetching: true})
                const response = await axios.get(apiurl)
                setDataState({...dataState, data: response.data})
            } catch (e) {
                setFetch({...fetch, isFetching: true})
            }
        }
        fetchDataFromApi();
    }, [])
    return [dataState]
}
export default ConnectApi   


    