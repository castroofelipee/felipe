"use client";
import React from "react";
import { UnifrakturCook } from "next/font/google";
import { Old_Standard_TT } from "next/font/google";

const gothicFont = UnifrakturCook({ weight: "700", subsets: ["latin"] });
const textFont = Old_Standard_TT({ weight: "400", subsets: ["latin"] });

export default function ArtigoErro() {
  return (
    <article className="flex flex-col items-center justify-start px-4 py-12  min-h-screen">
      <h1 className={`${gothicFont.className} text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6 text-center`}>
        Os erros da caminhada
      </h1>
      <div className={`${textFont.className} max-w-3xl space-y-6 text-gray-800 text-base sm:text-lg leading-relaxed`}>
        <p>
          Tenho um diário onde anoto meus erros. Na terceira página, escrevi sobre a primeira vez que tropecei em público. Parece pequeno, mas lembro da vergonha que carreguei por semanas. Hoje, cada vez que subo uma escada, seguro o corrimão.
        </p>
        <p>
          Por muito tempo, achei que escrever sobre meus erros seria uma forma de me proteger deles. Mas a verdade é que isso me tornou escravo de uma ilusão: a de que é possível não errar. Viver assim é caminhar em constante vigília, sempre em alerta, sempre com medo de cair. É como se a vida se tornasse um campo minado em vez de um campo aberto.
        </p>
        <p>
          A sociedade nos ensina a temer o erro, como se fosse uma marca eterna. Mas Kierkegaard já dizia: a angústia é o próprio chamado da liberdade. O erro é o preço que se paga por ser livre. Não errar seria, no fundo, não viver.
        </p>
        <p>
          Um senhor que sempre encontro na igreja costuma me dizer: <br />
          <em>&ldquo;Queria ter tua idade de novo, assim eu poderia errar mais sem medo.&rdquo;</em>
        </p>
        <p>
          Estou na casa dos 20, mas às vezes, por medo de errar, me sentencio a casa dos 60.
        </p>
        <p>
          Quando eu penso em erro, não falo dos erros que ferem a alma ou machucam outros. Esses pedem arrependimento e mudança. Falo dos erros que moldam, do tropeço que nos arranca da ilusão de perfeição. É a imperfeição que nos aproxima do que chamamos de perfeição, não por sermos impecáveis, mas por sermos humanos.
        </p>
        <p>
          A primeira reunião que eu fiz em inglês, desliguei a chamada na cara do gringo por puro medo de errar alguma palavra inglês. Outras vezes, nem apareci na chamada. Isso me afastou da vida que eu queria ter em pelo menos 9 meses.
        </p>
        <p>
          Este texto mesmo, reescrevi três vezes em duas semanas. Medo de não ficar bom, medo de ninguém ler. Porém, o único erro seria não escrever.
        </p>
        <p>
          No fim, viver é arriscar. E arriscar quase sempre significa errar.
        </p>
        <p className="font-semibold">
          Quer aproveitar essa experiência que se chama vida? Faça um favor a você mesmo e erre agora mesmo, só não fique parado com medo.
        </p>
      </div>
    </article>
  );
}
