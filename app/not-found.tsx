import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NavigationLinks from "@/components/NavigationLinks";

export default function NotFound() {
  return (
    <div id="page-container">
      <div id="content-wrap">
        <Navbar />

        <div style={{ textAlign: "center", padding: "64px 32px" }}>
          <h1 id="name-header" style={{ fontSize: "96px", marginBottom: "16px" }}>
            404
          </h1>
          <h2 style={{ fontSize: "32px", fontWeight: 300, marginBottom: "32px" }}>
            Page Not Found
          </h2>
          <p style={{ fontSize: "24px", marginBottom: "32px" }}>
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link href="/" className="button">
            Go back home →
          </Link>
        </div>

        <NavigationLinks />
        <Footer />
      </div>
    </div>
  );
}
