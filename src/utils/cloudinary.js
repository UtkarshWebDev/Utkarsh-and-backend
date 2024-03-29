import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";



cloudinary.config({
       cloud_name: process.env.COLUDINARY_CLOUD_NAME,
       api_key: process.env.COLUDINARY_API_KEY,
       api_secret: process.env.COLUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {

       try {
              if (!localFilePath) return null;
              //upload the file on cloudinary
              const response = await cloudinary.uploader.upload(localFilePath, {
                     resource_type: "auto",
              })

              //file has been uploaded successfully
              console.log("upload on cloudinary successfully", response.url);


              return response

       } catch (error) {
            fs.unlinkSync(localFilePath) //remove the temporary file as the upload operation got failed
       }

}

export {uploadOnCloudinary}

/*cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
       { public_id: "olympic_flag" },
       function (error, result) { console.log(result); }); 
       */