import React, { useContext } from "react";
import { CartContext } from "../contexts/ShoppingCartContext";
import { useState } from "react";

export const Item = ({ name, Cost, id, image,Instock }) => {
  const [cart, setCart] = useContext(CartContext);
  const [stock,setStock] = useState(Instock)
  const [statusStock, setStatusStock] = useState(true)

  const addToCart = () => {
    setCart((currItems) => {
      const isItemsFound = currItems.find((item) => item.id === id);
      if (isItemsFound) {
        return currItems.map((item) => {
          if (item.id === id && stock > 0) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...currItems, { id, quantity: 1, Cost }];
      }
    });
    if(stock <= 0){
      setStatusStock(false)
    }else{
        setStock(stock - 1)
        setStatusStock(true)
    }
  };

  const removeItem = (id) => {
    setCart((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
    setStock(stock + 1)
  };

  const getQuantityById = (id) => {
    return cart.find((item) => item.id === id)?.quantity || 0;
  };

  const quantityPerItem = getQuantityById(id);

  return (
    <div className="item-box">
      {quantityPerItem > 0 && (
        <div className="item-quantity">{quantityPerItem}</div>
      )}

      <div>{name}</div>
      <img src={image} width="80" height="55" />
      <div className="item-price">${Cost}</div>
      <div>In stock: {stock}</div>

      {quantityPerItem === 0 ? (
        <button className="item-add-button" onClick={() => addToCart()} disabled = {!statusStock}>
          + Add to cart
        </button>
      ) : (
        <button className="item-plus-button" onClick={() => addToCart()} disabled = {!statusStock}>
          + add more
        </button>
      )}

      {quantityPerItem > 0 && (
        <button className="item-minus-button" onClick={() => removeItem(id)}>
          subtract item
        </button>
      )}
    </div>
  );
};
