import { Schema, model, models } from "mongoose";

const HabitTaskEntrySchema = new Schema({
    habit_challenge: {
        type: Schema.Types.ObjectId,
        ref: 'HabitChallenge',
        required: false, // Not required because some tasks might be private
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
    completed: {
        type: Boolean,
        default: false,
    },
    proof_link: {
        type: String, // URL for proof of completion e.g video, image, or doc
        required: false,
    },
}, {
    timestamps: true,
});

// Unique constraint on habit and date
HabitTaskEntrySchema.index({ habit: 1, date: 1 }, { unique: true });

HabitTaskEntrySchema.methods.toString = function() {
    return `${this.date.getDate()}'s entry on ${this.habit.title}: ${this.completed ? 'Completed' : 'Not Completed'}`;
};

const HabitTaskEntry = models.HabitTaskEntry || model("HabitTaskEntry", HabitTaskEntrySchema);
export default HabitTaskEntry


