import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    reviewId: number,
    starRate_cost: number,
    starRate_treatment: number,
    starRate_service: number,
    certified_bill: boolean,
    formatedTreatmentArray: Array<object>,
    dentalClinicId: number,
    formatedParagraphArray: Array<object>,
    totalPrice: number,
    treatmentDate: Date,
}

const PUTReviewRevise = ({jwtToken, reviewId, starRate_cost, starRate_treatment, starRate_service, certified_bill, formatedParagraphArray, dentalClinicId, formatedTreatmentArray, totalPrice, treatmentDate}: params) => {

    const uri = serverConfig.baseUri + `/api/v1/reviews?reviewId=${reviewId}`

    console.log("PUTReviewRevise reviewId", reviewId);

    console.log("PUTReviewRevise starRate_cost", starRate_cost);
    console.log("PUTReviewRevise starRate_treatment", starRate_treatment);
    console.log("PUTReviewRevise starRate_service", starRate_service);
    console.log("PUTReviewRevise treatments", formatedTreatmentArray);
    console.log("PUTReviewRevise dentalClinicId", dentalClinicId);
    console.log("PUTReviewRevise paragraphs", formatedParagraphArray);
    console.log("PUTReviewRevise totalCost", totalPrice);

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

    return new Promise((resolve, reject) => {
        axios
        .put(uri, formData, {
            headers: {
                "Content-Type": "multipart/form-data;",
                Authorization: jwtToken,
            }
        })
        .then(function(response) {
            resolve(response.data);
        })
        .catch(function(error) {
            reject(error.response)
        })
    })
}

export default PUTReviewRevise;