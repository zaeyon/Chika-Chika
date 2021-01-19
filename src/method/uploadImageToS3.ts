
import {RNS3} from 'react-native-upload-aws-s3';

export async function uploadImageToS3(imageFile: any) {
  console.log('imagefile!', imageFile)
    const imageId = String(imageFile.uri).replace("ph://", "")
    const imageIdArray = imageId.split("/");
    const filenameArray = imageFile.filename.split(".");
    const imageType = `image/${String(filenameArray[1]).toLowerCase()}`
    const imagePath = imageFile.uri.includes('file://') ? imageFile.uri : `assets-library://asset/asset.${'JPG'}?id=${imageId}&ext=${'JPG'}`
    const imageSize = imageFile.fileSize
    const width = imageFile.width;
    const height = imageFile.height;

    const originalName = Date.now() + imageIdArray[0] + "." + filenameArray[1]

    const file = {
        uri: imagePath,
        name: originalName,
        type: imageType,
    }

    const options = {
        keyPrefix: "original/",
        bucket: "chikachika-review-images",
        region: "ap-northeast-2",
        accessKey: "AKIA257435TNVCTR6JP2",
        secretKey: "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",
        successActionStatus: 201
    }

    try{
        const response = await RNS3.put(file, options)
        if (response.status === 201){
          console.log("Success: ", response.body)

          const result = {
            response: response.body.postResponse,
            originalName: originalName,
            size: imageSize,
            type: imageType,
            width,
            height,
          }
        
          return result

        } else {
          console.log("Failed to upload image to S3: ", response)
        }
      } catch(error){
        console.log("error", error)
      }
 }
 