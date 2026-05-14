"use client"
import { addToCart } from '@/app/ReduxToolkit/cart';
import { deleteWish } from '@/app/ReduxToolkit/wishlistslice';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function WishList() {

  const dispatch = useDispatch();
  const wislist = useSelector((state) => state.wishlist.wishlist);

  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/products/`
  const discount = 0; // placeholder, change if needed
  return (
    <>
      {/* PAGE HEADER */}
      <div className="mx-5 sm:mx-8 md:mx-15 lg:mx-20">
        <h1 className="text-center font-bold text-3xl mt-16">
          My Wishlist
        </h1>

        <p className="text-center my-5">
          Home <span className="text-[#C09578]">&gt;</span>{" "}
          <span className="text-[#C09578]">Wishlist</span>
        </p>

        <div className="h-0.5 bg-[#EBEBEB] my-10"></div>
      </div>

      {/* CONTENT */}
      {wislist.length > 0 ? (
        <div className="p-1 md:p-5 min-h-screen mx-1 md:mx-10">
          {/* TABLE WRAPPER */}
          <div className="overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-200 border-b-4 border-b-[#C19578]">
                <tr>
                  <th className="p-3 font-semibold text-center">Delete</th>
                  <th className="p-3 font-semibold text-center">Image</th>
                  <th className="p-3 font-semibold text-center">Product</th>
                  <th className="p-3 font-semibold text-center">Price</th>
                  <th className="p-3 font-semibold text-center"> Stock Status</th>
                  <th className="p-3 font-semibold text-center">Add To Cart</th>
                </tr>
              </thead>

              <tbody>
                {wislist.map((product) => (
                  <tr key={product._id}>
                    <td className="p-3 text-center border border-gray-200">
                      <button

                        className="text-red-500 cursor-pointer"
                        onClick={() => dispatch(deleteWish(product._id))}
                      >
                        🗑
                      </button>
                    </td>

                    <td className="p-3 border border-gray-200">
                      <img
                        src={baseUrl + product.image}
                        alt={product.name}
                        className="w-28 rounded"
                      />
                    </td>

                    <td className="p-3 border border-gray-200">
                      {product.name}
                    </td>
                    <td className="p-3 font-semibold border  border-gray-200">
                      Rs. {product.sale_price}
                    </td>

                    <td className="p-3 border text-center border-gray-200">
                      {
                        product.stock >0 ? product.stock : 'Out of Stock'
                      }
                    </td>

                    <td className="border text-center border-gray-200 align-middle">
                      <button onClick={()=> dispatch(addToCart(product))}
                       className="bg-[#cba890] text-white px-3 py-1 font-normal rounded hover:bg-[#C19578] cursor-pointer">
                        ADD TO CART
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <>
          {/* EMPTY STATE */}
          <div className="flex justify-center items-center mt-10">
            <img src="./assets/wishlist-Empty.jpg" alt="Empty Wishlist" />
          </div>

          <p className="text-center mb-5 font-semibold">
            Your Wishlist is Empty
          </p>
        </>
      )}
    </>
  )
}
