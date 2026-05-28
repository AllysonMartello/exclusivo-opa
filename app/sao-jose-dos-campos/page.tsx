import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Tensao from "./_components/Tensao";
import TheHouse from "./_components/TheHouse";
import Gallery from "./_components/Gallery";
import Location from "./_components/Location";
import PredioHistoria from "./_components/PredioHistoria";
import ForWho from "./_components/ForWho";
import TechnicalSpecs from "./_components/TechnicalSpecs";
import FinalCTA from "./_components/FinalCTA";
import Footer from "./_components/Footer";
import SJCClientShell from "./_components/SJCClientShell";

export default function SJCPage() {
  return (
    <main data-app="sjc" className="w-full min-h-screen bg-bg-main relative">
      <Header />
      <Hero />
      <Tensao />
      <TheHouse />
      <Gallery />
      <Location />
      <PredioHistoria />
      <ForWho />
      <TechnicalSpecs />
      <FinalCTA />
      <Footer />
      <SJCClientShell />
    </main>
  );
}
