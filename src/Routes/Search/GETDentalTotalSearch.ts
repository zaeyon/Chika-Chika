import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    offset: number,
    limit: number,
    lat: number,
    long: number,
    query: string,
    sort: string,
    timeFilter?: string,
    dayFilter?: string,
    parkingFilter?: string,
}

const GETDentalTotalSearch = ({jwtToken, offset, limit, lat, long, query, sort, dayFilter, timeFilter, parkingFilter}: params) => {

    const uri = serverConfig.baseUri + `/clinics?lat=${lat}&long=${long}&query=${query}&sort=${sort}&days=${dayFilter}&time=${timeFilter}&wantParking=${parkingFilter}&limit=${limit}&offset=${offset}`;

    console.log("GETDentalTotalSearch jwtToken", jwtToken);
    console.log("GETDentalTotalSearch offset", offset);
    console.log("GETDentalTotalSearch limit", limit);
    console.log("GETDentalTotalSearch sort", sort);
    console.log("GETDentalTotalSearch query", query);
    console.log("GETDentalTotalSearch long", long);
    console.log("GETDentalTotalSearch lat", lat);

    if(parkingFilter) console.log("GETDentalTotalSearch wantParking", parkingFilter);
    if(timeFilter) console.log("GETDentalTotalSearch time", timeFilter);
    if(dayFilter) console.log("GETDentalTotalSearch days", dayFilter)

    console.log("GETDentalTotalSearch uri", uri);
    
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

export default GETDentalTotalSearch