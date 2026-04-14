import React from 'react'

export default function Address() {
    return (
        <>
            {/* Address section  */}
            <div className='md:basis-[70%], lg:basis-[73%] sm:mx-10 dm:mx-5'>
                <h3 className="font-bold text-xl my-4">Address</h3>
                <p>The following addresses will be used on the checkout page by default</p>
                <div className='flex flex-col justify-between gap-2 lg:flex-row'>
                    <div className='basis-[100%] lg:basis-[48%]'>
                        <h4 className='my-4 font-bold'>Billing Address</h4>
                        <form className=' border border-gray-100 p-3 rounded-xl'>
                            <div className='my-3'>
                                <p>Billing Name<sup>*</sup></p>
                                <input type="text" name='billing_name' className='w-full h-10' />
                            </div>
                            <div className='my-3'>
                                <p>Billing Email<sup>*</sup></p>
                                <input type="text" name='billing_email' className='w-full h-10' />
                            </div>
                            <div className='my-3'>
                                <p>Billing Mobile Number<sup>*</sup></p>
                                <input type="text" name='billing_mobile_number' className='w-full h-10' />
                            </div>
                            <div className='my-3'>
                                <p>Billing Address<sup>*</sup></p>
                                <input type="text" name='billing address' className='w-full h-10' />
                            </div>
                            <div className='my-3'>
                                <p htmlFor="">Country<sup>*</sup></p>
                                <select name="country" id="" className='border border-gray-200 rounded w-full h-10 ps-3'>
                                    <option value="">Select Country</option>
                                    <option value="">Nepal</option>
                                    <option value="">India</option>
                                    <option value="">China</option>
                                    <option value="">Bhutan</option>
                                </select>
                            </div>
                            <div className='my-3'>
                                <p>State<sup>*</sup></p>
                                <input type="text" name='state' className='w-full h-10' />
                            </div>
                            <div className='my-3'>
                                <p>City<sup>*</sup></p>
                                <input type="text" name='city' className='w-full h-10' />
                            </div>
                            <div className='my-5 flex flex-row-reverse'><button type='submit' className='px-4 py-2 bg-[#C19578] text-white rounded-2xl hover:bg-amber-600'>Update</button></div>
                        </form>
                    </div>
                    <div className='basis-[100%] lg:basis-[48%]'>
                        <h4 className='my-4 font-bold'>Shipping Address</h4>
                        <form className=' border border-gray-100 p-3 rounded-xl'>
                            <div className='my-3'>
                                <p>Shipping Name<sup>*</sup></p>
                                <input type="text" name='shipping_name' className='w-full h-10' />
                            </div>
                            <div className='my-3'>
                                <p>Shipping Email<sup>*</sup></p>
                                <input type="text" name='shipping_email' className='w-full h-10' />
                            </div>
                            <div className='my-3'>
                                <p>Shipping Mobile Number<sup>*</sup></p>
                                <input type="text" name='shipping_mobile_number' className='w-full h-10' />
                            </div>
                            <div className='my-3'>
                                <p>Shipping Address<sup>*</sup></p>
                                <input type="text" name='shipping address' className='w-full h-10' />
                            </div>
                            <div className='my-3'>
                                <p htmlFor="">Country<sup>*</sup></p>
                                <select name="country" id="" className='border border-gray-200 rounded w-full h-10 ps-3'>
                                    <option value="">Select Country</option>
                                    <option value="">Nepal</option>
                                    <option value="">India</option>
                                    <option value="">China</option>
                                    <option value="">Bhutan</option>
                                </select>
                            </div>
                            <div className='my-3'>
                                <p>State<sup>*</sup></p>
                                <input type="text" name='state' className='w-full h-10' />
                            </div>
                            <div className='my-3'>
                                <p>City<sup>*</sup></p>
                                <input type="text" name='city' className='w-full h-10' />
                            </div>
                            <div className='my-5 flex flex-row-reverse'><button type='submit' className='px-4 py-2 bg-[#C19578] text-white rounded-2xl hover:bg-amber-600'>Update</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
