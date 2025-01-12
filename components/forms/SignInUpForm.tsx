    "use client";

    import { useState } from "react";

    export default function SignInUpForm() {
        const [authType, setAuthType] = useState<"signin" | "signup">("signin");

        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            if (authType === "signup" && password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, authType }),
            });
            if (response.ok) {
                // Handle success
            } else {
                // Handle error
            }
        };

        const toggleAuthType = () => {
            setAuthType((prevAuthType) => (prevAuthType === "signin" ? "signup" : "signin"));
        };

        return (
            <div className="w-full p-3 md:p-6 flex justify-center items-center ">
                <form className="w-full md:w-2/3 gap-3 glassmorphism p-10 rounded-xl flex flex-col justify-center items-center border border-orange-900" onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center items-start gap-1">
                        <label className="hidden">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="inputs"
                            placeholder="email"
                        />
                    </div>

                    <div className="flex flex-col items-start gap-1">
                        <label className="hidden">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="inputs"
                            placeholder="password"
                        />
                    </div>
                    {authType === "signup" && (
                        <div className="flex flex-col items-start gap-1">
                            <label className="hidden">Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="inputs"
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
                        className="outline_btn mt-2"
                    >
                        {authType === "signin" ? "Switch to Sign Up" : "Switch to Sign In"}
                    </button>
                </form>
            </div>
        );
    }