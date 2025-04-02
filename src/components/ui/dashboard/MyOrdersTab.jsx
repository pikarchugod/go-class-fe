// src/components/ui/dashboard/MyOrdersTab.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";

export default function MyOrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await axiosInstance.get("/orders");
      setOrders(res.data.orders);
    } catch (err) {
      console.error("取得訂單失敗：", err);
      setError("無法取得訂單");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>載入中...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">我的訂單</h3>
      {orders.length === 0 ? (
        <p>目前沒有訂單</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="p-4 bg-white rounded shadow">
              <p>訂單編號：{order.order_number}</p>
              <p>狀態：{order.status}</p>
              <p>金額：NT${order.total_amount}</p>
              <p>建立時間：{order.created_at}</p>
              {/* 可擴充「查看詳情」按鈕 */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
