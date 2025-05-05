import React from 'react'
import Hero from './Hero'
import Benifit from './Benifit'
import Commit from '../TryPages/Commit'
import img1 from "../../assets/model/m9.svg"
import WhyChooseUs from '../TryPages/chooseUs'
import BestSellers from '../TryPages/BestSeller'
import img from "../../assets/NewArrival/6.svg";
import img2 from "../../assets/NewArrival/7.svg";
import img3 from "../../assets/NewArrival/8.svg";
import img4 from "../../assets/NewArrival/9.svg";
const AboutUs = () => {
     const products = [
        {
          id: 1,
          name: "Gleam Specs",
          price: "$579.00",
          color: "Color Options: 3",
          image: img,
        },
        {
          id: 2,
          name: "Prisma Vision",
          price: "$768.00",
          color: "Color Options: 3",
          image: img2,
        },
        {
          id: 3,
          name: "Stellar Shades",
          price: "$865.00",
          color: "Color Options: 3",
          image: img3,
        },
        {
          id: 4,
          name: "Mirage Optics",
          price: "$865.00",
          color: "Color Options: 3",
          image: img4,
        },
      ];
  return (
    <div>
      <Hero/>
      <Benifit/>
      <Commit imageSrc={img1}/>
      <WhyChooseUs/>
      <BestSellers
        title="Shop Best Sellers"
        subtitle="Browse Exclusive Eyewear Collections"
        products={products}
        viewAllLink="/categories"
      /> 
    </div>
  )
}

export default AboutUs
