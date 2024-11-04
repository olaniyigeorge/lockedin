import { Schema, model, models } from "mongoose";

const HabitTaskEntrySchema = new Schema({
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
    }
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
