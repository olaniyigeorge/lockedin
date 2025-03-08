import { Schema, model, models } from "mongoose";

const HabitTaskEntrySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    habit_challenge: {
        type: Schema.Types.ObjectId,
        ref: 'HabitChallenge',
        required: false, // Not required because some task might not be linked to a challenge
    },
    habit: {
        type: Schema.Types.ObjectId,
        ref: 'HabitTask',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        index: true,
    },
    note: {
        type: String,
        required: [false, "An added note could help in reviewing this entry"]
    },
    status: {
        type: String,
        enum: ["logged", "in-review", "completed"],
        default: "logged",
    },
    proof_link: {
        type: String, // URL for proof of completion e.g video, image, repo_link, doc etc
        required: false,
    },
}, {
    timestamps: true,
});

// Unique constraint on habit and date
HabitTaskEntrySchema.index({ habit: 1, date: 1 }, { unique: true });

HabitTaskEntrySchema.methods.toString = function() {
    return `${this.date.getDate()}'s entry on ${this.habit.title}: (${this.completed})`;
};

const HabitTaskEntry = models.HabitTaskEntry || model("HabitTaskEntry", HabitTaskEntrySchema);
export default HabitTaskEntry


