"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { pushToDataLayer } from "@/lib/gtm";
import CondosCarousel from "@/components/CondosCarousel";

const waNumber = process.env.NEXT_PUBLIC_WA_NUMBER || "";

const FORMSPREE = "https://formspree.io/f/xjkeezza"; // <-- troque pelo seu ID


const LeadSchema = z.object({
  nome: z.string().min(2, "Informe seu nome completo"),
  email: z.string().email("Digite um e-mail válido"),
  telefone: z.string().min(10, "Informe DDD + número"),
  unidades: z.string().optional(),
  cidade: z.string().optional(),
  mensagem: z.string().optional(),
});
type LeadInputs = z.infer<typeof LeadSchema>;

function buildWaLink() {
  const msg = encodeURIComponent(
    "Olá! Gostaria de solicitar uma proposta para administração do meu condomínio."
  );
  return waNumber ? `https://wa.me/${waNumber}?text=${msg}` : "#";
}

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200 header-gradient">
      <div className="mx-auto max-w-6xl px-4 py-4 md:py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/renova-logo.png" alt="RENOV" width={100} height={36} />
        </div>

        {/* Menu maior, sem underline (usa .nav-link do globals.css) */}
        <nav className="hidden md:flex items-center gap-8 text-[18px] md:text-[18px] leading-none">
          <a href="#servicos" className="nav-link scroll-mt-header">Serviços</a>
          <a href="#como-funciona" className="nav-link scroll-mt-header">Como funciona</a>
          <a href="#faq" className="nav-link scroll-mt-header">FAQ</a>
          <a href="#contato" className="nav-link scroll-mt-header">Contato</a>
        </nav>

        <div className="flex items-center gap-3">
          {/* Agora aponta para #contato para não “passar” do alvo */}
          <a href="#contato" className="btn-primary">Solicitar proposta</a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="bg-muted">
      <div className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Gestão de condomínio <span className="text-brand">sem dor de cabeça</span>.
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Transparência, rapidez e um time especialista cuidando do seu condomínio.
          </p>
          <div className="mt-6 flex gap-3">
            {/* Também aponta para #contato */}
            <a href="#contato" className="btn-primary">Solicitar proposta</a>
            <Link href={buildWaLink()} className="btn-secondary">Falar no WhatsApp</Link>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-700">
            <li>✔ Prestação de contas clara</li>
            <li>✔ Atendimento ágil (SLA)</li>
            <li>✔ Redução de inadimplência</li>
            <li>✔ Apoio em assembleias</li>
          </ul>
        </div>

        <CondosCarousel
          slides={[
            { src: "/img1.png", alt: "Condomínio 1" },
            { src: "/img2.png", alt: "Condomínio 2" },
            { src: "/img3.png", alt: "Condomínio 3" },
            { src: "/img4.png", alt: "Condomínio 4" },
          ]}
        />
      </div>
    </section>
  );
}

