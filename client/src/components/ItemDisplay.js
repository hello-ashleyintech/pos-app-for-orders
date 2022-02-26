import React from "react";

export default function ItemDisplay() {
  var data = require("../data/items.json");

  return (
    <div>
      <div>
        {data.items.map((item, index) => {
          return (
            <button key={index}>
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
