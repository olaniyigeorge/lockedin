import { Schema, model, models } from "mongoose";

const WaitlistSchema = new Schema({
    email: {
        type: String,
    },
    discovery_location: {
        type: String,
        enum: ["twitter", "family_and_friends", "telegram_bot", "web"],
        default: "web`",
    }
}, {
    timestamps: true,
});


// // Ensure that end_date cannot be before start_date (optional validation)
// WaitlistSchema.methods.toString = function() {
//     return `${this.partner} --H: ${this.habit.owner}`;
// };


const Waitlist = models.Waitlist || model("Waitlist", WaitlistSchema);

export default Waitlist;



