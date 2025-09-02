// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Componente do botão flutuante de WhatsApp (client component)
import WhatsFab from "@/components/WhatsaFab";

const inter = Inter({ subsets: ["latin"] });

// ⚠️ Ajuste para o domínio final do seu site quando publicar
const siteName = "RENOV Administradora de Condomínios";
const siteUrl = "https://www.seu-dominio.com.br";

export const metadata: Metadata = {
  title: `${siteName} | Administração de Condomínios`,
  description:
    "Gestão transparente e eficiente para o seu condomínio. Solicite uma proposta e fale com a RENOV.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteName,
    description:
      "Gestão transparente e eficiente para o seu condomínio. Solicite uma proposta.",
    url: siteUrl,
    siteName,
    locale: "pt_BR",
    type: "website",
  },
  // Se você tiver uma imagem OG em /public/og.jpg, descomente:
  // openGraph: { images: ["/og.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GTM = process.env.NEXT_PUBLIC_GTM_ID;
  const phone = process.env.NEXT_PUBLIC_WA_NUMBER || "";

  // JSON-LD básico de LocalBusiness
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteName,
    url: siteUrl,
    telephone: phone ? `+${phone}` : undefined,
    address: {
      "@type": "PostalAddress",
      addressCountry: "BR",
      addressRegion: "SP",
      // Preencha cidade/bairro se quiser:
      // addressLocality: "São Bernardo do Campo",
    },
    areaServed: "Grande SP / ABC",
    // Coloque redes sociais reais se tiver:
    // sameAs: ["https://www.instagram.com/...", "https://www.linkedin.com/company/..."],
  };

  return (
    <html lang="pt-BR">
      <head>
        {/* Google Tag Manager (injeta somente se NEXT_PUBLIC_GTM_ID existir) */}
        {GTM && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM}');`}
          </Script>
        )}

        {/* JSON-LD estruturado */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {/* GTM noscript fallback */}
        {GTM && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="gtm"
            />
          </noscript>
        )}

        {children}

        {/* Botão flutuante do WhatsApp (usa NEXT_PUBLIC_WA_NUMBER) */}
        <WhatsFab />
      </body>
    </html>
  );
}
