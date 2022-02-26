const { DomainEvent } = require("@serialized/serialized-client");

class Order {
    get aggregateType() {
      return "order";
    }
  
    constructor(state) {
      this.orderId = state.orderId;
      this.items = state.items;
      this.total = state.total;
      this.completed = state.completed;
    }
  
    createOrder(orderId) {
      if (!orderId || orderId.length !== 36) throw "Invalid orderId";
      return [DomainEvent.create(new OrderCreated(orderId))];
    }
  
    get eventHandlers() {
      return {
        OrderCreated(state, event) {
          console.log("Handling OrderCreated", event);
          return OrderState.newState(event.orderId).withOrderId(event.orderId);
        },
      };
    }
}

class OrderCreated {
  constructor(orderId) {
    this.orderId = orderId;
  }
}

class OrderState {
    constructor({ orderId, items = [], total = 0.0, completed = false }) {
      this.orderId = orderId;
      this.items = items;
      this.total = total;
      this.completed = completed;
    }
  
    static newState(orderId) {
      return new OrderState({ orderId });
    }
  
    withOrderId(orderId) {
      return Object.assign({}, this, { orderId });
    }
}

module.exports = { Order, OrderCreated, OrderState };
