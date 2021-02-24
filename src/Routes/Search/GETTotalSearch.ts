import axios from 'axios'
import serverConfig from '../server.config'

interface Params {
    lat?: string,
    long?: string,
    jwtToken: string,
    query: string,
    category: string,
    tagId: string,
    pathType: string,
    communityType?: string | undefined;
    limit: string,
    offset: string,
    order: string,
    region: string,
    cityId: string,
    isUnified?: boolean | undefined,
}

const GETTotalSearch = ({lat, long, jwtToken, query, category, tagId='-1', pathType, communityType="All", limit, offset, order, region, cityId, isUnified=true}: Params) => {

    const uri = serverConfig.baseUri + `/search/${pathType}?query=${query}&lat=${lat}&long=${long}&tagCategory=${category}&tagId=${tagId}&type=${communityType}&limit=${limit}&offset=${offset}&order=${order}&region=${region}&cityId=${cityId}&unifiedSearch=${isUnified}`

    console.log(uri)
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