import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useStore from "../store";
import { Credential } from "../types";
import { useError } from "./useError";

export const useMutateAuth = () => {
    const navigate = useNavigate();
    const resetEditedTask = useStore((state) => state.resetEditedTask);
    const { switchErrorHandling } = useError();

    const loginMutation = useMutation<AxiosResponse<any>, Error, Credential>({

        mutationFn: async (user: Credential) =>
            await axios.post(`${process.env.REACT_APP_API_URL}/login`, user),
        onSuccess: () => {
            console.log(process.env.REACT_APP_API_URL)
            navigate("/todo");
        },
        onError: (err: any) => {
            console.log(process.env.REACT_APP_API_URL)
            if (err.response.data.message) {
                switchErrorHandling(err.response.data.message);
            } else {
                switchErrorHandling(err.response);
            }
        },
    });

    const registerMutation = useMutation<AxiosResponse<any>, Error, Credential>({
        mutationFn: async (user: Credential) =>
            await axios.post(
                `${process.env.REACT_APP_API_URL}/signup`,
                user
            ),
        onError: (err: any) => {
            if (err.response.data.message) {
                switchErrorHandling(err.response.data.message);
            } else {
                switchErrorHandling(err.response);
            }
        },
    });

    const logoutMutation = useMutation<AxiosResponse<any>, Error, void>({
        mutationFn: async () =>
            await axios.post(`${process.env.REACT_APP_API_URL}/logout`),
        onSuccess: () => {
            resetEditedTask();
            navigate("/");
        },
        onError: (err: any) => {
            if (err.response.data.message) {
                switchErrorHandling(err.response.data.message);
            } else {
                switchErrorHandling(err.response);
            }
        },
    });
    return { loginMutation, registerMutation, logoutMutation };
};
