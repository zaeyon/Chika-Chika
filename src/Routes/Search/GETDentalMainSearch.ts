import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    query: string,
    long: number,
    lat: number,
}

const GETDentalMainSearch = ({jwtToken, query, long, lat}: params) => {

    console.log("GETDentalMainSearch jwtToken", jwtToken)
    console.log("GETDentalMainSearch query", query);
    console.log("GETDentalMainSearch long", long);
    console.log("GETDentalMainSearch lat", lat);

    const uri = serverConfig.baseUri + `/clinics?lat=${lat}&long=${long}&query=${query}`;

    return new Promise((resolve, reject) => {
        
        axios
        .get(uri, {
            headers: {
                Authorization: jwtToken,
            }
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject((error.response));
        })
    })
}

export default GETDentalMainSearch