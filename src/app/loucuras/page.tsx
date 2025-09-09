"use client";

import React from "react";

// TODO: automate this to CMS server, maybe Strapi?
const my_mind = [
  {
    titulo: "Eu quero que a IA roube o meu emprego!",
    descricao: "Não leia! Ainda estou escrevendo.",
    data: "08/09/2025",
    autor: "Felipe Castro",
    link: "/loucuras/sobre-a-ia-desgracada",
  },
  {
    titulo: "Sobre amar, mesmo quando não há incentivos",
    descricao: "Não leia! Ainda estou escrevendo.",
    data: "08/09/2025",
    autor: "Felipe Castro",
    link: "/loucuras/sobre-amor",
  },
  {
    titulo: "Os erros da caminhada",
    descricao: "No fim, viver é arriscar. E arriscar quase sempre significa errar. [...] Faça um favor a você mesmo e erre agora mesmo, só não fique parado com medo",
    data: "08/09/2025",
    autor: "Felipe Castro",
    link: "/loucuras/os-erros-da-caminhada",
  },
];

export default function EscritosSection() {
  return (
    <section className="flex flex-col  px-2 py-12 ">
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        {my_mind.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className="block p-6 rounded-lg"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {item.titulo}
            </h3>
            <p className="mt-1 text-gray-700 text-sm sm:text-base">
              {item.descricao}
            </p>
            <span className="mt-2 text-gray-500 text-xs sm:text-sm block">
              {item.data} — {item.autor}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
