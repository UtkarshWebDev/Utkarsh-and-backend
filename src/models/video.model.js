import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
       {
              videoFile: {
                     type: String, //cloudinary url
                     required: true,
              },
              thumbnail: {
                     type: String, //cloudinary url
                     required: true,
              },
              title: {
                     type: String,
                     required: true,
              },
              discription: {
                     type: String,
                     required: true,
              },
              duration: {
                     type: String, //cloudinary url
                     required: true,
              },
              views: {
                     type: String, //cloudinary url
                     default: 0,
              },
              isPublished: {
                     type: String, 
                     required: Boolean,
              },
              owenwr: {
                     type: Schema.Types.ObjectId, 
                     ref: "User"
              }
       },
       {
              timestamps: true
       }


);

videoSchema.plugin(mongooseAggregatePaginate)


export const Video = mongoose.model("Video", videoSchema);