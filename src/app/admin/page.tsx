"use client";

import React, { useState, useEffect } from "react";
import { articles, Article } from "@/data/articles";
import AuthGuard from "@/app/components/AuthGuard";

function AdminContent() {
  const [articlesList, setArticlesList] = useState<Article[]>(articles);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Carregar artigos da API
  const loadArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      const data = await response.json();
      setArticlesList(data);
    } catch (error) {
      console.error('Erro ao carregar artigos:', error);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setIsEditing(true);
  };

  const handleSaveArticle = async () => {
    if (!selectedArticle) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const isNewArticle = !articlesList.find(a => a.id === selectedArticle.id);
      const url = '/api/articles';
      const method = isNewArticle ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedArticle),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Artigo salvo e página gerada com sucesso!' });
        await loadArticles(); // Recarregar lista
        setIsEditing(false);
        setSelectedArticle(null);
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Erro ao salvar artigo' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNewArticle = () => {
    const newArticle: Article = {
      id: "",
      titulo: "",
      descricao: "",
      data: new Date().toLocaleDateString("pt-BR"),
      autor: "Felipe Castro",
      link: "",
      conteudo: "",
      publicado: false,
      tags: []
    };
    setSelectedArticle(newArticle);
    setIsEditing(true);
    setMessage(null);
  };

  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm('Tem certeza que deseja deletar este artigo?')) return;

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`/api/articles?id=${articleId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Artigo deletado com sucesso!' });
        await loadArticles();
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.error || 'Erro ao deletar artigo' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro de conexão' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Gerenciar Artigos
            </h1>
            <button
              onClick={handleAddNewArticle}
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? 'Carregando...' : '+ Novo Artigo'}
            </button>
          </div>

          {/* Mensagens de feedback */}
          {message && (
            <div className={`mb-4 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-600' 
                : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Artigos Existentes</h2>
              <div className="space-y-3">
                {articlesList.map((article, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 "
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                          {article.titulo}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {article.descricao}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span
                            className={`px-2 py-1 text-xs rounded ${
                              article.publicado
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {article.publicado ? "Publicado" : "Rascunho"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {article.data}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4 flex gap-2">
                        <button
                          onClick={() => handleEditArticle(article)}
                          className="btn-outline text-sm"
                          disabled={isLoading}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(article.id)}
                          className="btn-danger text-sm"
                          disabled={isLoading}
                        >
                          Deletar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {isEditing && selectedArticle && (
              <div>
                <h2 className="text-lg font-semibold mb-4">
                  {selectedArticle.id ? "Editar Artigo" : "Novo Artigo"}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={selectedArticle.titulo}
                      onChange={(e) =>
                        setSelectedArticle({
                          ...selectedArticle,
                          titulo: e.target.value,
                        })
                      }
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      value={selectedArticle.descricao}
                      onChange={(e) =>
                        setSelectedArticle({
                          ...selectedArticle,
                          descricao: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Conteúdo
                    </label>
                    <textarea
                      value={selectedArticle.conteudo}
                      onChange={(e) =>
                        setSelectedArticle({
                          ...selectedArticle,
                          conteudo: e.target.value,
                        })
                      }
                      rows={10}
                      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Digite o conteúdo do artigo aqui..."
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedArticle.publicado}
                        onChange={(e) =>
                          setSelectedArticle({
                            ...selectedArticle,
                            publicado: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Publicado</span>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveArticle}
                      className="btn-success"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Salvando...' : 'Salvar'}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setSelectedArticle(null);
                        setMessage(null);
                      }}
                      className="btn-secondary"
                      disabled={isLoading}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  return (
    <AuthGuard>
      <AdminContent />
    </AuthGuard>
  );
}


