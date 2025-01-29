"use client";

import { useState } from "react";
import { toast } from "react-toastify";

interface MarkTodayButtonProps {
    habitId: string;
}

const MarkTodayButton: React.FC<MarkTodayButtonProps> = ({ habitId }) => {
    const [message, setMessage] = useState<string | null>(null);

    const markToday = async () => {
        const markTodayUrl = `/api/task-entries`; 

        try {
            const response = await fetch(markTodayUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    habit: habitId,
                    completed: true,
                    date: new Date().toISOString(),
                }),
            });

            if (response.ok) {
                setMessage("Entry marked as completed for today.");
                toast.success("Entry marked as completed for today.");
                window.location.reload();
            } else if (response.status === 409) {
                setMessage("You have already marked this task for today.");
                toast.error("You have already marked this task for today.");
            } else {
                setMessage("Failed to mark entry as completed.");
                toast.error("Failed to mark entry as completed.");
            }
        } catch (error) {
            console.error("Error marking entry:", error);
            setMessage("Error marking entry.");
            toast.error("Error marking entry.");
        }
    };

    return (
        <div>
            <button onClick={markToday} className="p-2 border rounded-xl cursor-pointer my-2">
                Mark Today
            </button>
            {/* {message && <p>{message}</p>} */}
        </div>
    );
};

export default MarkTodayButton;
