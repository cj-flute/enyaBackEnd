const axios = require("axios")

exports.getRate = async (base, currency) => {
    const currencies = currency.split(",");

    const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${base}&rates=${currencies}`);
    const rateData = response.data;
    
    try{
        let rateList = [];

        currencies.forEach(element => {
            rateList.push({[`${element}`]:[`${rateData.rates[element]}`]});
        });
        
        const today = new Date();
        const formattedDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
        let rateResponse = {
            result: {
                base,
                date: formattedDate,
                rates: rateList.reduce(function(result, item) {
                    var key = Object.keys(item)[0];
                    result[key] = Number(item[key]) || "";
                    return result;
                }, {})
            }
        }
        return rateResponse;
    } catch( error ) {
        return null;
    }
}

