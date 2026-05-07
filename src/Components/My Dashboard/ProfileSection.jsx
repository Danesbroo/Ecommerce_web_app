import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function ProfileSection({ userProfile }) {
  const router = useRouter()
  const userToken = useSelector((state) => state.login.token);

  const [formData, setFormData] = useState({
    fname: userProfile?.fname || "",
    lname: userProfile?.lname || "",
    email: userProfile?.email || "",
    mobile_number: userProfile?.mobile_number || "",
    address: userProfile?.address || "",
    gender: userProfile?.gender || ""
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/website/web-user/update-profile`,
      formData,
      {
        headers: { Authorization: `Bearer ${userToken}` }
      }
    )
    .then((res) => {
      if (res.data._status) {
        toast.success("Profile updated successfully!");
        router.push("/");
      } else {
        toast.error(res.data._message);
      }
    })
    .catch(() => toast.error("Something went wrong while updating profile"));
  };

  return (
    <div className="basis-[100%] lg:basis-[73%] sm:mx-10 md:mx-5 lg:mx-5 mb-3">
      <h2 className="mb-4 font-bold text-xl">My Profile</h2>
      <form className="border border-gray-100 p-3 rounded-xl" onSubmit={handleSubmit}>
        
        {/* Gender */}
        <div className="my-3 flex gap-3">
          <label>
            <input

              type="radio"
              name="gender"
              value="Mr."
              checked={formData.gender === "Mr."}
              onChange={handleChange}
              className='me-1'
            />
            Mr.
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Mrs."
              checked={formData.gender === "Mrs."}
              onChange={handleChange}
              className='me-1'
            />
            Mrs.
          </label>
        </div>

        {/* Full name */}
        <div className="my-3">
          <p>Name<sup>*</sup></p>
          <input
            type="text"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full h-10 mb-2 ps-2"
          />
          <input
            type="text"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full h-10 ps-2"
          />
        </div>

        {/* Email (readonly) */}
        <div className="my-3">
          <p>Email<sup>*</sup></p>
          <input
            type="text"
            value={formData.email}
            readOnly
            className="w-full h-10 ps-2"
          />
        </div>

        {/* Mobile */}
        <div className="my-3">
          <p>Mobile Number<sup>*</sup></p>
          <input
            type="text"
            name="mobile_number"
            value={formData.mobile_number}
            onChange={handleChange}
            className="w-full h-10 ps-2"
          />
        </div>

        {/* Address */}
        <div className="my-3">
          <p>Address<sup>*</sup></p>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full h-10 ps-2"
          />
        </div>

        {/* Submit */}
        <div className="my-5 flex flex-row-reverse">
          <button
            type="submit"
            className="px-4 py-2 bg-[#C19578] text-white rounded-2xl hover:bg-amber-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
