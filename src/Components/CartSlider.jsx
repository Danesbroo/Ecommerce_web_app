'use client';
import { deleteCart } from '@/app/ReduxToolkit/cart';
import Link from 'next/link';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CartSidebar({ isOpen, onClose }) {

  const dispatch = useDispatch();
  const cartValue = useSelector((value) => {
    return (value.cartItem.cartItem)
  })
  // Dummy cart state — replace this with your real cart later
  const [cartItems, setCartItems] = useState([

    // we can use array of cart item which is given format
    // {
    //   id: 1,
    //   name: 'Evan Coffee Table',
    //   price: 4600,
    //   quantity: 2,
    //   image: 'https://i.imgur.com/qnQW9oF.jpeg',
    // },

  ]);
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/`

  // Delete item from cart
  const handleDelete = (id) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
  };

  const subtotal = cartValue.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 w-[360px] h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full' // close and open functionality
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-semibold">Cart</h2>
          <button
            onClick={onClose}
            className="text-3xl leading-none font-light text-gray-600 hover:text-black"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col justify-between h-[calc(100%-64px)]">
          {cartValue && cartValue.length > 0 ? (
            <>
              {/* Cart Items */}
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[50vh]">
                {cartValue.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 relative group">
                    <img
                      src={baseUrl+item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />

                    <div className="flex flex-col text-sm">
                      <span className="font-medium text-gray-800">{item.name}</span>
                      <span className="text-gray-600 mt-1">Qty: {item.quantity}</span>
                      <span className="font-semibold text-orange-600 mt-1">
                        Rs. {item.price * item.quantity}
                      </span>
                    </div>

                    <button
                      onClick={() => dispatch(deleteCart(item._id))}
                      className="absolute top-0 right-0 text-lg text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                    >
                      ×

                    </button>
                  </div>
                ))}
              </div>

              {/* Subtotal */}
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-sm font-semibold text-gray-700">
                  <span>Subtotal:</span>
                  <span>Rs. {subtotal}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-6 space-y-3">
                <Link href="/cart">
                  <button onClick={onClose} className="w-full bg-black text-white py-3 text-sm font-semibold rounded-t-sm hover:opacity-90 transition">
                    VIEW CART
                  </button>
                </Link>
                <Link href={"/checkout"}>
                  <button onClick={onClose} className="w-full bg-orange-600 text-white py-3 text-sm rounded-b-sm font-semibold hover:opacity-90 transition">
                    CHECKOUT
                  </button>
                </Link>

              </div>
            </>
          ) : (
            /* Empty Cart */
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="flex justify-center items-center mb-4">
                <img
                  src="/assets/my-Order.jpg"
                  alt="Empty Cart"
                  className="w-40 h-40 object-contain"
                />
              </div>

              <div className="text-center text-lg text-gray-700 font-medium mb-3">
                Your shopping Cart is Empty
              </div>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-black text-white rounded text-sm hover:bg-gray-800 transition"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

      </div >
    </>
  );
}
