import LinksHub from "@/components/LinksHub";
import { ILHABELA_LINKS, IMOVEIS_EXCLUSIVOS, INSTITUTIONAL_ACESSOS } from "@/lib/brokers";

export default function Home() {
  return (
    <LinksHub
      imoveis={IMOVEIS_EXCLUSIVOS}
      acessos={INSTITUTIONAL_ACESSOS}
      ilhabela={ILHABELA_LINKS}
    />
  );
}
