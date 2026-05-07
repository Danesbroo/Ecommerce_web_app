"use client";
import { deleteCart, setQty } from "@/app/ReduxToolkit/cart";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import NoProductFound from "../NoProductFound";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItem.cartItem);
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/`
  // Total price calculation
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = 0; // placeholder, change if needed

  return (
    <>
      {/* Header */}
      <div className="mx-5 sm:mx-8 md:mx-15 lg:mx-20">
        <h1 className="text-center font-bold text-3xl mt-16">Shopping Cart</h1>
        <p className="text-center my-5">
          Home <span className="text-[#C09578]">&gt;</span>{" "}
          <span className="text-[#C09578]">Shopping Cart</span>
        </p>
        <div className="h-0.5 bg-[#EBEBEB] flex-1 my-10 hidden md:block"></div>
      </div>

      {/* Cart Table or Empty State */}
      {cartItems.length > 0 ? (
        <div className="p-6 min-h-screen mx-12 space-y-10">
          {/* Cart Table */}
          <div className="overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-200 border-b-4 border-b-[#C19578]">
                <tr>
                  <th className="p-3 font-semibold">Delete</th>
                  <th className="p-3 font-semibold">Image</th>
                  <th className="p-3 font-semibold">Product</th>
                  <th className="p-3 font-semibold">Price</th>
                  <th className="p-3 font-semibold">Quantity</th>
                  <th className="p-3 font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="p-3 text-center text-red-500 cursor-pointer border border-gray-200">
                      <span onClick={() => dispatch(deleteCart(item._id))}>
                        🗑
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200">
                      <img
                        src={baseUrl + item.image}
                        alt={item.name}
                        className="w-28 rounded"
                      />
                    </td>
                    <td className="p-3 border border-gray-200">{item.name}</td>
                    <td className="p-3 font-semibold border border-gray-200">
                      Rs. {item.price}
                    </td>
                    <td className="p-3 border border-gray-200">
                      <input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          dispatch(
                            setQty({ id: item._id, qty: Number(e.target.value) })
                          )
                        }
                        className="w-16 px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </td>
                    <td className="p-3 font-semibold border border-gray-200">
                      Rs. {item.price * item.quantity}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Coupon & Totals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Coupon */}
            <div className="rounded-lg shadow-sm">
              <div className="bg-black text-white p-3 font-bold">COUPON</div>
              <div className="p-4 space-y-3">
                <p>Enter your coupon code if you have one.</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="border px-4 py-2 flex-1 rounded"
                  />
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-[#C19578] transition-all">
                    APPLY COUPON
                  </button>
                </div>
              </div>
            </div>

            {/* Cart Totals */}
            <div className="rounded-lg shadow-sm">
              <div className="bg-black text-white p-3 font-bold">CART TOTALS</div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between border-b-2 border-b-gray-200 pb-2">
                  <span>Subtotal</span>
                  <span className="font-semibold">Rs.{totalPrice}</span>
                </div>
                <div className="flex justify-between border-b border-b-gray-200 pb-2">
                  <span>Discount (-)</span>
                  <span className="font-semibold">Rs.{discount}</span>
                </div>
                <div className="flex justify-between border-b border-b-gray-200 pb-2">
                  <span>Total</span>
                  <span className="font-bold text-lg">
                    Rs.{totalPrice - discount}
                  </span>
                </div>
                <div className="flex justify-end">
                  <Link href="/checkout">
                    <button className="bg-black text-white px-6 py-2 rounded hover:bg-[#C19578] transition-all mt-4">
                      PROCEED TO CHECKOUT
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoProductFound />
      )}
    </>
  );
}

