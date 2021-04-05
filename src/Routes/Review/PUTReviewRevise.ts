import axios from 'axios';
import serverConfig from '../server.config';

interface params {
    jwtToken: string,
    reviewId: number,
    starRate_cost: number,
    starRate_treatment: number,
    starRate_service: number,
    formattedTreatmentArray: Array<object>,
    formattedDiseaseArray: Array<object>,
    dentalClinicId: number,
    formattedParagraphArray: Array<object>,
    formattedProofImage: any,
    totalPrice: number,
    treatmentDate: Date,
    recommend: boolean,
    correctionStartDate: any,
    correctionEndDate: any,
}

const PUTReviewRevise = ({jwtToken, reviewId, starRate_cost, starRate_treatment, starRate_service, formattedParagraphArray, dentalClinicId, formattedTreatmentArray, formattedDiseaseArray=[], formattedProofImage, totalPrice, treatmentDate, recommend, correctionStartDate, correctionEndDate}: params) => {

    const uri = serverConfig.baseUri + `/api/v1/reviews?reviewId=${reviewId}`

    console.log("PUTReviewRevise reviewId", reviewId);

    console.log("PUTReviewRevise starRate_cost", starRate_cost);
    console.log("PUTReviewRevise starRate_treatment", starRate_treatment);
    console.log("PUTReviewRevise starRate_service", starRate_service);
    console.log("PUTReviewRevise treatments", formattedTreatmentArray);
    console.log("PUTReviewRevise dentalClinicId", dentalClinicId);
    console.log("리뷰 수정 PUTReviewRevise paragraphs", formattedParagraphArray);
    console.log("PUTReviewRevise totalCost", totalPrice);

    console.log("PUTReviewRevise recommend", recommend);
    console.log("PUTReviewRevise correctionStarDate", correctionStartDate);
    console.log("PUTReviewRevise correctionEndDate", correctionEndDate);

    if(!totalPrice) {
        totalPrice = null
    }

     // const body = `{
    //     "starRate_cost":${starRate_cost},
    //     "starRate_treatment":${starRate_treatment},
    //     "starRate_service":${starRate_service},
    //     "treatments":${JSON.stringify(formattedTreatmentArray)},
    //     "diseases":${JSON.stringify(formattedDiseaseArray)},
    //     "dentalClinicId":${dentalClinicId},
    //     "totalCost":${totalPrice},
    //     "treatmentDate":"${treatmentDate}"
    // }`

    const body = `{
        "recommend":${recommend},
        "treatments":${JSON.stringify(formattedTreatmentArray)},
        "diseases":${JSON.stringify(formattedDiseaseArray)},
        "dentalClinicId":${dentalClinicId},
        "totalCost":${totalPrice},
        "correctionStartDate": ${JSON.stringify(correctionStartDate)},
        "correctionEndDate": ${JSON.stringify(correctionEndDate)}
    }`

    const stringfiedPara = JSON.stringify(formattedParagraphArray); 
    const stringfiedProofImage = JSON.stringify(formattedProofImage);

    console.log("body", body);

    var formData = new FormData();
    formData.append("body", body);
    formData.append("bills", stringfiedProofImage);
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