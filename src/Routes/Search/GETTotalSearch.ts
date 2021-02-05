import axios from 'axios'
import serverConfig from '../server.config'

interface Params {
    jwtToken: string,
    query: string,
    category: string,
    pathType: string,
    communityType?: string | undefined;
    limit: string,
    offset: string,
    order: string,
    region: string,
    cityId: string,
}

const GETTotalSearch = ({jwtToken, query, category, pathType, communityType="All", limit, offset, order, region, cityId}: Params) => {

    const uri = serverConfig.baseUri + `/search/${pathType}?query=${query}&category=${category}&type=${communityType}&limit=${String(limit)}&offset=${String(offset)}&order=${order}&region=${region}&cityId=${cityId}`

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