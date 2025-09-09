import React from "react";
import { getArticleBySlug } from "@/data/articles";
import ArticleTemplate from "@/app/components/ArticleTemplate";

export default function Oserrosdacaminhada() {
  const article = getArticleBySlug("os-erros-da-caminhada");
  
  if (!article) {
    return <div>Artigo não encontrado</div>;
  }

  return <ArticleTemplate article={article} />;
}
