// apiService.js
import axios from 'axios';

const getDigitalCurrencyDaily = async () => {
    try {
        const response = await axios.get('http://localhost:8080/digitalCurrencyDaily', {
            params: {
                function: 'DIGITAL_CURRENCY_DAILY',
                symbol: 'BTC',
                market: 'EUR',
                apikey: 'WNYR94DSGSQPD9K2'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching crypto data:', error);
        throw error;
    }
};

export default getDigitalCurrencyDaily;
