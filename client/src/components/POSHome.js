import React from "react";

export default function POSHome() {

  async function createOrder() {
    var generatedOrderId = crypto.randomUUID();
    var data = { orderId: generatedOrderId };
    var order = await fetch("http://localhost:9000/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  }

  return (
    <div>
      <h1>POS System ☕️</h1>
      <div>
        <button onClick={createOrder}>Create Order</button>
      </div>
    </div>
  );
}
