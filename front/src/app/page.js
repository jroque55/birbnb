import Carousel from "../app/components/carousel/Carousel";
import Hot from "./components/hot/Hot";
import Navbar from "./components/navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Hot></Hot>
      <Carousel />
      
    </>

  )
}
