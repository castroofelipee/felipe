"use client";
import React from "react";
import { UnifrakturCook } from "next/font/google";
import { Old_Standard_TT } from "next/font/google";

const gothicFont = UnifrakturCook({ weight: "700", subsets: ["latin"] });
const textFont = Old_Standard_TT({ weight: "400", subsets: ["latin"] });

export default function MinimalGothicCard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className={`${gothicFont.className} text-2xl sm:text-3xl md:text-4xl text-gray-900`}>
        Escritos para minha posteridade
      </h1>
      <p className={`${textFont.className} mt-2 text-gray-700 text-sm sm:text-base md:text-lg max-w-md`}>
        Aqui eu compartilho escritos que eu pretendo ler no futuro e dar boas risadas.
      </p>
    </div>
  );
}

