import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    reviewId: number,
    images: Array<any>,
    starRate_cost: number,
    starRate_treatment: number,
    starRate_service: number,
    certified_bill: boolean,
    treatments: Array<any>,
    dentalClinicId: number,
}

const PUTReviewRevise = ({jwtToken, reviewId, images, starRate_cost}: params) => {

    const uri = serverConfig.baseUri + `/api/v1/reviews?reviewId=${reviewId}`

    return new Promise((resolve, reject) => {
        axios
        .put(uri)
    })
}

export default PUTReviewRevise;