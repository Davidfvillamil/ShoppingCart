import React from "react";
import storeItems from "../data/products.json";
import { Item } from "./Item";
import { useState, useEffect } from "react";

export const ItemList = () => {

  const [data, setData] = useState([])
  const [stock,setStock] = useState({})
  let imagenes = ['http://localhost:1337/uploads/manzana_53e9a8bde0.png', 'http://localhost:1337/uploads/naranja_e14968fd86.png', 'http://localhost:1337/uploads/salchichon_d9fd22ec53.png', 'http://localhost:1337/uploads/lulo_5ceab59236.png', 'http://localhost:1337/uploads/naranja_e14968fd86.png']
    
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:1337/api/products');
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, []);

    const datos = data.data
    console.log(datos)
    
    let cleanedData = [];
    if (datos) {
        cleanedData = data.data.map(item => {
            const {id, attributes} = item
            const { name,Cost,Contry,Instock } = attributes;
            return { id, name, Cost, Contry, Instock };
        });
    }
    
    for (let i = 0; i < cleanedData.length; i++){
      cleanedData[i].image = imagenes[i]
    }

  return (
    <div className="items-list">
      {cleanedData.map((product, idx) => {
        return <Item key={product.id} {...product} />;
      })}
    </div>
  );
};
