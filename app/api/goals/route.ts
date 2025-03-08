import HabitTask from "@/models/habit-task";
import { connectToDB } from "@/services/db_mongo";
import { NextResponse } from "next/server";
import Goal from "@/models/goal";
import User from "@/models/user";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const owner = url.searchParams.get("owner");
    const id = url.searchParams.get("id");
    const privacy = url.searchParams.get("privacy");

    await connectToDB();

    if (owner) {
      console.log("Getting goals from user... \n");

      const filter: { owner: string; privacy?: string } = { owner: owner };
      if (privacy) {
        filter.privacy = privacy;
      }
      const my_goals = await Goal.find(filter);

      // Fetch goals tasks using their IDs
      const goal_ids = my_goals.map((goal) => goal._id);
      const tasks = await HabitTask.find({ goal: { $in: goal_ids } });

      // Create a mapping of habit tasks for easier access
      const tasksMap = tasks.reduce((acc, task) => {
        if (!acc[task.goals]) {
          acc[task.goals] = [];
        }
        acc[task.goals].push(task);
        return acc;
      }, {});

      // Combine the goals with their respective habit tasks
      const goalsWithHabitTasks = my_goals.map((goal) => ({
        ...goal.toObject(),
        tasks: tasksMap[goal._id] || [],
      }));

      return NextResponse.json(
        {
          message: "Goals(& habit tasks) fetched successfully",
          data: goalsWithHabitTasks,
        },
        { status: 200 }
      );
    }

    if (id) {
      console.log("Getting this goal... \n");

      const goal = await Goal.findById(id).populate({
        path: "owner",
        select: "-password",
        model: User,
      });
      if (!goal) {
        return new Response("Goal not found", { status: 404 });
      }

      // Fetch habit tasks for this goal
      const tasks = await HabitTask.find({ goal: id });

      // Create a plain object with the habit task details and entries
      const goalWithHabitTasks = {
        ...goal.toObject(),
        tasks,
      };
      return new Response(JSON.stringify(goalWithHabitTasks), { status: 200 });
    }

    if (privacy) {
      console.log("Getting all public goals... \n"); // TODO take pagination params

      const public_goals = await Goal.find({ privacy });

      // Fetch goals tasks using their IDs
      const goal_ids = public_goals.map((goal) => goal._id);
      const tasks = await HabitTask.find({ goal: { $in: goal_ids } });

      // Create a mapping of habit tasks for easier access
      const tasksMap = tasks.reduce((acc, task) => {
        if (!acc[task.goals]) {
          acc[task.goals] = [];
        }
        acc[task.goals].push(task);
        return acc;
      }, {});

      // Combine the goals with their respective habit tasks
      const goalsWithHabitTasks = public_goals.map((goal) => ({
        ...goal.toObject(),
        tasks: tasksMap[goal._id] || [],
      }));

      return NextResponse.json(
        {
          message: "Public goals fetched successfully",
          data: goalsWithHabitTasks,
        },
        { status: 200 }
      );
    }

    return new Response("No filter param", { status: 400 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch public goals", { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const { owner, name, description, privacy, isAchieved, targetDate } =
    await request.json();
  console.log(owner);

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      await connectToDB();
      const goal = await Goal.findById(id);

      if (!goal) {
        return new Response("Goal not found", { status: 404 });
      }

      // Update the goal data
      goal.name = name;
      goal.description = description;
      goal.privacy = privacy;
      goal.targetDate = targetDate;
      goal.isAchieved = isAchieved;

      await goal.save();

      return new Response("Successfully updated goal", { status: 200 });
    }

    return new Response("No filter param", { status: 400 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch goal", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      await connectToDB();

      await Goal.findByIdAndDelete(id);
      return new Response("Goal deleted successfully", { status: 204 });
    }
  } catch (error) {
    console.log(error);
    return new Response("Error deleting goal", { status: 500 });
  }
}

export async function POST(request: Request) {
  const { owner, name, description, privacy, isAchieved, targetdate } =
    await request.json();

  try {
    await connectToDB();

    const newGoal = new Goal({
      owner,
      name,
      description,
      privacy,
      isAchieved,
      targetdate,
    });

    await newGoal.save();

    return NextResponse.json(
      {
        message: "Goal created successullly",
        data: newGoal,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Failed to create goal",
        data: error,
      },
      { status: 500 }
    );
  }
}
