'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import OrderSection from "./OrderSection";
import Address from "./Address";
import ChangePassword from "./ChangePassword";
import ProfileSection from "./ProfileSection";
import { Logout } from "@/app/ReduxToolkit/loginSlice";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [userProfile, setUserProfile] = useState({});  // FIX: object, not string
  
    const userToken = useSelector((state) => state.login.token);
    
  
    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/website/web-user/view-profile`, {}, {
            headers: {
              'Authorization': `Bearer ${userToken}`
            }
          })
        .then((result) => {
          if (result.data._status == true) {
            setUserProfile(result.data._data);
          } else {
            toast.error(result.data._message);
          }
        })
        .catch(() => {
          toast.error('Something went wrong !');
        });
    }, [userToken]);
  
    const router = useRouter();
    const dispatch = useDispatch();

    // here we use components as a object;
    const components = {
      dashboard: (
        <div>
          <h3 className="font-bold text-xl my-2">My Dashboard</h3>
          <p>Welcome to your dashboard! Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
        </div>
      ),
      orders: <OrderSection />,
      addresses: <Address/>,
      profile: <ProfileSection userProfile={userProfile} />,   // FIX: pass prop here
      password: <ChangePassword />,
    };
  
    const buttons = [
      { label: "My Dashboard", key: "dashboard" },
      { label: "Orders", key: "orders" },
      { label: "Addresses", key: "addresses" },
      { label: "My Profile", key: "profile" },
      { label: "Change Password", key: "password" },
      {
        label: "Logout", key: "logout",
        action: () => {
          dispatch(Logout());
          router.push("/");
        },
      },
    ];
  
    return (
      <div className="mx-5 my-3 sm:mx-8 md:mx-15 lg:mx-20">
        <div className="text-center font-bold text-3xl mt-10 mb-2">My Dashboard</div>
        <p className="text-center mb-5">
          Home <span className="text-[#C09578]">&gt;</span>{" "}
          <span className="text-[#C09578]">My Dashboard</span>
        </p>
        <div className="h-0.5 bg-[#EBEBEB] flex-1 hidden lg:block my-6"></div>
  
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          {/* Left Sidebar */}
          <div className="basis-full md:basis-[38%] lg:basis-[25%] sm:mx-10 md:mx-2 lg:mx-5 flex flex-col gap-2">
            {buttons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => {
                  if (btn.action) {
                    btn.action();
                  } else {
                    setActiveTab(btn.key);
                  }
                }}
                className={`text-white rounded w-full ps-2 font-bold py-3 transition-colors ${
                  activeTab === btn.key ? "bg-[#C19578]" : "bg-black hover:bg-[#C19578]"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
  
          {/* Right Section */}
          <div className="md:basis-[100%] lg:basis-[73%] bg-white mx-6 px-2 pb-4 rounded shadow">
            {components[activeTab]}
          </div>
        </div>
      </div>
    );
  }
  