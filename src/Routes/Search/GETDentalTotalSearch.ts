import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    iq: string,
    sq: string,
    offset: number,
    limit: number,
    lat: number,
    long: number,
    category: string,
    sort: string,
    timeFilter?: string,
    dayFilter?: string,
    holidayFilter?: boolean,
    parkingFilter?: string,
}

const GETDentalTotalSearch = ({jwtToken,iq, sq, offset, limit, lat, long, category, sort, dayFilter, timeFilter, holidayFilter, parkingFilter}: params) => {

    console.log('GETDentalTotalSearch category', category);

    const uri = serverConfig.baseUri + `/clinics?lat=${lat}&long=${long}&iq=${iq}&sq=${sq}&sort=${sort}&days=${dayFilter}&time=${timeFilter}&wantParking=${parkingFilter}&holiday=${holidayFilter}&limit=${limit}&offset=${offset}&tagCategory=${category}`;

    console.log("GETDentalTotalSearch iq", iq);
    console.log("GETDentalTotalSearch sq", sq);

    console.log("GETDentalTotalSearch jwtToken", jwtToken);
    console.log("GETDentalTotalSearch offset", offset);
    console.log("GETDentalTotalSearch limit", limit);
    console.log("GETDentalTotalSearch sort", sort);
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