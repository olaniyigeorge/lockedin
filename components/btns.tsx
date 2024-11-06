"use client"

import { toast } from "react-toastify"


interface deleteBtnProps{
    id: string
}

export function DeleteHabitTaskBtn(props: deleteBtnProps) {
    
    const deleteHabitTask = async () => {
        console.log("Deleting ", props.id)
        toast.success(`Deleted ${props.id}`)
        try {
            const response = await fetch(`/api/lockedin/habit-tasks?id=${props.id}`, {
                method: "DELETE",
            });
            if (response.status == 204) {
                toast.success("Habit task deleted successfully")
            }
            toast.error(`Error ${response.status}`)
        } catch(error) {
            toast.error(`Failed to delete`)
        }
    }

    return (
        <button 
            onClick={deleteHabitTask}
            className="shadow bg-red-300 p-2 rounded-3xl text-sm">
             Delete
        </button>
    )
}