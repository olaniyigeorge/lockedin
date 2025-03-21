import { Schema, model, models } from "mongoose";

const LogSchema = new Schema({
    user: {
        type: String,
    },
    details: {
        type: String,
        required: [false, "Details are required"]
    }
}, {
    timestamps: true
});

const Log = models.Log || model("Log", LogSchema);

export default Log;
