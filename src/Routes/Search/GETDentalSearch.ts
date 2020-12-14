import axios from 'axios';
import serverCofig from '../server.config';

const GETDentalSearch = (keyword: string) => {

    console.log("GETDentalSearch keyword", keyword);

    const uri = serverCofig.baseUri + "/search/clinics?q=" + keyword

    return new Promise(function(resolve, reject) {
        axios
        .get(uri, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZiMDYxN2IwLTMzYzAtMTFlYi05MmRlLWUzZmIzYjRlMDI2NCIsImlhdCI6MTYwNjgxODk1MCwiZXhwIjoxNjM4Mzc2NTUwfQ.3-PEUaAWAW6sjl7TuKNzSHlTlK8p7myWG8nedNZ3nFE",
            }
        })
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error.response)
        })
    })
}

export default GETDentalSearch;