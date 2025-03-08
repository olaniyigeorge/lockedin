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
},{
    timestamps: true
})

const LifeDomain = models.LifeDomain || model("LifeDomain", LifeDomainSchema)


export default LifeDomain


const d = {
    "owner": "67c7293b369f8cf0556aec2f",
    "goal": null,
    "aspect": "67cabcf179d00f1763c86152",
    "title": "Skill Development & Networking",
    "description": "Spend 1-2 hours daily learning, building projects, or networking to grow professionally.",
    "accessibility": "private",
    "interval": 1,
    "frequency": "daily",
    "isActive": true,
    "start_date": "2025-03-08T00:00:00.000Z",
    "end_date": "2025-12-31T23:59:59.999Z"
}
