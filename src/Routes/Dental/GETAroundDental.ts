import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    limit: number,
    offset: number,
    lat: number,
    long: number,
    sort: string,
    timeFilter?: string,
    dayFilter?: any,
    holidayFilter: boolean,
    parkingFilter: string,
}

const GETAroundDental = ({jwtToken, limit, offset, lat, long, sort, timeFilter, dayFilter, holidayFilter, parkingFilter}: params) => {

    console.log("GETAroundDental lat", lat);
    console.log("GETAroundDental long", long);
    console.log("GETAroundDental sort", sort);
    console.log("GETAroundDental time", timeFilter);
    console.log("GETAroundDental dayFilter", dayFilter);
    console.log("GETAroundDental holiday", holidayFilter);
    console.log("GETAroundDental wantParking", parkingFilter);
    console.log("GETAroundDental limit", limit);
    console.log("GETAroundDental offset", offset);

    // TEST 서울 시청 위도, 경도
    //lat = 37.566515657875435
    //long = 126.9781164904998

    const uri = serverConfig.baseUri + `/around/clinics?lat=${lat}&long=${long}&wantParking=${parkingFilter}&sort=${sort}&days=${dayFilter}&time=${timeFilter}&holiday=${holidayFilter}&limit=${limit}&offset=${offset}`;

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