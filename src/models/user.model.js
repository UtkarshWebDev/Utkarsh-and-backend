import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({

       userName: {
              type: String,
              required: true,
              unique: true,
              loweercase: true,
              trim: true,
              index: true,
       },
       email: {
              type: String,
              required: true,
              unique: true,
              loweercase: true,
              trim: true,

       },
       fullName: {
              type: String,
              required: true,
              loweercase: true,
              trim: true,
              index: true,
       },
       avatar: {
              type: String, //cloudinary url
              required: true,
       },
       coverImage: {
              type: String,

       },
       watchHistory: [
              {
                     type: Schema.Types.ObjectId,
                     ref: "Video",
              }
       ],
       Password: {
              type: String,
              required: [true, "Password is required"],


       },
       refreshToken: {
              type: String,
       },
},
       {
              timestamps: true
       }

);

userSchema.pre('save', async function (next) {
       if (!this.isModified("password")) return next();
       this.Password = await bcrypt.hash(this.Password, 10, next())
})

userSchema.methods.isPasswordCorrect = async function (password) {
       return await bcrypt.compare(password, this.Password)
}

userSchema.methods.genrateAccessToken = function () {
        return jwt.sign(
              {

                 _id: this._id,
                 email: this.Email, 
                 username: this.userName,
                 fullName: this.fullName,

          },
          process.env.ACCESS_TOKEN_SECRET,
          {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRY
          }
       )
}

userSchema.methods.genrateRefreshToken = function () {
       return jwt.sign(
             {

                _id: this._id,
                
         },
         process.env.REFRESH_TOKEN_SECRET,
         {
             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
         }
      )
}


export const User = mongoose.model("User", userSchema);