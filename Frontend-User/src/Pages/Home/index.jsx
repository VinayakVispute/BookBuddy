import Hero from "./components/Hero";
import ContentSection from "./components/ContentSection";
import FAQSection from "./components/FAQSection";
import NewsLetter from "./components/NewsLetter";
function Home() {
  return (
    <div>
      {
        <>
          <Hero />
          <ContentSection />
          <FAQSection />
          <NewsLetter />
        </>
      }
    </div>
  );
}

export default Home;
