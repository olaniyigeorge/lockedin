import { Schema, model, models } from "mongoose";

const HabitTaskSchema = new Schema({
    aspect: {
        type: Schema.Types.ObjectId,
        ref: "LifeDomain",
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: [true, "Title is required"], // Ensure you have a required field
    },
    description: {
        type: String,
        required: false,
    },
    accessibility: {
        type: String,
        enum: ["public", "private", "partnership"],
        default: "private",
    },
    start_date: {
        type: Date,
        default: Date.now,
    },
    end_date: {
        type: Date,
        required: true, // Make sure this is required if needed
    },
});


// Ensure that end_date cannot be before start_date (optional validation)
HabitTaskSchema.pre('save', function(next) {
    if (this.end_date < this.start_date) {
        return next(new Error('End date must be after start date'));
    }
    next();
});

const HabitTask = models.HabitTask || model("HabitTask", HabitTaskSchema);

export default HabitTask;
