import React from "react";
import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import axios from "axios";

export default function OrderHistory() {
  const { me } = useAuth(); // 👈 includes { id, username, ... }
  console.log("Auth user:", me);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `http://localhost:3001/api/orders/user/${me.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    if (me?.id) {
      fetchOrders();
    }
  }, [me]);

  return (
    <div>
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ marginBottom: "20px" }}>
            <p>
              Order #{order.id} -{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <ul>
              {order.product_in_carts.map((item) => (
                <li key={item.id}>
                  {item.product.name} x {item.numItems} – $
                  {item.totalPriceForProduct}
                </li>
              ))}
            </ul>
            <p>Status: {order.status}</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

// return (
//   <div>
//     <Text align="center">Your Orders</Text>
//   </div>
// );
