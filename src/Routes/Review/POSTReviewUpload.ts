import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    starRate_cost: number,
    starRate_treatment: number,
    starRate_service: number,
    certified_bill: boolean,
    formatedTreatmentArray: Array<object>,
    dentalClinicId: number,
    formatedParagraphArray: Array<object>,
    totalPrice?: number,
    treatmentDate: string,
} 

const POSTReviewUpload = ({jwtToken, starRate_cost, starRate_treatment, starRate_service, certified_bill, formatedParagraphArray, dentalClinicId, formatedTreatmentArray, totalPrice, treatmentDate}: params) => {
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


    const body = `{
        "starRate_cost":${starRate_cost},
        "starRate_treatment":${starRate_treatment},
        "starRate_service":${starRate_service},
        "certified_bill":${certified_bill},
        "treatments":${JSON.stringify(formatedTreatmentArray)},
        "dentalClinicId":${dentalClinicId},
        "totalCost":${totalPrice},
        "treatmentDate":"${treatmentDate}"
    }`

    const stringfiedPara = JSON.stringify(formatedParagraphArray); 

    console.log("body", body);

    var formData = new FormData();
    formData.append("body", body);
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