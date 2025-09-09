import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { articles, Article } from '@/data/articles';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

// Função para salvar artigos no arquivo
function saveArticles(updatedArticles: Article[]) {
  const filePath = path.join(process.cwd(), 'src', 'data', 'articles.ts');
  
  const fileContent = `export interface Article {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  autor: string;
  link: string;
  conteudo: string;
  publicado: boolean;
  tags?: string[];
}

export const articles: Article[] = ${JSON.stringify(updatedArticles, null, 2)};

export function getPublishedArticles(): Article[] {
  return articles.filter(article => article.publicado);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(article => article.id === id);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.link === \`/loucuras/\${slug}\`);
}
`;

  fs.writeFileSync(filePath, fileContent, 'utf8');
}

// Função para gerar página do artigo automaticamente
async function generateArticlePage(articleId: string) {
  try {
    console.log(`🔄 Gerando página para artigo: ${articleId}`);
    const { stdout, stderr } = await execAsync(`npm run new-article ${articleId}`);
    
    if (stdout.includes('✅')) {
      console.log(`✅ Página gerada com sucesso para: ${articleId}`);
    } else {
      console.log(`📄 Página processada para: ${articleId}`, stdout);
    }
    
    if (stderr && !stderr.includes('warn')) {
      console.error(`⚠️ Aviso ao gerar página para ${articleId}:`, stderr);
    }
  } catch (error) {
    console.error(`❌ Erro ao gerar página para ${articleId}:`, error);
    // Não falha a operação principal, apenas loga o erro
  }
}

// GET - Buscar todos os artigos
export async function GET() {
  return NextResponse.json(articles);
}

// POST - Criar novo artigo
export async function POST(request: NextRequest) {
  try {
    const newArticle: Article = await request.json();
    
    // Validar dados obrigatórios
    if (!newArticle.titulo || !newArticle.conteudo) {
      return NextResponse.json(
        { error: 'Título e conteúdo são obrigatórios' },
        { status: 400 }
      );
    }

    // Gerar ID se não fornecido
    if (!newArticle.id) {
      newArticle.id = newArticle.titulo
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .trim();
    }

    // Gerar link se não fornecido
    if (!newArticle.link) {
      newArticle.link = `/loucuras/${newArticle.id}`;
    }

    // Adicionar data atual se não fornecida
    if (!newArticle.data) {
      newArticle.data = new Date().toLocaleDateString('pt-BR');
    }

    // Adicionar autor padrão se não fornecido
    if (!newArticle.autor) {
      newArticle.autor = 'Felipe Castro';
    }

    // Verificar se ID já existe
    const existingArticle = articles.find(article => article.id === newArticle.id);
    if (existingArticle) {
      return NextResponse.json(
        { error: 'Já existe um artigo com este ID' },
        { status: 400 }
      );
    }

    // Adicionar novo artigo
    const updatedArticles = [...articles, newArticle];
    saveArticles(updatedArticles);

    // Gerar página automaticamente (sempre, independente do status)
    await generateArticlePage(newArticle.id);

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// PUT - Atualizar artigo existente
export async function PUT(request: NextRequest) {
  try {
    const updatedArticle: Article = await request.json();
    
    // Validar dados obrigatórios
    if (!updatedArticle.id || !updatedArticle.titulo || !updatedArticle.conteudo) {
      return NextResponse.json(
        { error: 'ID, título e conteúdo são obrigatórios' },
        { status: 400 }
      );
    }

    // Encontrar índice do artigo
    const articleIndex = articles.findIndex(article => article.id === updatedArticle.id);
    
    if (articleIndex === -1) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    // Atualizar artigo
    const updatedArticles = [...articles];
    updatedArticles[articleIndex] = updatedArticle;
    saveArticles(updatedArticles);

    // Gerar página automaticamente (sempre, independente do status)
    await generateArticlePage(updatedArticle.id);

    return NextResponse.json(updatedArticle);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// DELETE - Deletar artigo
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID do artigo é obrigatório' },
        { status: 400 }
      );
    }

    // Remover artigo
    const updatedArticles = articles.filter(article => article.id !== id);
    
    if (updatedArticles.length === articles.length) {
      return NextResponse.json(
        { error: 'Artigo não encontrado' },
        { status: 404 }
      );
    }

    saveArticles(updatedArticles);

    return NextResponse.json({ message: 'Artigo deletado com sucesso' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
