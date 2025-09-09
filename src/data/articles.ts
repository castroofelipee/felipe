export interface Article {
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

export const articles: Article[] = [
  {
    "id": "os-erros-da-caminhada",
    "titulo": "Os erros da caminhada",
    "descricao": "No fim, viver é arriscar. E arriscar quase sempre significa errar. [...] Faça um favor a você mesmo e erre agora mesmo, só não fique parado com medo",
    "data": "08/09/2025",
    "autor": "Felipe Castro",
    "link": "/loucuras/os-erros-da-caminhada",
    "publicado": true,
    "tags": [
      "reflexão",
      "vida",
      "erro"
    ],
    "conteudo": "Tenho um diário onde anoto meus erros. Na terceira página, escrevi sobre a primeira vez que tropecei em público. Parece pequeno, mas lembro da vergonha que carreguei por semanas. Hoje, cada vez que subo uma escada, seguro o corrimão.\n\nPor muito tempo, achei que escrever sobre meus erros seria uma forma de me proteger deles. Mas a verdade é que isso me tornou escravo de uma ilusão: a de que é possível não errar. Viver assim é caminhar em constante vigília, sempre em alerta, sempre com medo de cair. É como se a vida se tornasse um campo minado em vez de um campo aberto.\n\nA sociedade nos ensina a temer o erro, como se fosse uma marca eterna. Mas Kierkegaard já dizia: a angústia é o próprio chamado da liberdade. O erro é o preço que se paga por ser livre. Não errar seria, no fundo, não viver.\n\nUm senhor que sempre encontro na igreja costuma me dizer: \n\"Queria ter tua idade de novo, assim eu poderia errar mais sem medo.\"\n\nEstou na casa dos 20, mas às vezes, por medo de errar, me sentencio a casa dos 60.\n\nQuando eu penso em erro, não falo dos erros que ferem a alma ou machucam outros. Esses pedem arrependimento e mudança. Falo dos erros que moldam, do tropeço que nos arranca da ilusão de perfeição. É a imperfeição que nos aproxima do que chamamos de perfeição, não por sermos impecáveis, mas por sermos humanos.\n\nA primeira reunião que eu fiz em inglês, desliguei a chamada na cara do gringo por puro medo de errar alguma palavra inglês. Outras vezes, nem apareci na chamada. Isso me afastou da vida que eu queria ter em pelo menos 9 meses.\n\nEste texto mesmo, reescrevi três vezes em duas semanas. Medo de não ficar bom, medo de ninguém ler. Porém, o único erro seria não escrever.\n\nNo fim, viver é arriscar. E arriscar quase sempre significa errar.\n\n**Quer aproveitar essa experiência que se chama vida? Faça um favor a você mesmo e erre agora mesmo, só não fique parado com medo.**"
  },
  {
    "id": "sobre-a-ia-desgracada",
    "titulo": "Eu quero que a IA roube o meu emprego!",
    "descricao": "Não leia! Ainda estou escrevendo.",
    "data": "08/09/2025",
    "autor": "Felipe Castro",
    "link": "/loucuras/sobre-a-ia-desgracada",
    "publicado": false,
    "tags": [
      "tecnologia",
      "IA",
      "futuro"
    ],
    "conteudo": "Conteúdo em desenvolvimento..."
  },
  {
    "id": "sobre-amor",
    "titulo": "Sobre amar, mesmo quando não há incentivos",
    "descricao": "Não leia! Ainda estou escrevendo.",
    "data": "08/09/2025",
    "autor": "Felipe Castro",
    "link": "/loucuras/sobre-amor",
    "publicado": false,
    "tags": [
      "amor",
      "relacionamentos",
      "vida"
    ],
    "conteudo": "Conteúdo em desenvolvimento..."
  } 
];

export function getPublishedArticles(): Article[] {
  return articles.filter(article => article.publicado);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find(article => article.id === id);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(article => article.link === `/loucuras/${slug}`);
}
