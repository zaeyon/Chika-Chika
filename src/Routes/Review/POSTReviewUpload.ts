import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    starRate_cost: number,
    starRate_treatment: number,
    starRate_service: number,
    formattedTreatmentArray: Array<object>,
    formattedDiseaseArray: Array<object>,
    dentalClinicId: number,
    formattedParagraphArray: Array<object>,
    formattedProofImage: Object,
    totalPrice?: any,
    treatmentDate: string,
} 

const POSTReviewUpload = ({jwtToken, starRate_cost, starRate_treatment, starRate_service, formattedParagraphArray, dentalClinicId, formattedTreatmentArray=[], formattedDiseaseArray=[], totalPrice, treatmentDate, formattedProofImage}: params) => {
    const uri = serverConfig.baseUri + "/api/v1/reviews"

    console.log("POSTReviewUpload starRate_cost", starRate_cost);
    console.log("POSTReviewUpload starRate_treatment", starRate_treatment);
    console.log("POSTReviewUpload starRate_service", starRate_service);
    console.log("POSTReviewUpload treatments", formattedTreatmentArray);
    console.log("POSTReviewUpload dentalClinicId", dentalClinicId);
    console.log("POSTReviewUpload paragraphs", formattedParagraphArray);
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
        "treatments":${JSON.stringify(formattedTreatmentArray)},
        "diseases":${JSON.stringify(formattedDiseaseArray)},
        "dentalClinicId":${dentalClinicId},
        "totalCost":${totalPrice},
        "treatmentDate":"${treatmentDate}"
    }`
    let formData = new FormData();

    const stringfiedPara = JSON.stringify(formattedParagraphArray);

    if(formattedProofImage.location) {
        const stringfiedProofImage = JSON.stringify(formattedProofImage);
        formData.append("bills", stringfiedProofImage);
    }

    console.log("body", body);
    formData.append("body", body);
    formData.append("paragraphs", stringfiedPara);
    console.log(formData)

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