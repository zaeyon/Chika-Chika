import axios from 'axios'
import serverConfig from '../server.config'

interface Params {
    lat?: string,
    long?: string,
    jwtToken: string,
    query: string,
    pathType: string,
    limit: string,
    offset: string,
    order: string,
    region: string,
    cityId: string,
    isUnified?: boolean | undefined,
    communityType?: string | undefined,
}

const GETTotalSearch = ({lat='0', long='0', jwtToken, query, pathType, limit, offset, order, region, cityId, isUnified=false, communityType='Question'}: Params) => {

    const uri = serverConfig.baseUri + `/search/${pathType}?query=${query}&lat=${lat}&long=${long}&limit=${limit}&offset=${offset}&order=${order}&region=${region}&cityId=${cityId}&unifiedSearch=${String(isUnified)}&communityType=${communityType}`
    console.log('get total request', uri)

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
            console.log('GETTotalSearch error', error.response)
            reject(error.data);
        })
    })

}

export default GETTotalSearch