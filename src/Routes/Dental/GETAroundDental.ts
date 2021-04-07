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
    specialistFilter: string,
    goodDentalFilter: string,
    nightCareFilter: string,
    mapLat: number,
    mapLong: number,
}

const GETAroundDental = ({jwtToken, limit, offset, lat, long, sort, timeFilter, dayFilter, holidayFilter, parkingFilter, specialistFilter, goodDentalFilter, nightCareFilter, mapLat, mapLong}: params) => {

    console.log("GETAroundDental lat", lat);
    console.log("GETAroundDental long", long);
    console.log("GETAroundDental sort", sort);
    console.log("GETAroundDental time", timeFilter);
    console.log("GETAroundDental dayFilter", dayFilter);
    console.log("GETAroundDental holiday", holidayFilter);
    console.log("GETAroundDental wantParking", parkingFilter);

    console.log("GETAroundDental goodDentalFilter", goodDentalFilter);
    console.log("GETAroundDental specialistFilter", specialistFilter);
    console.log("GETAroundDental nightCareFilter", nightCareFilter);

    console.log("GETAroundDental limit", limit);
    console.log("GETAroundDental offset", offset);

    console.log("GETAroundDental maplat", mapLat);
    console.log("GETAroundDental maplong", mapLong);

    const uri = serverConfig.baseUri + `/around/clinics?lat=${lat}&long=${long}&wantParking=${parkingFilter}&sort=${sort}&days=${dayFilter}&time=${timeFilter}&holiday=${holidayFilter}&night=${nightCareFilter}&surgeon=${specialistFilter}&transparent=${goodDentalFilter}&limit=${limit}&offset=${offset}&maplat=${mapLat}&maplong=${mapLong}`;

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