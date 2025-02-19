import { Schema, model, models } from "mongoose";

const AccountabilityPartnershipSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
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


AccountabilityPartnershipSchema.methods.toString = function() {
    return `${this.partner} --H: ${this.habit.owner}`;
};


const AccountabilityPartnership = models.AccountabilityPartnership || model("AccountabilityPartnership", AccountabilityPartnershipSchema);

export default AccountabilityPartnership;