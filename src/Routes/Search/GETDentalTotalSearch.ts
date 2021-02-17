import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    offset: number,
    limit: number,
    lat: number,
    long: number,
    query: string,
    category: string,
    sort: string,
    timeFilter?: string,
    dayFilter?: string,
    holidayFilter?: boolean,
    parkingFilter?: string,
}

const GETDentalTotalSearch = ({jwtToken, offset, limit, lat, long, category, query, sort, dayFilter, timeFilter, holidayFilter, parkingFilter}: params) => {

    console.log('GETDentalTotalSearch category', category);

    const uri = serverConfig.baseUri + `/clinics?lat=${lat}&long=${long}&query=${query}&sort=${sort}&days=${dayFilter}&time=${timeFilter}&wantParking=${parkingFilter}&holiday=${holidayFilter}&limit=${limit}&offset=${offset}&tagCategory=${category}`;

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
    if(dayFilter) console.log("GETDentalTotalSearch holidayFilter", holidayFilter)

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