"use client";

import { motion } from "motion/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

const data = [
  { year: "2019", value: 9500 },
  { year: "2020", value: 10800 },
  { year: "2021", value: 12500 },
  { year: "2022", value: 14200 },
  { year: "2023", value: 15800 },
  { year: "2024", value: 17000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-xl border border-border-main/50">
        <p className="text-text-sec text-sm mb-1">{label}</p>
        <p className="text-primary-1 font-bold text-lg">
          R$ {payload[0].value.toLocaleString("pt-BR")}/m²
        </p>
      </div>
    );
  }
  return null;
};

export default function Investment() {
  return (
    <section className="py-24 bg-bg-alt relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <span className="text-primary-2 uppercase tracking-widest text-xs font-bold mb-4 block">Segurança Patrimonial</span>
            <h2 className="text-4xl md:text-5xl font-serif text-primary-1 mb-8 leading-tight">
              Valorização do mercado em Ilhabela
            </h2>
            <div className="space-y-6 text-text-sec text-lg font-light leading-relaxed mb-10">
              <p>
                Adquirir um imóvel de alto padrão em Ilhabela vai além do estilo de vida. É um movimento estratégico de proteção e expansão de patrimônio.
              </p>
              <p>
                A escassez de terrenos construtíveis e a alta demanda por refúgios exclusivos têm impulsionado uma valorização constante e sólida na região, superando a média nacional.
              </p>
            </div>

            <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-border-main/50">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0">
                <TrendingUp size={28} strokeWidth={2.5} />
              </div>
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary-1">+79%</span>
                  <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">em 5 anos</span>
                </div>
                <p className="text-text-sec text-sm mt-1">Crescimento médio do m² na região</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 1 }}
            className="lg:col-span-7 bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl border border-border-main/50"
          >
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-text-sec text-sm font-medium mb-1">Evolução do m² (R$)</p>
                <div className="flex items-baseline gap-4">
                  <span className="text-2xl text-text-sec/50 line-through decoration-1">2019: 9.500</span>
                  <span className="text-3xl font-bold text-primary-1">2024: 17.000</span>
                </div>
              </div>
            </div>
            
            <div className="h-[300px] md:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8C6B4F" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8C6B4F" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="year" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6B7280', fontSize: 14, fontWeight: 500 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6B7280', fontSize: 14 }}
                    tickFormatter={(value) => `R$ ${value / 1000}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#8C6B4F" 
                    strokeWidth={4}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    activeDot={{ r: 8, fill: "#8C6B4F", stroke: "#fff", strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
