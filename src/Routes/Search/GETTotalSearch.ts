import axios from 'axios'
import serverConfig from '../server.config'

interface Params {
    jwtToken: string,
    query: string,
    type: string,
    limit: number,
    offset: number,
    order: string,
    region: string,
    cityId: number,
}

const GETTotalSearch = ({jwtToken, query, type, limit, offset, order, region, cityId}: Params) => {

    const uri = serverConfig.baseUri + `/search/${type}?query=${query}&type=${type}&limit=${limit}&offset=${offset}&order=${order}&region=${region}&cityId=${cityId}`


    return new Promise((resolve, reject) => {
        axios
        .get(uri, {
            headers: {
                Authorization: jwtToken
            }
        })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error.data);
        })
    })

}

export default GETTotalSearch