import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetch = (endpoint, query) => {
	const [data, setData] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState(null)

	const options = {
		method: 'GET',
		url: `https://jsearch.p.rapidapi.com/${endpoint}`,
		headers: {
			'X-RapidAPI-Key': '25c64e7ec1msh08b2afe8c9b7c73p1487d6jsn1479c9a42b0c',
			'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
		},
		params: {
			...query
		}
	}

	const fetchData = async () => {
		setIsLoading(true)
		try {
			const response = await axios.request(options)
			setData(response.data?.data)
			setIsLoading(false)
		} catch (error) {
			setError(error)
			alert('There is an error')
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	// refetch the data, sometimes wasn't properly loading
	const refetch = () => {
		setIsLoading(true)
		fetchData()
	}

	return {
		data,
		isLoading,
		error,
		refetch
	}
}
export default useFetch
