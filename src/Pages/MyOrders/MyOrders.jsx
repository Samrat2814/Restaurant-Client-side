import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { motion } from "framer-motion";
import moment from "moment";
import { Trash2 } from "lucide-react";

const MyOrders = () => {
  const { user, loading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `http://localhost:5000/my-orders?email=${
          user.email
        }`
      )
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Error fetching orders:", err));
    }
  }, [user?.email]);

  if (loading) {
    return (
      <div className="text-center py-10 text-lg font-semibold">Loading...</div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">My Orders</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto rounded-2xl shadow-md"
      >
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>             
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Price
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Owner
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Ordered On
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <motion.tr
                key={item._id || index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-t hover:bg-gray-50"
              >
                
                <td className="px-4 py-3">{item.foodName}</td>
                <td className="px-4 py-3">${item.price}</td>
                <td className="px-4 py-3">{item.buyerName}</td>
                <td className="px-4 py-3">
                  {moment(item.orderDate).format("MMMM Do YYYY, h:mm A")}
                </td>
                <td className="px-4 py-3">
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={20} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default MyOrders;
