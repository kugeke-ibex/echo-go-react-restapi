import axios, { AxiosResponse } from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Task } from "../types";
import useStore from "../store";
import { useError } from "./useError";

export const useMutateTask = () => {
    const queryClient = useQueryClient();
    const { switchErrorHandling } = useError();
    const resetEditedTask = useStore((state) => state.resetEditedTask);

    const createTaskMutation = useMutation<
        AxiosResponse<Task>,
        Error,
        Omit<Task, "id" | "created_at" | "updated_at">
    >({
        mutationFn: (task: Omit<Task, "id" | "created_at" | "updated_at">) =>
            axios.post<Task>(`${process.env.REACT_APP_API_URL}/tasks`, task),
        onSuccess: (res: AxiosResponse<Task>) => {
            const previousTodos = queryClient.getQueryData<Task[]>(["tasks"]);
            if (previousTodos) {
                queryClient.setQueryData(
                    ["tasks"],
                    [...previousTodos, res.data]
                );
            }
            resetEditedTask();
        },
        onError: (err: any) => {
            if (err.response.data.message) {
                switchErrorHandling(err.response.data.message);
            } else {
                switchErrorHandling(err.message.data);
            }
        },
    });

    const updateTaskMutation = useMutation<
        AxiosResponse<Task>,
        Error,
        Omit<Task, "created_at" | "updated_at">
    >({
        mutationFn: (task: Omit<Task, "created_at" | "updated_at">) =>
            axios.put<Task>(
                `${process.env.REACT_APP_API_URL}/tasks/${task.id}`,
                { title: task.title }
            ),
        onSuccess: (res: AxiosResponse<Task>) => {
            const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
            if (previousTasks) {
                queryClient.setQueryData<Task[]>(
                    ["tasks"],
                    previousTasks.map((task) => (task.id === res.data.id ? res.data : task))
                );
            }
            resetEditedTask();
        },
        onError: (err: any) => {
            if (err.response.data.message) {
                switchErrorHandling(err.response.data.message);
            } else {
                switchErrorHandling(err.message.data);
            }
        },
    });

    const deleteTaskMutation = useMutation<
        AxiosResponse<Task>,
        Error,
        { id: number }
    >({
        mutationFn: ({ id }) => axios.delete<Task>(`${process.env.REACT_APP_API_URL}/tasks/${id}`),
        onSuccess: (_, variables) => {
            const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);
            if (previousTasks) {
                queryClient.setQueryData<Task[]>(
                    ["tasks"],
                    previousTasks.filter((task) => task.id !== variables.id)
                );
            }
            resetEditedTask();
        },
        onError: (err: any) => {
            if (err.response.data.message) {
                switchErrorHandling(err.response.data.message);
            } else {
                switchErrorHandling(err.message.data);
            }
        },
    });

    return {
        createTaskMutation,
        updateTaskMutation,
        deleteTaskMutation,
    };
};
