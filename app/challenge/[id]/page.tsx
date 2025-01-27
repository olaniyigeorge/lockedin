import AccountabilityPartnership, { iAccountabilityPartnership } from "@/components/accountability-partnership";



export default function ThisChallenge({ params }: { params: { id: string } }) {
    // console.log("params: ", params)
    const partnership: iAccountabilityPartnership = {
        _id: "",
        task: {
            _id: "f2n4ruiv3br9bvu",
            aspect: "Health",
            owner: "John Doe",
            title: "Gym Challenge: 5x Weekly",
            description: "Must attend the gym at least five times in a week for the next 3 months. Each sessin must be at least 45 mins long",
            accessibility: "public",
            start_date: new Date("2024-12-30"),
            end_date: new Date("2025-02-01"),
            entries: [
                { _id: "entry3", habit: "workout", date: new Date("2024-12-30"), completed: true },
                { _id: "entry4", habit: "workout", date: new Date("2024-12-31"), completed: true },
                { _id: "entry5", habit: "workout", date: new Date("2025-01-01"), completed: false },
                { _id: "entry6", habit: "workout", date: new Date("2025-01-02"), completed: true },
                { _id: "entry7", habit: "workout", date: new Date("2025-01-04"), completed: true },
            ],
        },
        status: "Active",
        wager_amount: 300,
        financial_summary: {
            total_collected: 200,
            total_paid_out: 300,
            remaining_pool: -100
        },
        participants: [
            {
                "name": "Abeleje Olaniyi",
                "ap_status": "accepted",
                "amount_staked": 400
            },
            {
                "name": "John Doe",
                "ap_status": "accepted",
                "amount_staked": 5000
            },
            {
                "name": "Femi Falana",
                "ap_status": "pending",
                "amount_staked": 250
            },
        ]
    } 
    return (
        <AccountabilityPartnership  {...partnership}/>
    )
}

