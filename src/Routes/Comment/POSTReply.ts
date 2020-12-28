import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    commentId: number,
    type: string,
    description: string,
}

const POSTReply = ({jwtToken, commentId, type, description}: Props) => {


    const uri = serverConfig.baseUri + `/api/v1/comments/reply?type=${type}&commentId=${commentId}.`

    console.log("POSTReply jwtToken", jwtToken);
    console.log("POSTReply commentId", commentId);
    console.log("POSTReply type", type);
    console.log("POSTReply description", description);

    const formData = new FormData();
    formData.append("description", description);

    return new Promise((resolve, reject) => {
        
        axios
        .post(uri, formData, {
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

export default POSTReply;