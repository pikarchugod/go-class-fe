// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axios";
import { Button } from "@/components/ui/button"; // shadcn UI 的 Button

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/cart");
      setCartItems(res.data.cart);
    } catch (err) {
      setError("無法取得購物車資料");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeCartItem = async (id) => {
    try {
      await axiosInstance.delete(`/cart/remove/${id}`);
      fetchCart();
    } catch (err) {
      console.error("移除項目失敗：", err);
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return <div className="p-4">載入中...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 lg:px-20 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">購物車</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">購物車是空的</p>
      ) : (
        <div className="space-y-4">
          {/* 桌機版：兩欄排列 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-md shadow flex flex-col md:flex-row items-center justify-between"
              >
                <div className="flex items-center space-x-4 w-full">
                  <img
                    src={item.cover_url} // 假設後端已回傳完整圖片 URL
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-500">NT${item.price}</p>
                    <p className="text-sm text-gray-500">數量：{item.quantity}</p>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <Button variant="destructive" onClick={() => removeCartItem(item.id)}>
                    移除
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right mt-4">
            <p className="text-lg font-semibold">總金額：NT${totalPrice}</p>
            <Button className="mt-2">前往結帳</Button>
          </div>
        </div>
      )}
    </div>
  );
}
