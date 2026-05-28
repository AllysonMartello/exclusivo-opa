import { t } from "../_i18n/t";

export default function Tensao() {
  return (
    <section className="py-16 md:py-24 lg:py-32 bg-bg-alt relative overflow-hidden">
      <div className="hidden md:block absolute top-0 right-0 w-[500px] h-[500px] bg-primary-2/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <span className="reveal text-primary-2 uppercase tracking-widest text-xs font-bold mb-4 block">
          {t.tensao.eyebrow}
        </span>

        <h2
          className="reveal section-title text-3xl sm:text-4xl md:text-5xl font-serif text-primary-1 leading-tight"
          style={{ animationDelay: "0.1s" }}
        >
          {t.tensao.title}
        </h2>

        <div className="space-y-5 md:space-y-6 text-text-sec text-base md:text-lg font-light leading-relaxed mb-10">
          {t.tensao.paragraphs.map((p, i) => (
            <p key={i} className="reveal" style={{ animationDelay: `${0.15 + i * 0.1}s` }}>
              {p}
            </p>
          ))}
        </div>

        <p
          className="reveal text-primary-1 text-lg md:text-2xl font-serif italic leading-snug border-l-2 border-primary-2 pl-5 md:pl-6"
          style={{ animationDelay: "0.4s" }}
        >
          {t.tensao.closer}
        </p>
      </div>
    </section>
  );
}
