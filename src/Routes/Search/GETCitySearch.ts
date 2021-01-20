import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    keyword: string,
    offset: number,
    limit: number,
}

const GETCitySearch = ({keyword, offset, limit}: params) => {

    console.log("GETCitySearch keyword", keyword);
    console.log("GETCitySearch offset", offset);
    console.log("GETCitySearch limit", limit);
    
    const uri = serverConfig.baseUri + `/search/cities?q=${keyword}&offset=${offset}&limit=${limit}`

    return new Promise((resolve, reject) => {
        axios
        .get(uri)
        .then((response) => {
            console.log("GETCitySearch response", response);
            resolve(response.data);
        })
        .catch((error) => {
            reject(error.response);
        })

    })
}

export default GETCitySearch;