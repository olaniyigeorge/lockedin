import { Schema, model, models } from "mongoose";

const WaitlistSchema = new Schema({
    full_name: {
        type: String,
    },
    email: {
        type: String,
    },
    discovery_location: {
        type: String,
        enum: ["twitter", "family_and_friends", "telegram_bot", "web", "linkedin"],
        default: "web`",
    }
}, {
    timestamps: true,
});


const Waitlist = models.Waitlist || model("Waitlist", WaitlistSchema);

export default Waitlist;



