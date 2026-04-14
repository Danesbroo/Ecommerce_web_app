import React from 'react'

export default function OrderSection() {
    return (
        <>
            {/* order section  */}
            <div className="md:basis-[100%] lg:basis-[73%] overflow-x-auto lg:overflow-x-visible">
                <h3 className="font-bold text-xl my-4">Orders</h3>

                <table className="min-w-max w-full border-collapse">
                    <thead className="text-center bg-gray-100">
                        <tr className="h-10 border-b-2 border-b-gray-400">
                            <th className="px-4 py-2 whitespace-nowrap">Order</th>
                            <th className="px-4 py-2 whitespace-nowrap">Date</th>
                            <th className="px-4 py-2 whitespace-nowrap">Status</th>
                            <th className="px-4 py-2 whitespace-nowrap">Total</th>
                            <th className="px-4 py-2 whitespace-nowrap">Order</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        <tr className="h-8">
                            <td className="border border-gray-200 px-4 py-2">1</td>
                            <td className="border border-gray-200 px-4 py-2">Jan 1, 2025</td>
                            <td className="border border-gray-200 px-4 py-2">Completed</td>
                            <td className="border border-gray-200 px-4 py-2">Rs 500 for 1 item</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button className="text-blue-600">View</button>
                            </td>
                        </tr>
                        <tr className="h-8">
                            <td className="border border-gray-200 px-4 py-2">2</td>
                            <td className="border border-gray-200 px-4 py-2">Jan 5, 2025</td>
                            <td className="border border-gray-200 px-4 py-2">Processing</td>
                            <td className="border border-gray-200 px-4 py-2">Rs 500 for 1 item</td>
                            <td className="border border-gray-200 px-4 py-2">
                                <button className="text-blue-600">View</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}
