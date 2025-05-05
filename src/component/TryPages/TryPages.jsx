import React from 'react'
import Hero from "./Hero";
import Commit from "./Commit";
import Services from "./Services";
import ChooseUs from './chooseUs';
import Promotions from './Promotions';
import BestSellers from './BestSeller';
import img1 from "../../assets/model/m7.svg"
import img from "../../assets/model/m8.svg";
const TryPages = () => {
  const products = [
    {
      id: 1,
      name: "Gleam Specs",
      price: "$575.00",
      color: "Color Options: 3",
      image: img,
    },
    {
      id: 2,
      name: "Prisma Vision",
      price: "$768.00",
      color: "Color Options: 3",
      image: img,
    },
    {
      id: 3,
      name: "Stellar Shades",
      price: "$865.00",
      color: "Color Options: 3",
      image: img,
    },
    {
      id: 4,
      name: "Mirage Optics",
      price: "$865.00",
      color: "Color Options: 3",
      image: img,
    },
  ];
  
  return (
    <div>
      <Hero/>
      <Commit imageSrc={img1}/>
      <Services/>
      <ChooseUs/>
      <Promotions/>
      <BestSellers
        title="Shop Best Sellers"
        subtitle="Browse Exclusive Eyewear Collections"
        products={products}
        viewAllLink="/categories"
      />
    </div>
  )
}

export default TryPages
