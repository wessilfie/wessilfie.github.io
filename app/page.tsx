import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div id="page-container">
      <div id="content-wrap">
        <Navbar />
        <Header showBio={true} showCountdown={true} />
        <Footer />
      </div>
    </div>
  );
}
