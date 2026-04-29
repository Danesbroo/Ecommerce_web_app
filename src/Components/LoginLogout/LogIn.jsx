"use client";

import { userDetails } from "@/app/ReduxToolkit/loginSlice";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function Auth() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // For reset-password page

  const [mode, setMode] = useState(token ? "reset" : "login"); // login | register | forget | reset
  const [loading, setLoading] = useState(false);

  // ----- LOGIN -----
  const loginUser = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.target).entries());

    axios.post(process.env.WEBUSER_LOGIN_URL, data)
      .then((res) => {
        if (res.data._status) {
          toast.success(res.data._message);
          dispatch(userDetails({ user: res.data._data, token: res.data._token }));
          router.push("/my-dashboard");
        } else toast.error(res.data._message);
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  };

  // ----- REGISTER -----
  const registerUser = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.target).entries());

    axios.post(process.env.WEBUSER_REGISTER_URL, data)
      .then((res) => {
        if (res.data._status) {
          toast.success(res.data._message);
          dispatch(userDetails({ user: res.data._data, token: res.data._token }));
          router.push("/my-dashboard");
        } else toast.error(res.data._message);
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  };

  // ----- FORGOT PASSWORD -----
  const forgotPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.target).entries());

    axios.post(process.env.WEBUSER_FORGET_PASSWORD_URL, data)
      .then((res) => {
        toast[res.data._status ? "success" : "error"](res.data._message);
        if (res.data._status) setMode("login");
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  };

  // ----- RESET PASSWORD -----
  const resetPassword = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = Object.fromEntries(new FormData(e.target).entries());

    axios.post(process.env.RESET_PASSWORD_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        toast[res.data._status ? "success" : "error"](res.data._message);
        if (res.data._status) setMode("login");
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* LOGIN */}
        {mode === "login" && !token && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={loginUser} className="space-y-4">
              <input type="email" name="email" placeholder="Email" required className="w-full px-4 py-2 border rounded-lg" />
              <input type="password" name="password" placeholder="Password" required className="w-full px-4 py-2 border rounded-lg" />
              <button type="submit" className="w-full bg-[#C19578] text-white py-2 rounded-lg" disabled={loading}>
                {loading ? "Loading..." : "Login"}
              </button>
            </form>
            <p className="text-center mt-4 text-sm">
              Don’t have an account? <button onClick={() => setMode("register")} className="text-blue-600">Register</button>
              <br/>
              <button onClick={() => setMode("forget")} className="text-purple-600 text-sm mt-2">Forgot Password?</button>
            </p>
          </>
        )}

        {/* REGISTER */}
        {mode === "register" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={registerUser} className="space-y-4" autoComplete="off">
              <input name="fname" type="text" placeholder="First Name" required className="w-full px-4 py-2 border rounded-lg" />
              <input name="lname" type="text" placeholder="Last Name" required className="w-full px-4 py-2 border rounded-lg" />
              <input name="mobile_number" type="text" placeholder="Mobile Number" required className="w-full px-4 py-2 border rounded-lg" />
              <input type="email" name="email" placeholder="Email" required className="w-full px-4 py-2 border rounded-lg" />
              <input type="password" name="password" placeholder="Password" required className="w-full px-4 py-2 border rounded-lg" />
              <button type="submit" className="w-full bg-[#C19578] text-white py-2 rounded-lg" disabled={loading}>
                {loading ? "Loading..." : "Register"}
              </button>
            </form>
            <p className="text-center mt-4 text-sm">
              Already have an account? <button onClick={() => setMode("login")} className="text-purple-600">Login</button>
            </p>
          </>
        )}

        {/* FORGOT PASSWORD */}
        {mode === "forget" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
            <form onSubmit={forgotPassword} className="space-y-4">
              <input type="email" name="email" placeholder="Your email" required className="w-full px-4 py-2 border rounded-lg" />
              <button type="submit" className="w-full bg-[#C19578] text-white py-2 rounded-lg" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <p className="text-center mt-4 text-sm">
              Remembered? <button onClick={() => setMode("login")} className="text-purple-600">Login</button>
            </p>
          </>
        )}

        {/* RESET PASSWORD */}
        {mode === "reset" && token && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
            <form onSubmit={resetPassword} className="space-y-4">
              <input type="password" name="new_password" placeholder="New Password" required className="w-full px-4 py-2 border rounded-lg" />
              <input type="password" name="confirm_password" placeholder="Confirm Password" required className="w-full px-4 py-2 border rounded-lg" />
              <button type="submit" className="w-full bg-[#C19578] text-white py-2 rounded-lg" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  );
}


