import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    starRate_cost: number,
    starRate_treatment: number,
    starRate_service: number,
    certified_bill: boolean,
    treatments: Array<object>,
    dentalClinicId: number,
    paragraphs: Array<object>,
} 

const POSTReviewUpload = ({starRate_cost, starRate_treatment, starRate_service, certified_bill, treatments, dentalClinicId, paragraphs}: params) => {
    console.log("serverConfig.jwtToken", serverConfig.jwtToken);
    const uri = serverConfig.baseUri + "/prod/api/vi/reviews"

    console.log("POSTReviewUpload starRate_cost", starRate_cost);
    console.log("POSTReviewUpload starRate_treatment", starRate_treatment);
    console.log("POSTReviewUpload starRate_service", starRate_service);
    console.log("POSTReviewUpload treatments", treatments);
    console.log("POSTReviewUpload dentalClinicId", dentalClinicId);
    console.log("POSTReviewUpload paragraphs", paragraphs);

    const body = `""starRate_cost":${starRate_cost},"starRate_treatment":${starRate_treatment},"starRate_service":${starRate_service},"certified_bill":${certified_bill},"treatments":${treatments},"dentalClinicId":${dentalClinicId}`

    console.log("body", body);

    var formData = new FormData();
    formData.append("body", body);
    formData.append("paragraphs", paragraphs);

    return new Promise(function(resolve, reject) {
        axios
        .post(uri, formData, {
            headers: {
                "Content-Type": "multipart/form-data;",
                Authorization: serverConfig.jwtToken
            }
        })
        .then(function(response) {
            resolve(response.data)
        })
        .catch(function(error) {
            reject(error.response)
        })
    })
}

export default POSTReviewUpload