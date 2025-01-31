import { Schema, model, models } from "mongoose";

const HabitChallengeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    aspect: { 
        type: String, 
        enum: ["Health", "Productivity", "Finance", "Mindfulness", "Other"], 
        required: true 
    },
    accessibility: { 
        type: String, 
        enum: ["public", "private"], 
        default: "public" 
    },
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    habit: { 
        type: Schema.Types.ObjectId, 
        ref: "HabitTask", required: true 
    }, 
    start_date: { type: Date, required: true },
    end_date: { type: Date, required: true },
    wager_amount: { type: Number, required: true },
    
    financial_summary: {
        total_collected: { type: Number, default: 0 },
        total_paid_out: { type: Number, default: 0 },
        remaining_pool: { type: Number, default: 0 }
    },

    participants: [{
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        ap_status: { type: String, enum: ["accepted", "pending", "rejected"], default: "pending" },
        amount_staked: { type: Number, required: true },
    }],

    accountability_partners: [{
        type: Schema.Types.ObjectId,
        ref: "User", // TODO Add support for real users or an AI-powered assistant
        required: false,
    }],
    
}, { timestamps: true });

const HabitChallenge = models.HabitChallenge || model("HabitChallenge", HabitChallengeSchema);

export default HabitChallenge;

const ChallengeActivitySchema = new Schema({
    challenge: { type: Schema.Types.ObjectId, ref: "HabitChallenge", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: false }, 
    type: { type: String, enum: ["wager_updated", "joined", "entry_logged", "payout_made", "challenge_completed"], required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export const ChallengeActivity = models.ChallengeActivity || model("ChallengeActivity", ChallengeActivitySchema);
