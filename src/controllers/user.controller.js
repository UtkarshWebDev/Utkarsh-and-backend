import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { User } from "../utils/User.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {

       // get user details from frontend
       // validation - not empty
       // check if user already exists: username, email
       // check for images, check for avatar
       // upload them to cloudinary, avatar
       // create user object - create entry in db
       // remove password and refresh token field from response
       // check for user creation
       // return res



       // get user details from frontend
       const { fullname, email, password, userName } = req.body
     //  console.log("email: ", email);



       if (
              [fullname, email, password, userName].some((field) => field?.trim() === "")
       ) {

              // validation - not empty
              throw new ApiError(400, "All fields must be required")
       }


       // check if user already exists: username, email
       const existedUser = User.findOne({
              $or: [{ userName }, { email }]
       })
       if (existedUser) {
              throw new ApiError(409, `User ${userName} already exists`)
       }

       // check for images, 
       const avatarLocalPath = req.files?.avatar[0]?.path;
       const coverImageLocalPath = req.files?.coverImage[0]?.path;

       //check for avatar

       if (!avatarLocalPath) {
              throw new ApiError(404, "Avatar not found");
       }

 // upload them to cloudinary, avatar
       const avatar = await uploadOnCloudinary(avatarLocalPath)
       const coverImage = await uploadOnCloudinary(coverImageLocalPath) 

  //check for avatar
       if (!avatar) {
              throw new ApiError(404, "Avatar not found");
       }

 // create user object - create entry in db
       const user = await User.create({
              fullName,
              avatar: avatar.url,
              coverImage: coverImage?.url || "",
              email, 
              password,
              username: username.toLowerCase()
          })


          const createsdUser = await User.findById(user._id).select(
              "-password -refreshToken"
          )


           // check for user creation
if (!createsdUser) {
       throw new ApiError(500, "Somthing Went wrong While registering the user");
}

// return res
 return res.status(201).json(
       new ApiResponse(200 , createsdUser, "User registered successfully")
 )
 
})
export { registerUser };