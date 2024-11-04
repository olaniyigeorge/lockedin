import { Schema, model, models } from "mongoose";

const AccountabilityPartnershipSchema = new Schema({
    habit: {
        type: Schema.Types.ObjectId,
        ref: "HabitTask",
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "declined"],
        default: "pending",
    }
}, {
    timestamps: true,
});


// Ensure that end_date cannot be before start_date (optional validation)
AccountabilityPartnershipSchema.methods.toString = function() {
    return `${this.partner} --H: ${this.habit.owner}`;
};
// AccountabilityPartnershipSchema.methods.habit__owner = function() {
//     return `${this.habit.owner}`;
// };

const HabitTask = models.HabitTask || model("HabitTask", AccountabilityPartnershipSchema);

export default HabitTask;
