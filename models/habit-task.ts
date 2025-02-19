import { Schema, model, models } from "mongoose";

const HabitTaskSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    goal: {
        type: Schema.Types.ObjectId,
        ref: "Goal"
    },
    aspect: {
        type: Schema.Types.ObjectId,
        ref: "LifeDomain",
    },
    title: {
        type: String,
        required: [true, "Title is required"],
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
    interval: {
        type: Number,
        default: 1
    },
    frequency: {
        type: String,
        enum: ["daily", "weekly", "every_x_days", ],
    },
    isActive: {
        type: Boolean,
        default: true
    },
    start_date: {
        type: Date,
        default: Date.now,
    },
    end_date: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true
});


// DB level Validation: Ensure that end_date cannot be before start_date
HabitTaskSchema.pre('save', function(next) {
    const now = new Date(Date())
    if (this.interval !== 1 || 7) {
        this.frequency == "every_x_days"
    }
    if (this.frequency == "weekly") { 
        this.interval = 7;
    }
    if (this.start_date >= now  || now >= this.end_date){
        this.isActive = false
    }
    if (this.end_date < this.start_date) {
        return next(new Error('End date must be after start date'));
    }
    next();
});

const HabitTask = models.HabitTask || model("HabitTask", HabitTaskSchema);

export default HabitTask;