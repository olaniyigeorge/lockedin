import { Schema, model, models } from "mongoose";


const LifeDomainSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    description: {
        type: String,
        required: [false, "Description is required"]
    }
})

const LifeDomain = models.LifeDomain || model("LifeDomain", LifeDomainSchema)


export default LifeDomain