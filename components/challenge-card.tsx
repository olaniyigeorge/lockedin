import Link from "next/link";

interface Participant {
    user_id: string;
    name: string;
    ap_status: string;
    amount_staked: number;
    _id: string;
}

export interface iChallenge {
    total_collected: number;
    total_paid_out: number;
    remaining_pool: number;
    _id: string;
    title: string;
    description: string;
    aspect: string;
    accessibility: string;
    owner: string;
    habit: string;
    start_date: string;
    end_date: string;
    wager_amount: number;
    participants: Participant[];
    accountability_partners: Participant[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}


export default function ChallengeCard(challenge: iChallenge ) {
    return (
        <div className="w-full border p-4 rounded shadow-md">
            <h2 className="font-bold text-xl mb-2">
                <Link href={`/challenge/${challenge._id}`}>
                    {challenge.title}
                </Link>
            </h2>
            <p className="text-gray-700 mb-2">{challenge.description}</p>
            <p className="text-gray-500">Aspect: {challenge.aspect}</p>
            <p className="text-gray-500">Start Date: {new Date(challenge.start_date).toLocaleDateString()}</p>
            <p className="text-gray-500">End Date: {new Date(challenge.end_date).toLocaleDateString()}</p>
            <p className="text-gray-500">Wager Amount: ${challenge.wager_amount}</p>
            <p className="text-gray-500">Participants: {challenge.participants.length}</p>
        </div>
    );
}