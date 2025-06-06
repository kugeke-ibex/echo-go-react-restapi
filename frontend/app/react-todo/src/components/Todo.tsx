import { FormEvent } from "react";
import {
    ArrowRightOnRectangleIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { useMutateAuth } from "../hooks/useMutateAuth";
import { useQueryTasks } from "../hooks/useQueryTasks";
import { useMutateTask } from "../hooks/useMutateTask";
import { TaskItem } from "./TaskItem";
import useStore from "../store";
import { useQueryClient } from "@tanstack/react-query";

const Todo = () => {
    const queryClient = useQueryClient();
    const { editedTask } = useStore();
    const updateTask = useStore((state) => state.updateEditedTask);
    const { data, isLoading } = useQueryTasks();
    const { createTaskMutation, updateTaskMutation } = useMutateTask();
    const { logoutMutation } = useMutateAuth();
    const logout = async () => {
        await logoutMutation.mutateAsync();
        queryClient.removeQueries({ queryKey: ["tasks"] });
    };

    const submitTaskHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editedTask.id === 0) {
            createTaskMutation.mutate({ title: editedTask.title });
        } else {
            updateTaskMutation.mutate({
                id: editedTask.id,
                title: editedTask.title,
            });
        }
    };

    return (
        <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
            <div className="flex items-center">
                <ShieldCheckIcon className="h-6 w-6 text-blue-500 cursor-pointer" />
                <span className="text-blue-500 text-3xl font-extrabold">
                    Task Manager
                </span>
                <ArrowRightOnRectangleIcon
                    onClick={logout}
                    className="h-6 w-6 text-blue-500 cursor-pointer"
                />
            </div>
            <form onSubmit={submitTaskHandler}>
                <input
                    type="text"
                    className="mb-3 px-3 py-2 border border-gray-300"
                    placeholder="title ?"
                    value={editedTask.title || ""}
                    onChange={(e) =>
                        updateTask({ ...editedTask, title: e.target.value })
                    }
                />
                <button
                    className="disabled:opacity-40 mx-3 py-2 px-3 text-white bg-blue-600 rounded"
                    disabled={!editedTask.title}
                >
                    {editedTask.id === 0 ? "Create" : "Update"}
                </button>
            </form>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <ul className="my-5">
                    {data?.map((task) => <TaskItem key={task.id} id={task.id} title={task.title} />)}
                </ul>
            )}
        </div>
    );
};

export default Todo;
