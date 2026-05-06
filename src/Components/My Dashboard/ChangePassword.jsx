"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'


export default function ChangePassword() {
    const router = useRouter()
    const userToken = useSelector((state) => state.login.token);

    const passwordHandle = (e) => {
        e.preventDefault();

        // Get form values as object
        const data = Object.fromEntries(new FormData(e.target).entries());

        axios
            .post(
                process.env.NEXT_PUBLIC_WEBUSER_CHANGE_PASSWORD_URL,
                data,
                { headers: { Authorization: `Bearer ${userToken}` } }
            )
            .then((res) => {
                if (res.data._status) {
                    toast.success(res.data._message);
                    router.push("/")
                } else {
                    toast.error(res.data._message);
                }
            })
            .catch(() => {
                toast.error("Something went wrong!");
            });
    };

    return (
        <>
            {/* change password section  */}
            <div className='basis-[100%] lg:basis-[73%] sm:mx-10 md:mx-5 lg:mx-5 mb-3'>
                <h2 className='mb-4 font-bold text-2xl'>Change Password</h2>
                <form className=' border border-gray-100 p-3 rounded-xl' onSubmit={passwordHandle}>

                    <div className='my-3'>
                        <p> Current Password<sup>*</sup></p>
                        <input type="password" name='current_password' className='w-full h-10 ps-2' required />
                    </div>
                    <div className='my-3'>
                        <p>New Password<sup>*</sup></p>
                        <input type="password" name='new_password' className='w-full h-10 ps-2' required />
                    </div>
                    <div className='my-3'>
                        <p>Conform Password<sup>*</sup></p>
                        <input type="Password" name='confirm_password' className='w-full h-10 ps-2' required />
                    </div>
                    <div className='my-5 flex flex-row-reverse'><button type='submit' className='px-4 py-2 bg-[#C19578] text-white rounded-2xl hover:bg-amber-600'>Change Password</button></div>
                </form>
            </div>
        </>
    )
}
