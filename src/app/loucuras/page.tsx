"use client";

import React from "react";
import { getPublishedArticles } from "@/data/articles";

export default function EscritosSection() {
  const articles = getPublishedArticles();

  return (
    <section className="flex flex-col px-2 py-12">
      <div className="flex flex-col gap-6 w-full max-w-2xl">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.link}
            className="block p-6 rounded-lg  transition-colors"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {article.titulo}
            </h3>
            <p className="mt-1 text-gray-700 text-sm sm:text-base">
              {article.descricao}
            </p>
            <div className="mt-2 flex flex-wrap gap-2 items-center">
              <span className="text-gray-500 text-xs sm:text-sm">
                {article.data} — {article.autor}
              </span>
              {article.tags && article.tags.length > 0 && (
                <div className="flex gap-1">
                  {article.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
