const axios = require('axios');
require('dotenv').config()


export default async function handler({ query: { id } }, res) {
    // console.log("id", id)
    const options = {
        method: 'GET',
        url: 'https://movie-database-alternative.p.rapidapi.com/',
        params: {
          r: 'json',
          i: id,
          // s: id
        },
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPIKEY,
          'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          // console.log(response.data);
          res.status(200).json(response.data)
      } catch (error) {
          console.error(error);
          res.status(404).json({ message: `movie with a title of ${id} is not found` })
      }
}