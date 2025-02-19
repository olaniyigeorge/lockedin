import { Description } from "@radix-ui/react-dialog";
import { Schema, model, models } from "mongoose";


const GoalSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: [true, "What is your goal?"]
    },
    description: {
        type: String,
        required: [false],
        default: ""
    },
    privacy: {
        type: String,
        enum: ["public", "private"],
        default: "public",
    },
    targetDate: {
        type: Date,
        required: [true, "A goal without a deadline is just a wish"]
    },
    isAchieved: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

// Ensure that end_date cannot be before start_date (optional validation)
GoalSchema.pre('save', function(next) {
    const now = new Date(Date())
    if (this.targetDate < now) {
        return next(new Error('Your goal target date should be in the future'));
    }
    next();
});


const Goal = models.Goal || model("Goal", GoalSchema);

export default Goal;
