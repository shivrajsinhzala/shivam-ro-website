import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCTAs from "@/components/FloatingCTAs";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HomeAndConstructionBusiness",
            "name": "Shivam Water Solution",
            "alternateName": "Shivam Aqua",
            "image": "https://shivamwatersolution.in/assets/logo_with_bg.png",
            "@id": "https://shivamwatersolution.in/#localbusiness",
            "url": "https://shivamwatersolution.in",
            "telephone": "+919925645826",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Vavdi Road",
              "addressLocality": "Morbi",
              "addressRegion": "Gujarat",
              "postalCode": "363641",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 22.812,
              "longitude": 70.835
            },
            "areaServed": [
              {
                "@type": "City",
                "name": "Morbi",
                "sameAs": "https://en.wikipedia.org/wiki/Morbi"
              },
              {
                "@type": "City",
                "name": "Rajkot",
                "sameAs": "https://en.wikipedia.org/wiki/Rajkot"
              }
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "08:00",
              "closes": "21:00"
            },
            "sameAs": [
              "https://shivamwatersolution.in"
            ],
            "priceRange": "$$"
          })
        }}
      />
      <AnnouncementBar />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <FloatingCTAs />
    </>
  );
}
