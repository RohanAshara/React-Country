// netlify/functions/getCountryByName.js
const axios = require("axios");

exports.handler = async (event) => {
  const name = event.queryStringParameters.name;

  if (!name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Country name is required" }),
    };
  }

  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(
        name
      )}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
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
