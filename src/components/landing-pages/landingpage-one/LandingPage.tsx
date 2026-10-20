import AnnouncementBar from "./AnnouncementBar";
import BackMainPage from "./BackMainPage";
import FAQSection from "./FAQSection";
import InadingImageGallary from "./InadingImageGallary";
import LandingDescription from "./LandingDescription";
import LogoSection from "./LogoSection";
import OrderSection from "./OrderSection";
import PriceSection from "./PriceSection";
import ProductInfoContact from "./ProductInfoContact";
import ReviewSection from "./ReviewSection";

const LandingPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f8fcfd]">
      
      <AnnouncementBar />
      <LogoSection/>
      {/* Background shapes */}
      <div className="pointer-events-none  absolute inset-0 overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute -left-32 -top-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-2xl" />

        <div className="absolute -right-40 top-20 h-[550px] w-[550px] rounded-full bg-sky-100/60 blur-3xl" />
      </div>

      {/* Main content */}
      <section className="relative z-10">
        <div className="Container grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <InadingImageGallary />

          <LandingDescription />
        </div>

        {/* <PriceSection/> */}
        <ProductInfoContact />
        <FAQSection />
        <ReviewSection />
        <OrderSection/>
        <BackMainPage/>
      </section>
    </main>
  );
};

export default LandingPage;
