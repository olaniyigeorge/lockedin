


export interface ChallengeData {
    title: string;
    description: string;
    aspect: string;
    accessibility: string;
    owner: string;
    habit: string;
    owner_name: string
    start_date: Date;
    end_date: Date;
    wager_amount: number;
    
}

export async function createChallenge(userId: string, data: ChallengeData) {
    const challengeData = {
        ...data,
        owner: userId,
        financial_summary: {
            total_collected: data.wager_amount,
            total_paid_out: 0,
            remaining_pool: data.wager_amount
        },
        participants: [{ user_id: userId, name: data.owner_name, ap_status: "accepted", amount_staked: data.wager_amount }]
    };

    console.log(challengeData)
    try {
        const response = await fetch('/api/challenge/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(challengeData)
        });

        if (!response.ok) {
            throw new Error('Failed to create challenge');
        }

        const challenge = await response.json();
        return challenge.data;
    } catch (error) {
        console.error(error);
        return challengeData;
    }
}

async function joinChallenge(challengeId: string, userId: string, userName: string, wagerAmount: number) {
    const response = await fetch(`/api/challenge/${challengeId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id: userId,
            name: userName,
            ap_status: "accepted",
            amount_staked: wagerAmount
        })
    });

    if (!response.ok) {
        throw new Error('Failed to join challenge');
    }

    const challenge = await response.json();
    return challenge;
}

async function logHabitEntry(userId: string, challengeId: string, date: Date) {
    const challengeResponse = await fetch(`/api/challenge/${challengeId}`);
    if (!challengeResponse.ok) {
        throw new Error('Challenge not found');
    }

    const challenge = await challengeResponse.json();

    const entryResponse = await fetch('/api/task-entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ habit_challenge: challengeId, user: userId, habit: "workout", date, completed: true })
    });

    if (!entryResponse.ok) {
        throw new Error('Failed to log habit entry');
    }

    const entry = await entryResponse.json();

    // Update Financial Summary
    const remainingDays = Math.ceil((new Date(challenge.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    const dailyPayout = challenge.financial_summary.remaining_pool / remainingDays;

    const participant = challenge.participants.find((p: { user_id: { toString: () => string; }; }) => p.user_id.toString() === userId);
    if (participant) {
        const userEarnings = (participant.amount_staked / challenge.financial_summary.total_collected) * dailyPayout;
        challenge.financial_summary.total_paid_out += userEarnings;
        challenge.financial_summary.remaining_pool -= userEarnings;
    }

    const updateResponse = await fetch(`/api/challenge/${challengeId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            financial_summary: challenge.financial_summary
        })
    });

    if (!updateResponse.ok) {
        throw new Error('Failed to update challenge financial summary');
    }

    // Log Activity
    const activityResponse = await fetch('/api/challenge-activity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            challenge: challengeId,
            user: userId,
            type: "entry_logged",
            message: `User ${userId} logged a workout for ${date.toDateString()}`
        })
    });

    if (!activityResponse.ok) {
        throw new Error('Failed to log activity');
    }

    return entry;
}


export async function getChallenge(challengeId: string) {
    try {
        const response = await fetch(`${process.env.DOMAIN}/api/challenge?id=${challengeId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            console.error(response)
            return null
        }

        const challenge = await response.json();
        return {
            ...challenge.data.challenge,
            entries: challenge.data.habitTaskEntries
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}