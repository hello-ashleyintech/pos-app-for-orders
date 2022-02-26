const { Order } = require("./order");

const handleError = async function (handler) {
  try {
    await handler();
  } catch (error) {
    throw new Error("Failed to process command: " + error);
  }
};

class OrderClient {
  constructor(serializedClient) {
    this.client = serializedClient.aggregateClient(Order);
  }

  async createOrder(orderId) {
    await handleError(
      async () =>
        await this.client.create(orderId, (order) => {
          return order.createOrder(orderId);
        })
    );
  }
}

module.exports = OrderClient;
