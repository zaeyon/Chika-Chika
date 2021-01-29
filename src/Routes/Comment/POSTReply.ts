import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    commentId: string,
    postType: string,
    description: string,
    targetUserNickname: string,
    postId: number,
}

const POSTReply = ({jwtToken, commentId, postType, description, targetUserNickname, postId}: Props) => {
    let requestId = ""
    if(postType === "review") requestId = "reviewId"
    else if(postType === "community") requestId = "postId"


    const uri = serverConfig.baseUri + `/api/v1/comments/reply?type=${postType}&commentId=${commentId}&${requestId}=${postId}`

    const formData = new FormData();
    formData.append("description", description);
    formData.append("targetUserNickname", targetUserNickname);

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