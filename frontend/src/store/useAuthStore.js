import { create } from "zustand";

import { axiosInstance } from "../lib/axios.js";

import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({

    authUser: null,

    isSigningUp: false,

    isLoggingIn: false,

    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {

        try {

            const res = await axiosInstance.get("/auth/check");

            set({ authUser: res.data });

        }

        catch (error) {

            console.log("Error In checkAuth:", error.message);

            set({ authUser: null });

        }

        finally {

            set({ isCheckingAuth: false });

        }

    },

    signup: async (data) => {

        set({ isSigningUp: true });

        try {

            const res = await axiosInstance.post("/auth/signup", data);

            set({ authUser: res.data });

            toast.success("Account Created Successfully");

        }

        catch (error) {

            toast.error(error.response.data.message, { id: "signup-invalid-error" });

        }

        finally {

            set({ isSigningUp: false });

        }

    },

    login: async (data) => {

        set({ isLoggingIn: true });

        try {

            const res = await axiosInstance.post("/auth/login", data);

            set({ authUser: res.data });

            toast.success("Logged In Successfully");

        }

        catch (error) {

            toast.error(error.response.data.message, { id: "login-invalid-error" });

        }

        finally {

            set({ isLoggingIn: false });

        }

    },

    logout: async () => {

        try {

            await axiosInstance.post("/auth/logout");

            set({ authUser: null });

            toast.success("Logged Out Successfully");

        }

        catch (error) {

            toast.error(error.response.data.message, { id: "logout-invalid-error" });

        }

    },

    updateProfile: async (data) => {

        set({ isUpdatingProfile: true });

        try {

            const res = await axiosInstance.put("/auth/update-profile", data);

            set({ authUser: res.data });

            toast.success("Profile Updated Successfully");

        } 
        
        catch (error) {

            console.log("Error In updateProfile:", error);

            toast.error(error.response.data.message);

        } 
        
        finally {

            set({ isUpdatingProfile: false });

        }

    },

}));