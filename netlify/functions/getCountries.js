// netlify/functions/getCountries.js
const axios = require("axios");

exports.handler = async () => {
  try {
    const response = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags"
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
