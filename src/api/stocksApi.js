import axios from 'axios';

const API_KEY = 'crleu4pr01qvgqml2j6gcrleu4pr01qvgqml2j70'
const BASE_URL = 'https://finnhub.io/api/v1/'
const stocksApi = {
	getStocks:async () => {
		const res = await axios.get(`${BASE_URL}/stock/symbol?exchange=US&token=${API_KEY}`)

		return res.data;
	},
	getProfile: (symbol) => axios.get(`${BASE_URL}/stock/profile2?symbol=${symbol}&token=${API_KEY}`),
	getPrice:(symbol) => axios.get(`${BASE_URL}/quote?symbol=${symbol}&token=${API_KEY}`),
	
};

export default stocksApi;