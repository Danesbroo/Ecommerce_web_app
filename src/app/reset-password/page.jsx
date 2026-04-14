"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token"); // get token from URL
    const [loading, setLoading] = useState(false);

    const handleReset = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (!data.new_password || !data.confirm_password) {
            toast.error("Please fill both fields");
            return;
        }
        if (data.new_password !== data.confirm_password) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        axios
            .post(
                "http://localhost:4000/api/website/web-user/reset-password",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                if (res.data._status) {
                    toast.success(res.data._message);
                    router.push("/furniture/login-register"); // redirect to login page
                } else {
                    toast.error(res.data._message);
                }
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.message || "Something went wrong");
                setLoading(false);
            });
    };

    // if token is missing, show error
    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-xl font-bold text-red-600">
                    Invalid or missing token
                </h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Reset Password
                </h2>
                <form onSubmit={handleReset} className="space-y-4">
                    <input
                        type="password"
                        name="new_password"
                        placeholder="New Password"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#C19578] text-white py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
