import BestSelling from "@/Components/BestSelling/BestSelling";
import Banner from "@/Components/HomeComponents/Banner";
import ButtonSection from "@/Components/HomeComponents/ButtonSection";
import ChairCollection from "@/Components/HomeComponents/ChairCollection";
import ConsumerSection from "@/Components/HomeComponents/ConsumerSection";
import FreeShoping from "@/Components/HomeComponents/FreeShoping";
import NewsLetter from "@/Components/HomeComponents/NewsLetter";
import Trending from "@/Components/HomeComponents/Trending";
import Image from "next/image";

export default function Main() {



  return (
    <>
      <Banner/>
      <div className="mt-[30px]">
        <ChairCollection/>
      </div>
      <ButtonSection />
      <Trending />
      <BestSelling title = {"Bestselling Products"}/>
      <FreeShoping />
      <div className="mb-8 mt-3">
        <ConsumerSection />
      </div>
      <NewsLetter />
    </>
  );
}