function Diferenciais() {
  const items = [
    { t: "Transparência total", d: "Contas claras e relatórios objetivos, 100% digitais." },
    { t: "Agilidade no atendimento", d: "SLA definido e comunicação direta." },
    { t: "Processos padronizados", d: "Rotinas financeiras, RH e compliance bem definidos." },
    { t: "Tecnologia", d: "Portal/app para síndicos e condôminos (quando aplicável)." },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold">Por que a <span className="text-brand">RENOV</span>?</h2>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.t} className="p-6 rounded-2xl border border-gray-200 bg-white">
              <h3 className="font-semibold">{it.t}</h3>
              <p className="text-sm text-gray-700 mt-2">{it.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Servicos() {
  const cards = [
    { t: "Administrativo", d: "Assembleias, atas, comunicação, fornecedores, documentação." },
    { t: "Financeiro", d: "Boletos, cobrança, conciliação, previsões e relatórios." },
    { t: "Pessoal/RH", d: "Rotinas trabalhistas, folha, benefícios e conformidade." },
    { t: "Assessoria Jurídica", d: "Apoio em contratos, inadimplência e orientações legais." },
  ];
  return (
    <section id="servicos" className="py-16 bg-muted scroll-mt-header">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold">Serviços</h2>
        <div className="mt-8 grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {cards.map((c) => (
            <div key={c.t} className="p-6 rounded-2xl border border-gray-200 bg-white">
              <h3 className="font-semibold">{c.t}</h3>
              <p className="text-sm text-gray-700 mt-2">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const steps = [
    { n: "1", t: "Diagnóstico", d: "Entendemos o condomínio, histórico e prioridades." },
    { n: "2", t: "Proposta e transição", d: "Plano claro, cronograma e responsáveis." },
    { n: "3", t: "Implantação contínua", d: "Processos rodando e acompanhamento do síndico." },
  ];
  return (
    <section id="como-funciona" className="py-16 scroll-mt-header">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold">Como funciona</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div key={s.n} className="p-6 rounded-2xl border border-gray-200 bg-white">
              <div className="w-10 h-10 bg-brand text-white flex items-center justify-center rounded-full font-bold">
                {s.n}
              </div>
              <h3 className="font-semibold mt-4">{s.t}</h3>
              <p className="text-sm text-gray-700 mt-2">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const qa = [
    { q: "Quanto custa a administração?", a: "Enviamos proposta conforme nº de unidades, serviços inclusos e complexidade." },
    { q: "Como é a transição?", a: "Checklist e cronograma: documentação, contas, folha, contratos e comunicação." },
    { q: "Vocês atendem quais regiões?", a: "Atuação em Grande SP/ABC (e outras regiões sob consulta)." },
    { q: "Prazo de resposta?", a: "SLA para chamados e retorno comercial em até X horas úteis." },
  ];
  return (
    <section id="faq" className="pt-16 pb-24 bg-muted scroll-mt-header">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold">FAQ</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {qa.map((item) => (
            <details key={item.q} className="p-5 rounded-2xl border border-gray-200 bg-white">
              <summary className="font-semibold cursor-pointer">{item.q}</summary>
              <p className="text-sm text-gray-700 mt-2">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer bg-black text-white relative z-10">
      <div className="mx-auto max-w-6xl px-4 py-14 grid gap-10 md:grid-cols-12 items-start">
        {/* Logo */}
        <div className="md:col-span-3">
          <Image
            src="/renova-logo.png"
            alt="RENOV"
            width={150}
            height={64}
            className="opacity-90"
            priority
          />
        </div>

        {/* Blocos de informações */}
        <div className="md:col-span-9 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide">
              Horário de funcionamento
            </h3>
            <p className="mt-3 text-base">09h – 17h de Segunda a Sexta</p>

            <h3 className="mt-6 text-sm font-extrabold uppercase tracking-wide">
              Endereço
            </h3>
            <address className="not-italic mt-3 text-base leading-6">
              Av. Pereira Barreto, 1479 – Centro,<br />
              São Bernardo do Campo – SP,<br />
              09751-000
            </address>
          </div>

          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wide">
              Contato
            </h3>
            <ul className="mt-3 space-y-3 text-base">
              <li>
                IG:{" @renov.adm"}
                <a
                  href="https://instagram.com/renov.adm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @renov.adm
                </a>
              </li>
              <li>
                TEL:{" (11) 4317-8402"}
                <a href="tel:+551143178402">
                  (11) 4317-8402
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra de copy com espaço pro FAB do WhatsApp */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4">
          <p className="py-6 text-center text-white/85 text-sm pr-24">
            © {new Date().getFullYear()} | Renov Administradora de Condomínios. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

function AppDiferencial() {
  return (
    <section className="py-16 bg-[linear-gradient(180deg,#ffffff_0%,#F4F7FF_30%,#F4F7FF_100%)]">
      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
        {/* Lado da imagem */}
        <div className="relative">
          {/* brilho laranja suave atrás do aparelho */}
          <div
            aria-hidden
            className="absolute -inset-6 rounded-full opacity-30 blur-2xl
                       bg-[radial-gradient(closest-side,rgba(255,105,0,.35),transparent_75%)]"
          />
          <div className="relative aspect-[4/5] w-full max-w-sm mx-auto">
            <Image
              src="/cell.webp"
              alt="App do condômino - Superlógica"
              fill
              className="object-contain"
              sizes="(min-width: 768px) 40vw, 80vw"
              priority
            />
          </div>
        </div>

        {/* Lado do texto */}
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold">
            O condomínio nas suas mãos
          </h2>

          <p className="mt-4 text-lg text-gray-700">
            O morador agenda áreas de lazer, solicita segunda via de boleto e
            envia recados diretamente pelo app <strong>Superlógica</strong> —
            tudo com praticidade e transparência.
          </p>
          <p className="mt-3 text-lg text-gray-700">
            Com acesso online às contas, comunicados e gráficos, o síndico e os
            condôminos acompanham a gestão em tempo real, ganhando agilidade e
            controle.
          </p>

          <ul className="mt-6 space-y-2 text-gray-700">
            <li>✔ Agendamento de áreas comuns e mudanças</li>
            <li>✔ 2ª via de boleto e comunicados em um toque</li>
            <li>✔ Transparência: contas e gráficos sempre acessíveis</li>
          </ul>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.condor.superlogica&hl=pt_BR"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white rounded-xl px-4 py-3 font-semibold"
            >
              ANDROID
            </a>
            <a
              href="https://apps.apple.com/br/app/condom%C3%ADnio-%C3%A1rea-do-cond%C3%B4mino/id1160849001"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black text-white rounded-xl px-4 py-3 font-semibold"
            >
              iOS
            </a>
          </div>

          <p className="mt-3 text-sm text-gray-600">
            * Integração via Superlógica. Funcionalidades podem variar por
            condomínio.
          </p>
        </div>
      </div>
    </section>
  );
}


export default function Page() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LeadInputs>({ resolver: zodResolver(LeadSchema) });

  async function onSubmit(data: LeadInputs) {
    try {
      const res = await fetch(FORMSPREE, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        reset();
        alert("Recebemos seu contato! Obrigado.");
        pushToDataLayer({ event: "lead_submit", form: "principal" });
      } else {
        alert("Não foi possível enviar agora. Fale conosco pelo WhatsApp.");
      }
    } catch {
      alert("Erro de rede. Fale conosco pelo WhatsApp.");
    }
  }


  function FaleConosco() {
    // endereço da RENOV (texto e link)
    const address =
      "Av. Pereira Barreto, 1479 – Paraíso, São Bernardo do Campo – SP, 09751-000";

    // URL do embed do Google Maps (simples e funcional)
    const mapSrc =
      "https://www.google.com/maps?q=Av.%20Pereira%20Barreto%2C%201479%20-%20Para%C3%ADso%2C%20S%C3%A3o%20Bernardo%20do%20Campo%20-%20SP%2C%2009751-000&output=embed";

    // link para abrir no Google Maps
    const mapLink =
      "https://www.google.com/maps/search/?api=1&query=Av.+Pereira+Barreto%2C+1479+-+Para%C3%ADso%2C+S%C3%A3o+Bernardo+do+Campo+-+SP%2C+09751-000";

    return (
      <section id="mapa" className="py-16 bg-muted">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">FALE CONOSCO!</h2>
            <p className="mt-4 text-lg text-gray-700">
              Você tem alguma dúvida, sugestão, crítica ou reclamação? Então entre
              em contato conosco clicando no botão abaixo!
            </p>

            <a href={buildWaLink()} className="btn-primary mt-6 inline-flex">
              ENTRE EM CONTATO AGORA!
            </a>

            <p className="mt-6 text-sm text-gray-600">
              {address} —{" "}
              <a
                href={mapLink}
                target="_blank"
                rel="noopener"
                className="link-brand"
              >
                Ver no Google Maps
              </a>
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <iframe
              title="Mapa - RENOV"
              src={mapSrc}
              className="w-full h-[320px] md:h-[420px] block"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Header />
      <Hero />
      <Diferenciais />
      <Servicos />
      <ComoFunciona />
      <AppDiferencial />
      <FaleConosco />

      {/* FAQ agora vem ANTES do contato */}
      <FAQ />

      {/* CONTATO — com “provas” ao lado para não ficar vazio */}
      <section id="contato" className="py-16 scroll-mt-header">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl font-bold">Solicite uma proposta</h2>
            <p className="text-gray-700 mt-2">
              Preencha o formulário e retornaremos rapidamente. Se preferir, fale pelo WhatsApp.
            </p>

            {/* Micro-provas para dar corpo à coluna esquerda */}
            <ul className="mt-5 space-y-2 text-sm text-gray-700">
              <li>✔ Retorno em até 1 dia útil</li>
              <li>✔ Sem compromisso</li>
              <li>✔ Dados tratados conforme LGPD</li>
            </ul>

            <Link href={buildWaLink()} className="btn-secondary inline-block mt-5">
              Falar no WhatsApp
            </Link>
          </div>

          <form
            id="form"
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 rounded-2xl border border-gray-200 bg-white space-y-4 scroll-mt-tight"
          >
            <div>
              <label className="block text-sm font-medium">Nome*</label>
              <input
                className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                placeholder="Seu nome completo"
                {...register("nome")}
              />
              {errors.nome && <p className="text-red-600 text-sm mt-1">{errors.nome.message}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">E-mail*</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                  placeholder="seuemail@exemplo.com"
                  {...register("email")}
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium">Telefone/WhatsApp*</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                  placeholder="(11) 9XXXX-XXXX"
                  {...register("telefone")}
                />
                {errors.telefone && (
                  <p className="text-red-600 text-sm mt-1">{errors.telefone.message}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Nº de unidades</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                  placeholder="Ex.: 48"
                  {...register("unidades")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Cidade</label>
                <input
                  className="mt-1 w-full rounded-xl border border-gray-300 p-3"
                  placeholder="Ex.: São Bernardo do Campo"
                  {...register("cidade")}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Mensagem</label>
              <textarea
                className="mt-1 w-full rounded-xl border border-gray-300 p-3 min-h-[100px]"
                placeholder="Conte um pouco sobre o condomínio"
                {...register("mensagem")}
              />
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              {isSubmitting ? "Enviando..." : "Enviar"}
            </button>

            {isSubmitSuccessful && (
              <p className="text-green-700 text-sm">
                Recebemos seu contato! Em breve retornaremos.
              </p>
            )}
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}