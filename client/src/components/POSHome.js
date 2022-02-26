import React, { useState } from "react";
import ItemDisplay from "./ItemDisplay";

export default function POSHome() {
  const [startedOrder, setStartedOrder] = useState(false);
  const [orderId, setOrderId] = useState("");

  async function createOrder() {
    var generatedOrderId = crypto.randomUUID();
    var data = { orderId: generatedOrderId };
    var order = await fetch("http://localhost:9000/orders/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // if order was successful
    if (order.status === 200) {
      setStartedOrder(true);
      setOrderId(generatedOrderId);
    }
  }

  return (
    <div>
      <h1>POS System ☕️</h1>
      {!startedOrder && (
        <div>
          <button onClick={createOrder}>Create Order</button>
        </div>
      )}
      {startedOrder && (
        <ItemDisplay orderId={orderId} setStartedOrder={setStartedOrder} />
      )}
    </div>
  );
}
