"use client"
import React from 'react'

export default function loading() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="flex flex-col items-center">
                    {/* Spinner */}
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

                    {/* Text */}
                    <p className="mt-6 text-lg font-semibold text-gray-600">
                        Loading, please wait...
                    </p>
                </div>
            </div>
        </>
    )
}
