"use client";
import React from "react";
import { UnifrakturCook } from "next/font/google";
import { Old_Standard_TT } from "next/font/google";
import { Article } from "@/data/articles";

const gothicFont = UnifrakturCook({ weight: "700", subsets: ["latin"] });
const textFont = Old_Standard_TT({ weight: "400", subsets: ["latin"] });

interface ArticleTemplateProps {
  article: Article;
}

export default function ArticleTemplate({ article }: ArticleTemplateProps) {
  const formatContent = (content: string) => {
    return content.split('\n\n').map((paragraph, index) => {
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <p key={index} className="font-semibold">
            {paragraph.slice(2, -2)}
          </p>
        );
      }
      
      if (paragraph.includes('"')) {
        const parts = paragraph.split('"');
        return (
          <p key={index}>
            {parts[0]}
            <br />
            <em>&ldquo;{parts[1]}&rdquo;</em>
            {parts[2]}
          </p>
        );
      }
      
      return <p key={index}>{paragraph}</p>;
    });
  };

  return (
    <article className="flex flex-col items-center justify-start px-4 py-12 min-h-screen">
      <h1 className={`${gothicFont.className} text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-6 text-center`}>
        {article.titulo}
      </h1>
      
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      
      <div className={`${textFont.className} max-w-3xl space-y-6 text-gray-800 text-base sm:text-lg leading-relaxed`}>
        {formatContent(article.conteudo)}
      </div>
      
      <div className="mt-8 pt-6 border-t border-gray-200 w-full max-w-3xl">
        <p className="text-sm text-gray-500 text-center">
          {article.data} — {article.autor}
        </p>
      </div>
    </article>
  );
}


