import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    starRate_cost: number,
    starRate_treatment: number,
    starRate_service: number,
    formatedTreatmentArray: Array<object>,
    dentalClinicId: number,
    formatedParagraphArray: Array<object>,
    formattedProofImage: Object,
    totalPrice?: any,
    treatmentDate: string,
} 

const POSTReviewUpload = ({jwtToken, starRate_cost, starRate_treatment, starRate_service, formatedParagraphArray, dentalClinicId, formatedTreatmentArray, totalPrice, treatmentDate, formattedProofImage}: params) => {
    console.log("serverConfig.jwtToken", serverConfig.jwtToken);
    const uri = serverConfig.baseUri + "/api/v1/reviews"

    console.log("POSTReviewUpload starRate_cost", starRate_cost);
    console.log("POSTReviewUpload starRate_treatment", starRate_treatment);
    console.log("POSTReviewUpload starRate_service", starRate_service);
    console.log("POSTReviewUpload treatments", formatedTreatmentArray);
    console.log("POSTReviewUpload dentalClinicId", dentalClinicId);
    console.log("POSTReviewUpload paragraphs", formatedParagraphArray);
    console.log("POSTReviewUpload totalCost", totalPrice);
    console.log("POSTReviewUpload treatmentDate", treatmentDate);
    console.log("POSTReviewUpload formattedProofImage", formattedProofImage);

    if(!totalPrice) {
        totalPrice = null
    } 

    const body = `{
        "starRate_cost":${starRate_cost},
        "starRate_treatment":${starRate_treatment},
        "starRate_service":${starRate_service},
        "treatments":${JSON.stringify(formatedTreatmentArray)},
        "dentalClinicId":${dentalClinicId},
        "totalCost":${totalPrice},
        "treatmentDate":"${treatmentDate}"
    }`

    const stringfiedPara = JSON.stringify(formatedParagraphArray); 
    const stringfiedProofImage = JSON.stringify(formattedProofImage);

    console.log("body", body);

    var formData = new FormData();
    formData.append("body", body);
    formData.append("bills", stringfiedProofImage);
    formData.append("paragraphs", stringfiedPara);

    return new Promise(function(resolve, reject) {
        axios
        .post(uri, formData, {
            headers: {
                "Content-Type": "multipart/form-data;",
                Authorization: jwtToken,
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