import axios from 'axios';
import serverCofig from '../server.config';

interface Props {
    jwtToken: string,
    keyword: string,
}

const GETDentalNameSearch = ({jwtToken, keyword}: Props) => {

    console.log("GETDentalNameSearch keyword", keyword);

    const uri = serverCofig.baseUri + "/search/clinics?q=" + keyword

    return new Promise(function(resolve, reject) {
        axios
        .get(uri, {
            headers: {
                'Content-Type': "application/x-www-form-urlencoded",
                Authorization: jwtToken,
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

export default GETDentalNameSearch;