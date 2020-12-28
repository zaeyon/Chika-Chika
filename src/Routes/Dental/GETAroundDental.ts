import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    lat: number,
    long: number,
    sort: string,
    time?: string,
    days?: string,
    wantParking: string,
}

const GETAroundDental = ({jwtToken, lat, long, sort, time, days, wantParking}: params) => {

    console.log("GETAroundDental lat", lat);
    console.log("GETAroundDental long", long);
    console.log("GETAroundDental sort", sort);
    console.log("GETAroundDental time", time);
    console.log("GETAroundDental days", days);
    console.log("GETAroundDental wantParking", wantParking);


    const uri = serverConfig.baseUri + `/around/clinics?lat=${lat}&long=${long}&wantParking=${wantParking}&sort=${sort}&days=${days}&time=${time}`;

    console.log("GETAroundDental uri", uri);

    return new Promise((resolve, reject) => {
        
        axios
        .get(uri, {
            headers: {
                Authorization: jwtToken
            }
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response)
        })
    })
}

export default GETAroundDental;