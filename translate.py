import re
import os

pt_file = "public/costeira-pacuíba/index.html"
with open(pt_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Add CSS for language toggle
css_injection = """
  /* ── LANG TOGGLE ── */
  .lang-toggle {
    position: absolute;
    top: 48px;
    right: 80px;
    z-index: 10;
    display: flex;
    gap: 8px;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.2);
    padding: 6px 12px;
    border-radius: 20px;
  }
  .lang-toggle a {
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1px;
    transition: all 0.2s;
  }
  .lang-toggle a.active {
    color: var(--branco);
  }
  .lang-toggle a:hover {
    color: var(--branco);
  }
  .lang-toggle span {
    color: rgba(255,255,255,0.2);
  }
"""

content = content.replace("  /* ── TIPOGRAFIA COMUM ── */", css_injection + "\n  /* ── TIPOGRAFIA COMUM ── */")

# Adjust mobile CSS for lang toggle
mobile_css = """
    .lang-toggle { top: 24px; right: 24px; }
    .hero-badge { top: 64px; right: 24px; }
"""
content = content.replace(
    "    .hero-badge { right: 24px; top: 30px; font-size: 8px; text-align: right; width: 120px; line-height: 1.4; }",
    "    .lang-toggle { top: 24px; right: 24px; }\n    .hero-badge { right: 24px; top: 64px; font-size: 8px; text-align: right; width: 120px; line-height: 1.4; }"
)

# Also adjust hero-badge top position on desktop since lang-toggle is at 48px
content = content.replace("    top: 58px;\n    right: 80px;", "    top: 84px;\n    right: 80px;")

# Add the HTML for the toggle
toggle_pt = """  <div class="hero-logo">"""
toggle_html_en = """  <div class="lang-toggle">
    <a href="#" class="active">EN</a>
    <span>|</span>
    <a href="pt.html">PT</a>
  </div>

  <div class="hero-logo">"""

toggle_html_pt = """  <div class="lang-toggle">
    <a href="index.html">EN</a>
    <span>|</span>
    <a href="#" class="active">PT</a>
  </div>

  <div class="hero-logo">"""

en_content = content.replace(toggle_pt, toggle_html_en)
pt_content = content.replace(toggle_pt, toggle_html_pt)

translations = [
    ("Material exclusivo para corretores parceiros", "Exclusive material for partner brokers"),
    ("Propriedade exclusiva no norte de Ilhabela", "Exclusive property in the north of Ilhabela"),
    ("7 SUÍTES &nbsp;&middot;&nbsp; ~1.000 M² CONSTRUÍDOS &nbsp;&middot;&nbsp; 18.187 M² DE TERRENO &nbsp;&middot;&nbsp; ACESSO DIRETO AO MAR", 
     "7 SUITES &nbsp;&middot;&nbsp; ~1,000 SQM BUILT &nbsp;&middot;&nbsp; 18,187 SQM PLOT &nbsp;&middot;&nbsp; DIRECT ACCESS TO THE SEA"),
    ('<div class="hero-stat-num">7</div>\n        <div class="hero-stat-label">Suítes</div>',
     '<div class="hero-stat-num">7</div>\n        <div class="hero-stat-label">Suites</div>'),
    ('<div class="hero-stat-label">Construídos</div>', '<div class="hero-stat-label">Built area</div>'),
    ('<div class="hero-stat-label">Área total</div>', '<div class="hero-stat-label">Total area</div>'),
    ('<div class="hero-stat-label">Incluídos na venda</div>', '<div class="hero-stat-label">Included in the sale</div>'),
    ('Resumo geral', 'Overview'),
    ('Uma das propriedades costeiras mais imponentes e exclusivas de Ilhabela, localizada no Norte da Ilha (Pacuíba). Arquitetura térrea que une o rústico ao sofisticado, com total privacidade, vista panorâmica definitiva para o mar e acesso direto ao oceano.',
     'One of the most imposing and exclusive coastal properties in Ilhabela, located in the North of the Island (Pacuíba). Single-story architecture that unites the rustic with the sophisticated, with total privacy, definitive panoramic sea views, and direct access to the ocean.'),
    ('A venda engloba <strong>duas inscrições imobiliárias distintas</strong>: o complexo residencial principal à beira-mar e um enorme terreno preservado do outro lado da avenida — garantindo vista definitiva, privacidade total e potencial para novos projetos.',
     'The sale encompasses <strong>two distinct real estate registrations</strong>: the main residential complex by the sea and a huge preserved plot across the avenue — ensuring definitive views, total privacy, and potential for new projects.'),
    ('Ficha técnica', 'Fact sheet'),
    ('Lote 1 &middot; Complexo Residencial (Beira-Mar)', 'Lot 1 &middot; Residential Complex (Seafront)'),
    ('Endereço', 'Address'),
    ('Inscrição Cadastral', 'Property Tax ID'),
    ('Área Territorial', 'Land Area'),
    ('Área Construída', 'Built Area'),
    ('IPTU Anual', 'Annual Property Tax'),
    ('Complexo residencial beira-mar', 'Seafront residential complex'),
    ('Lote 2 &middot; Terreno de Preservação / Expansão', 'Lot 2 &middot; Preservation / Expansion Plot'),
    ('Benfeitorias', 'Improvements'),
    ('Sem benfeitorias averbadas', 'No registered improvements'),
    ('Preservação e expansão futura', 'Preservation and future expansion'),
    ('Área total de terreno', 'Total land area'),
    ('Área construída', 'Built area'),
    ('IPTU anual total', 'Total annual property tax'),
    ('Lotes na venda', 'Lots in the sale'),
    ('2 inscrições', '2 properties'),
    ('<h2 class="s-h2">Acomodações</h2>', '<h2 class="s-h2">Accommodations</h2>'),
    ('Duas edificações independentes inseridas em um paisagismo impecável.', 'Two independent buildings set in impeccable landscaping.'),
    ('Total de suítes', 'Total suites'),
    ('Banheiros', 'Bathrooms'),
    ('Casa principal', 'Main house'),
    ('5 suítes<span class="acom-sub">com closets e banheiras</span>', '5 suites<span class="acom-sub">with walk-in closets and bathtubs</span>'),
    ('Casa de hóspedes', 'Guest house'),
    ('2 suítes<span class="acom-sub">totalmente independentes</span>', '2 suites<span class="acom-sub">fully independent</span>'),
    ('Vagas de garagem', 'Parking spaces'),
    ('Casa de caseiro', 'Caretaker\\'s house'),
    ('Completa', 'Complete'),
    ('Diferenciais exclusivos', 'Exclusive features'),
    ('Píer privativo', 'Private pier'),
    ('Acesso direto ao mar com estrutura para atracação de embarcações e apoio a esportes náuticos.', 'Direct sea access with structure for mooring vessels and support for water sports.'),
    ('Heliponto', 'Helipad'),
    ('Área gramada preparada para pouso e decolagem de helicópteros com total segurança e discrição.', 'Grassed area prepared for helicopter landing and takeoff with total security and discretion.'),
    ('Lazer integrado', 'Integrated leisure'),
    ('Varanda gourmet com churrasqueira conectada às salas e ao deck da piscina. Ambientes amplos e integrados.', 'Gourmet balcony with barbecue connected to the living rooms and pool deck. Large and integrated spaces.'),
    ('Natureza integrada', 'Integrated nature'),
    ('Pomar com diversas árvores frutíferas, cercado pela exuberante Mata Atlântica nativa.', 'Orchard with various fruit trees, surrounded by the lush native Atlantic Forest.'),
    ('Galeria', 'Gallery'),
    ('Dois lotes.<br>Uma única oportunidade.', 'Two lots.<br>A single opportunity.'),
    ('A venda engloba duas inscrições imobiliárias distintas: o complexo residencial à beira-mar e o terreno de preservação do outro lado da avenida.', 'The sale includes two distinct real estate registrations: the seafront residential complex and the preservation plot across the avenue.'),
    ('Juntos, garantem vista definitiva, privacidade total e potencial de expansão — uma combinação praticamente impossível de replicar na costa de Ilhabela.', 'Together, they guarantee definitive views, total privacy, and expansion potential — a combination virtually impossible to replicate on the Ilhabela coast.'),
    ('Lote 1 · Complexo residencial', 'Lot 1 · Residential complex'),
    ('Lote 2 · Terreno de preservação', 'Lot 2 · Preservation plot'),
    ('Área total combinada', 'Total combined area'),
    ('Lote 1 &middot; Croqui Oficial – Prefeitura de Ilhabela', 'Lot 1 &middot; Official Sketch – Ilhabela City Hall'),
    ('Lote 2 &middot; Croqui Oficial – Prefeitura de Ilhabela', 'Lot 2 &middot; Official Sketch – Ilhabela City Hall'),
    ('Lote 1 &middot; IPTU 2026', 'Lot 1 &middot; Property Tax 2026'),
    ('Lote 2 &middot; IPTU 2026', 'Lot 2 &middot; Property Tax 2026'),
    ('>Tipo<', '>Type<'),
    ('2 lotes', '2 lots'),
]

for pt, en in translations:
    en_content = en_content.replace(pt, en)

# Let's adjust the `<html lang="pt-BR">` in English file
en_content = en_content.replace('<html lang="pt-BR">', '<html lang="en">')
# Title translation
en_content = en_content.replace('<title>Costeira Pacuíba | OPA Agência Imobiliária</title>', '<title>Costeira Pacuíba | OPA Real Estate Agency</title>')

with open(pt_file, 'w', encoding='utf-8') as f:
    f.write(en_content)

with open("public/costeira-pacuíba/pt.html", 'w', encoding='utf-8') as f:
    f.write(pt_content)

print("Done generating EN and PT files")
