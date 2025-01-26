"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthStore } from "@/providers/auth-store-provider";

export default function SignInUpForm() {
    const [authType, setAuthType] = useState<"signin" | "signup">("signin");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { user, isAuthenticated, setUser } = useAuthStore((state) => state);

    console.log("\n\n\n\n\n", user, "\n\n\n")
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (authType === "signup" && password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const response = await fetch("/api/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, authType }),
        });
        const data = await response.json();
        if (response.ok) {
            setUser({
                id: data.user._id,
                email: data.user.email,
                username: data.user.username,
                image: data.user.image,
            });

            toast.success(`Successfully ${authType === "signin" ? "signed in" : "signed up"}`);
        } else {
            toast.error(`Failed to ${authType === "signin" ? "sign in" : "sign up"}`);
        }
    };

    const toggleAuthType = () => {
        setAuthType((prevAuthType) => (prevAuthType === "signin" ? "signup" : "signin"));
    };

    return (
        <div className="w-full p-3 md:p-6 flex justify-center items-center ">
            <form className="w-full md:w-2/3 gap-3 glassmorphism p-10 rounded-xl flex flex-col justify-center items-center border border-slate-200" onSubmit={handleSubmit}>
                <div className="w-full flex flex-col justify-center items-center gap-1">
                    <label className="hidden">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="inputs w-full md:w-2/3"
                        placeholder="email"
                    />
                </div>

                <div className="w-full flex flex-col items-center gap-1">
                    <label className="hidden">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="inputs w-full md:w-2/3"
                        placeholder="password"
                    />
                </div>
                {authType === "signup" && (
                    <div className="w-full flex flex-col items-center gap-1">
                        <label className="hidden">Confirm Password:</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="inputs w-full md:w-2/3"
                            placeholder="confirm password"
                        />
                    </div>
                )}
                <button 
                    type="submit"
                    className="outline_btn mt-10"
                >
                    {authType === "signin" ? "Sign In" : "Sign Up"}
                </button>

                <button 
                    type="button"
                    onClick={toggleAuthType}
                    className="light_btn mt-2"
                >
                    {authType === "signin" ? "Switch to Sign Up" : "Switch to Sign In"}
                </button>
            </form>
        </div>
    );
}
