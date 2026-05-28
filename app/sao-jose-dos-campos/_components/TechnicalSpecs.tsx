import {
  Building2,
  Home,
  LayoutGrid,
  Maximize,
  Maximize2,
  Car,
  Bath,
  Hammer,
  ArrowUpDown,
  PartyPopper,
  Sparkles,
  Coins,
  Receipt,
  MapPin,
  Landmark,
  Wallet,
  Tag,
} from "lucide-react";
import { t } from "../_i18n/t";

const specIcons = [
  <Building2 size={24} />,
  <Home size={24} />,
  <LayoutGrid size={24} />,
  <Maximize size={24} />,
  <Maximize2 size={24} />,
  <Car size={24} />,
  <Bath size={24} />,
  <Hammer size={24} />,
  <ArrowUpDown size={24} />,
  <PartyPopper size={24} />,
  <Sparkles size={24} />,
  <Coins size={24} />,
  <Receipt size={24} />,
  <MapPin size={24} />,
  <Landmark size={24} />,
  <Wallet size={24} />,
  <Tag size={24} />,
];

export default function TechnicalSpecs() {
  const specs = t.technicalSpecs.specs.map((s, i) => ({
    ...s,
    icon: specIcons[i] ?? <Home size={24} />,
  }));
  const priceIndex = specs.length - 1;
  return (
    <section className="py-16 md:py-24 bg-primary-1 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="reveal section-title text-3xl sm:text-4xl md:text-5xl font-serif">
            {t.technicalSpecs.title}
          </h2>
          <div className="w-12 h-1 bg-primary-2 mx-auto"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-8 md:gap-y-12 mb-12 md:mb-20">
          {specs.filter((_, i) => i !== priceIndex).map((spec, index) => (
            <div
              key={index}
              className="reveal flex flex-col items-start p-4 sm:p-6 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors duration-300"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="text-primary-2 mb-4 sm:mb-6 bg-white/10 p-3 rounded-full">
                {spec.icon}
              </div>
              <h4 className="text-white/60 text-xs uppercase tracking-widest font-medium mb-2">{spec.label}</h4>
              <p className="text-base sm:text-lg font-serif text-white">{spec.value}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          {[specs[priceIndex]].map((spec) => (
            <div
              key="price-card"
              className="reveal flex flex-col items-center text-center p-8 sm:p-10 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-white text-primary-1 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.3)] max-w-lg w-full"
            >
              <div className="text-primary-2 mb-8 bg-primary-2/10 p-5 rounded-full">
                {spec.icon}
              </div>
              <h4 className="text-primary-1/80 text-sm md:text-base uppercase tracking-[0.4em] font-bold mb-4">{spec.label}</h4>
              <p className="text-5xl md:text-6xl font-serif font-bold text-primary-1 leading-tight tracking-tight">
                {spec.value}
              </p>
              <div className="mt-8 pt-8 border-t border-primary-1/5 w-full">
                <span className="text-xs md:text-sm text-primary-1/70 uppercase tracking-[0.2em] font-bold">
                  {t.technicalSpecs.priceFooter}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
