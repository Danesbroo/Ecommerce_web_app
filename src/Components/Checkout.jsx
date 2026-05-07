"use client"

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CardElement, useStripe, useElements, Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import { toast } from "react-toastify"
import { clearCart } from "@/app/ReduxToolkit/cart"

const stripePromise = loadStripe("pk_test_51T6q3wFlkt4uDkVvqkUHmwOOv6UN9d1e0hdXAW2mgWAJlOAcnBtfSwxZX9wo8YXd9ooCOcW14QCua04nLJsqJdfC00DT8hXZu7")

function CheckoutForm() {

    const stripe = useStripe()
    const elements = useElements()
    const userToken = useSelector((state) => state.login.token)
    const cartItems = useSelector((state) => state.cartItem.cartItem)
    const [paymentSuccess, setPaymentSuccess] = useState(false) // ✅ New state
    const dispatch = useDispatch()
    const [otherShipping, setOtherShipping] = useState(false)
    const [loading, setLoading] = useState(false);

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )
    const discount = 0
    const finalTotal = totalPrice - discount

    const OtherShipping = () => setOtherShipping(!otherShipping)

    // PLACE ORDER
    // const placeOrder = async (e) => {
    //     e.preventDefault()
    //     const formData = {
    //         name: e.target.name.value,
    //         total_amount: totalPrice,
    //         email: e.target.email.value,
    //         mobile_number: e.target.mobile_number.value,
    //         billing_address: e.target.billing_address.value,
    //         state: e.target.billing_state.value,
    //         city: e.target.city.value,
    //         country: e.target.country.value,
    //     };

    //     try {
    //         const result = await axios.post(
    //             "http://localhost:4000/api/website/orders/order-placed",
    //             {
    //                 net_amount: finalTotal,
    //                 productInfo: cartItems.map(item => ({
    //                     product_id: item._id,
    //                     name: item.name,
    //                     price: item.price,
    //                     quantity: item.quantity,
    //                     image: item.image
    //                 })),
    //                 ...formData
    //             },
    //             { headers: { Authorization: `Bearer ${userToken}` } }
    //         )

    //         if (result.data._status) {
    //             const clientSecret = result.data._orderInfo.client_secret
    //             await handlePayment(clientSecret)

    //         } else {
    //             toast.error("Order failed")
    //         }
    //     } catch (error) {
    //         toast.error("Server error")
    //     }
    // }

    const placeOrder = async (e) => {
        e.preventDefault();

        setLoading(true); // ✅ start loading

        const formData = {
            name: e.target.name.value,
            total_amount: totalPrice,
            email: e.target.email.value,
            mobile_number: e.target.mobile_number.value,
            billing_address: e.target.billing_address.value,
            state: e.target.billing_state.value,
            city: e.target.city.value,
            country: e.target.country.value,
        };

        try {
            const result = await axios.post( `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products`,
                {
                    net_amount: finalTotal,
                    productInfo: cartItems.map(item => ({
                        product_id: item._id,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity,
                        image: item.image
                    })),
                    ...formData
                },
                { headers: { Authorization: `Bearer ${userToken}` } }
            );

            if (result.data._status) {
                const clientSecret = result.data._orderInfo.client_secret;
                await handlePayment(clientSecret);
            } else {
                toast.error("Order failed");
            }

        } catch (error) {
            toast.error("Server error");
        } finally {
            setLoading(false); // stop loading (IMPORTANT)
        }
    };

    // HANDLE PAYMENT
    const handlePayment = async (clientSecret) => {
        if (!stripe || !elements) {
            toast.error("Stripe not loaded")
            return
        }

        const cardElement = elements.getElement(CardElement)
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: { name: "Customer" }
            }
        })

        if (result.error) {
            toast.error(result.error.message)
        } else if (result.paymentIntent.status === "succeeded") {
            toast.success("Payment Successful 🎉")

            dispatch(clearCart()) // ✅ clear cart after successful payment

            setPaymentSuccess(true) // ✅ show success section
        }
    }

    // ✅ Conditional rendering: show either checkout form or success section
    if (paymentSuccess) {
        return (
            <div className='text-center py-20'>
                <h1 className='text-3xl font-bold mb-4'>Payment Successful 🎉</h1>
                <p className='text-lg'>Your order has been placed successfully.</p>
            </div>
        )
    }
    return (
        <>
            <form onSubmit={placeOrder} className='px-10 py-10'>
                <div className='text-center font-bold text-3xl'>CheckOut</div>
                <p className='text-center my-5 text-[#212121]'>Home <span className='text-[#C09578]'>&gt;</span><span className='text-[#cba68d]'> Check Out</span></p>
                <div className='h-0.5 bg-[#EBEBEB] flex-1 my-10 hidden sm:hidden md:hidden lg:block'></div>

                {/* billing address */}
                <div className='sm:w-[100%] md:w-[75%] lg:w-[50%]'>
                    <div className='w-full ps-3 font-bold py-2 rounded bg-black text-white text-xl '>BILLING DETAILS</div>

                    <div className="flex flex-col md:flex-row w-full justify-between gap-3 my-3">
                        <div className='basis-[48%]'>
                            <p>Name<sup>*</sup></p>
                            <div>
                                <input type="text" name='name' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                        <div className='basis-[48%]'>
                            <p>Mobile Number<sup>*</sup></p>
                            <div>
                                <input type="text" name='mobile_number' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3 my-3">
                        <div className='basis-[48%]'>
                            <p>Billing Name<sup>*</sup></p>
                            <div>
                                <input type="text" name='billing_name' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                        <div className='basis-[48%]'>
                            <p>Billing Email<sup>*</sup></p>
                            <div>
                                <input type="email" name='email' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3 my-3">

                        <div className='basis-[100%]'>
                            <p>Billing Mobile Number<sup>*</sup></p>
                            <div>
                                <input type="text" name='billing_mobile_number' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3 my-3">
                        <div className='basis-[100%]'>
                            <p>Billing Address<sup>*</sup></p>
                            <div>
                                <input type="text" name='billing_address' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3 my-3">
                        <div className='basis-[100%]'>
                            <p>Country<sup>*</sup></p>
                            <div>
                                <select
                                    name="country"
                                    id=""
                                    className="w-full h-[35px] ps-2 border border-gray-300 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-purple-200">
                                    <option value="">-- Select Country --</option>
                                    <option value="nepal">Nepal</option>
                                    <option value="india">India</option>
                                    <option value="japan">Japan</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3 my-3">
                        <div className='basis-[48%]'>
                            <p>State<sup>*</sup></p>
                            <div>
                                <input type="text" name='billing_state' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                        <div className='basis-[48%]'>
                            <p>City<sup>*</sup></p>
                            <div>
                                <input type="text" name='city' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* button section  */}
                <div className='flex items-center gap-5 my-7'>
                    <div>
                        <input
                            type="checkbox" checked={otherShipping} onChange={(e) => setOtherShipping(e.target.checked)}
                            className="w-[15px] h-[15px] ps-2" />

                    </div>
                    <div>
                        <span onClick={OtherShipping} className=' cursor-pointer bg-black font-bold rounded px-4 py-2 text-white'>Ship To A Different Address</span>
                    </div>
                </div>

                {/* shipping section  */}
                {otherShipping && (<div className='sm:w-[100%] md:w-[75%] lg:w-[50%] my-4'>

                    <div className="flex flex-col md:flex-row w-full justify-between gap-3 my-3">
                        <div className='basis-[48%]'>
                            <p>Shipping Name<sup>*</sup></p>
                            <div>
                                <input type="text" name='shipping_name' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                        <div className='basis-[48%]'>
                            <p>Shipping Email<sup>*</sup></p>
                            <div>
                                <input type="email" name='shipping_email' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3 my-3">

                        <div className='basis-[100%]'>
                            <p>Shipping Mobile Number<sup>*</sup></p>
                            <div>
                                <input type="text" name='shipping_mobile_number' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3 my-3">
                        <div className='basis-[100%]'>
                            <p>Shipping Address<sup>*</sup></p>
                            <div>
                                <input type="text" className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3 my-3">
                        <div className='basis-[100%]'>
                            <p>Country<sup>*</sup></p>
                            <div>
                                <select
                                    name="shipping_country"
                                    id=""
                                    className="w-full h-[35px] ps-2 border border-gray-300 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-purple-200">
                                    <option value="">-- Select Country --</option>
                                    <option value="nepal">Nepal</option>
                                    <option value="india">India</option>
                                    <option value="japan">Japan</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3 my-3">
                        <div className='basis-[48%]'>
                            <p>State<sup>*</sup></p>
                            <div>
                                <input type="text" name='billing_name' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                        <div className='basis-[48%]'>
                            <p>City<sup>*</sup></p>
                            <div>
                                <input type="email" name='email' className='w-full h-[35px] ps-2' />
                            </div>
                        </div>
                    </div>
                </div>)}

                {/* billing calculation section  */}
                <div className='sm:w-[100%] md:w-[75%] lg:w-[50%] my-4'>
                    <div className="flex flex-col md:flex-row w-full justify-between gap-3 my-3">
                        <div className='basis-[100%]'>
                            <p>Order Notes<sup>*</sup></p>
                            <textarea className='w-full h-[80px] border border-gray-300 rounded px-2' placeholder='Note about your Order'>
                            </textarea>
                        </div>
                    </div>

                    {/* 🔹 YOUR FULL BILLING + SHIPPING CODE SAME AS BEFORE 🔹 */}

                    {/* billing calculation section  */}
                    <div className='w-full my-4'>

                        <div className='w-full ps-3 font-bold py-2 rounded bg-black text-white '>YOUR ORDER</div>

                        <div className='flex justify-between bg-gray-200 my-1'>
                            <div className='basis-[65%] text-center py-4'>Product</div>
                            <div className='basis-[35%] text-center py-4'>Order</div>
                        </div>

                        {/* Cart Subtotal */}
                        <div className="flex justify-between border-b border-b-gray-300 my-1">
                            <div className='basis-[65%] text-center py-4'>Cart Subtotal</div>
                            <div className='basis-[35%] text-center py-4'>Rs. {totalPrice}</div>
                        </div>

                        {/* Discount */}
                        <div className='flex justify-between border-b border-b-gray-300 my-1'>
                            <div className='basis-[65%] text-center py-4'>Discount(-)</div>
                            <div className='basis-[35%] text-center py-4'>Rs. {discount}</div>
                        </div>

                        {/* Final Total */}
                        <div className='flex justify-between border-b border-b-gray-300 my-1'>
                            <div className='basis-[65%] text-center py-4'>Order Total</div>
                            <div className='basis-[35%] text-center py-4'>Rs. {finalTotal}</div>
                        </div>
                    </div>
                    {/* 🔹 STRIPE CARD ELEMENT 🔹 */}
                    <div className="my-4 p-3 border border-gray-300 rounded">
                        <p className="mb-2 font-bold">Card Details</p>
                        <CardElement />
                    </div>
                    <button
                        type='submit'
                        disabled={loading} // ✅ disable when loading
                        className={`w-full my-4 py-2 rounded text-white 
    ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </button>
                </div>
            </form>
        </>
    )
}
// Wrap Checkout with Elements
export default function Checkout() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}

