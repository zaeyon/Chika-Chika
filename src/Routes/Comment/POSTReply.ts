import axios from 'axios';
import serverConfig from '../server.config';

interface Props {
    jwtToken: string,
    commentId: number,
    type: string,
    description: string,
    targetUser: string,
    postId: number,
}

const POSTReply = ({jwtToken, commentId, type, description, targetUser, postId}: Props) => {

    let uri = ""
    if(type === "review") {
        uri = serverConfig.baseUri + `/api/v1/comments/reply?type=${type}&commentId=${commentId}&reviewId=${postId}`
    } else {

    }

    console.log("POSTReply jwtToken", jwtToken);
    console.log("POSTReply commentId", commentId);
    console.log("POSTReply type", type);
    console.log("POSTReply description", description);
    console.log("POSTReply targetUser", targetUser);

    const formData = new FormData();
    formData.append("description", description);
    formData.append("targetUserNickname", targetUser);

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