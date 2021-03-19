import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    latitude: number,
    longitude: number,
}

const GETAroundCities = ({latitude, longitude}: Props) => {

    console.log("GETAroundCities latitude", latitude);
    console.log("GETAroundCities longitude", longitude);

    const uri = serverConfig.baseUri + `/search/cities/currentLocation?long=${longitude}&lat=${latitude}`;

    console.log("GETAroundCities uri", uri);

    return new Promise((resolve, reject) => {
        axios
        .get(uri)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error.response); 
        })
    })
}

export default GETAroundCities;