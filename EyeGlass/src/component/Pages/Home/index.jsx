import React from 'react'
import HeroSection from "../../HeroSection/page";
import Categories from "../../Categories/page";
import TrendyGlass from "../../TrendyGlass/page";
import AdsBanner from "../../AdsBanner/page";
import TypesGlass from "../../TypesGlass/page";
import NewArrival from "../../NewArrival/page";
import CustomerReview from "../../CustomerReview/page";
import ModelEyeglass from "../../ModelEyeglass/page";
const index = () => {
  return (
    <div>
      <HeroSection/>
      {/* <ModelEyeglass/> */}
      <Categories/>
      <TrendyGlass/>
      <AdsBanner/>
      <TypesGlass/>
      <NewArrival/>
      <CustomerReview/>
    </div>
  )
}

export default index
