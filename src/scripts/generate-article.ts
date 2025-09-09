#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { articles, Article } from '../data/articles';

/**
 * Gera uma página de artigo automaticamente
 */
function generateArticlePage(article: Article) {
  const template = `import React from "react";
import { getArticleBySlug } from "@/data/articles";
import ArticleTemplate from "@/app/components/ArticleTemplate";

export default function ${article.id.charAt(0).toUpperCase() + article.id.slice(1).replace(/-/g, '')}() {
  const article = getArticleBySlug("${article.id}");
  
  if (!article) {
    return <div>Artigo não encontrado</div>;
  }

  return <ArticleTemplate article={article} />;
}
`;

  const articleDir = path.join(process.cwd(), 'src', 'app', 'loucuras', article.id);
  const pagePath = path.join(articleDir, 'page.tsx');

  try {
    // Criar diretório se não existir
    if (!fs.existsSync(articleDir)) {
      fs.mkdirSync(articleDir, { recursive: true });
    }

    // Escrever arquivo da página
    fs.writeFileSync(pagePath, template);
    console.log(`✅ Página gerada: ${pagePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao gerar página para ${article.id}:`, error);
    return false;
  }
}

/**
 * Gera todas as páginas de artigos
 */
function generateAllArticlePages() {
  console.log('🚀 Gerando páginas de artigos...\n');
  
  articles.forEach(article => {
    if (article.publicado) {
      generateArticlePage(article);
    } else {
      console.log(`⏸️  Pulando artigo não publicado: ${article.titulo}`);
    }
  });
  
  console.log('\n✨ Todas as páginas foram geradas!');
}

/**
 * Gera uma página para um artigo específico
 */
function generateSpecificArticle(articleId: string) {
  const article = articles.find(a => a.id === articleId);
  
  if (!article) {
    console.error(`❌ Artigo não encontrado: ${articleId}`);
    return;
  }
  
  generateArticlePage(article);
}

// Executar script
const args = process.argv.slice(2);

if (args.length === 0) {
  generateAllArticlePages();
} else {
  generateSpecificArticle(args[0]);
}


