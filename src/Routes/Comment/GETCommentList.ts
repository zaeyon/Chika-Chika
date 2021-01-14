import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    type: string,
    id: number,
}

const GETCommentList = ({jwtToken, type, id}: Props) => {

    const uri = serverConfig.baseUri + `/api/v1/comments/lists?type=${type}&reviewId=${id}`

    return new Promise(function(resolve, reject) {
        
        axios
        .get(uri, {
            headers: {
                Authorization: jwtToken,
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

export default GETCommentList;