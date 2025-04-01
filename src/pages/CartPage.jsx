// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axios";
import { Button } from "@/components/ui/button"; // shadcn UI 按鈕

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  // 取得購物車資料，後端應回傳 { cart: [...] }
  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/cart");
      setCartItems(res.data.cart);
    } catch (err) {
      console.error("取得購物車資料失敗:", err);
      setError("無法取得購物車資料");
    } finally {
      setLoading(false);
    }
  };

  // 計算總金額
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 前往結帳：先建立訂單，再呼叫發起付款 API，然後以 document.write 替換頁面為付款表單
  const handleCheckout = async () => {
    try {
      // 1. 建立訂單
      const checkoutRes = await axiosInstance.post("/order/checkout", {
        payment_method: "credit_card",
      });

      if (checkoutRes.status === 201 && checkoutRes.data.order) {
        const orderId = checkoutRes.data.order.id;
        // 2. 呼叫發起付款 API
        const paymentRes = await axiosInstance.post("/payment/initiate", {
          order_id: orderId,
        });
        // 假設回傳 JSON 包含 { html: "<form>...</form><script>...</script>" }
        if (paymentRes.data.html) {
          // 使用 document.write 替換當前頁面，使自動送出表單生效
          document.open();
          document.write(paymentRes.data.html);
          document.close();
        } else {
          alert("付款表單生成失敗");
        }
      } else {
        alert("訂單建立失敗，請稍後再試");
      }
    } catch (err) {
      console.error("結帳失敗:", err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("結帳失敗");
      }
    }
  };

  if (loading) return <div className="p-4">載入中...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 lg:px-20 py-6">
      <h1 className="text-2xl font-bold mb-4 text-center">購物車</h1>
      {cartItems.length === 0 ? (
        <p className="text-center">購物車是空的</p>
      ) : (
        <>
          {/* 購物車項目列表：桌機版兩欄排列，手機版單欄 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-md shadow flex flex-col md:flex-row items-center"
              >
                <img
                  src={item.cover_url} // 後端應回傳完整圖片 URL
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4 flex-grow">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">NT${item.price}</p>
                  <p className="text-sm text-gray-500">數量：{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/* 總金額與結帳按鈕 */}
          <div className="text-right mt-4">
            <p className="text-lg font-semibold">總金額：NT${totalPrice}</p>
            <Button className="mt-2" onClick={handleCheckout}>
              前往結帳
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
