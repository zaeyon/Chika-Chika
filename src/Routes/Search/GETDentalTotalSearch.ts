import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    query: string,
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
    specialistFilter: string,
    goodDentalFilter: string,
    nightCareFilter: string,
}

const GETDentalTotalSearch = ({jwtToken, query, offset, limit, lat, long, category, sort, dayFilter, timeFilter, holidayFilter, parkingFilter, specialistFilter, goodDentalFilter, nightCareFilter}: params) => {

    console.log('GETDentalTotalSearch category', category);

    const uri = serverConfig.baseUri + `/clinics?lat=${lat}&long=${long}&query=${query}&sort=${sort}&days=${dayFilter}&time=${timeFilter}&wantParking=${parkingFilter}&holiday=${holidayFilter}&night=${nightCareFilter}&surgeon=${specialistFilter}&transparent=${goodDentalFilter}&limit=${limit}&offset=${offset}&tagCategory=${category}`;


    console.log("GETDentalTotalSearch jwtToken", jwtToken);
    console.log("GETDentalTotalSearch offset", offset);
    console.log("GETDentalTotalSearch limit", limit);
    console.log("GETDentalTotalSearch sort", sort);
    console.log("GETDentalTotalSearch long", long);
    console.log("GETDentalTotalSearch lat", lat);

    console.log("GETDentalTotalSearch goodDentalFilter", goodDentalFilter);
    console.log("GETDentalTotalSearch specialistFilter", specialistFilter);
    console.log("GETDentalTotalSearch nightCareFilter", nightCareFilter);

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
            console.log("GETDentalTotalSearch 요청보냄")
            resolve(response.data);
        })
        .catch((error) => {
            reject((error.response));
        })
    })
}

export default GETDentalTotalSearch