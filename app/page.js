import { Button } from "@/components/ui/button"
import Image from "next/image";
import Header from "./_components/header.jsx";
import Footer from "./_components/footer";
import Banner from "./_components/banner";

export default function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <Footer />
    </div>
  );
}
