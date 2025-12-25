import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'news'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles] = useState<Article[]>([]);

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const newsArticles = articles.filter(article => article.category === 'Технологии' || article.category === 'Наука');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent animate-gradient-shift bg-[length:200%_200%]" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Статьи
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'home' 
                    ? 'bg-primary/20 text-primary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name="Home" size={18} />
                <span className="font-medium">Главная</span>
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'search' 
                    ? 'bg-accent/20 text-accent' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name="Search" size={18} />
                <span className="font-medium">Поиск</span>
              </button>
              <button
                onClick={() => setActiveTab('news')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === 'news' 
                    ? 'bg-secondary/20 text-secondary' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name="Newspaper" size={18} />
                <span className="font-medium">Новости</span>
              </button>
            </nav>

            <Button 
              onClick={() => navigate('/admin')}
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
            >
              <Icon name="Settings" size={18} />
              Админ
            </Button>
          </div>

          <div className="md:hidden flex items-center gap-2 mt-4">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
                activeTab === 'home' ? 'bg-primary/20 text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Home" size={16} />
              <span className="text-sm font-medium">Главная</span>
            </button>
            <button
              onClick={() => setActiveTab('search')}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
                activeTab === 'search' ? 'bg-accent/20 text-accent' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Search" size={16} />
              <span className="text-sm font-medium">Поиск</span>
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all ${
                activeTab === 'news' ? 'bg-secondary/20 text-secondary' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Newspaper" size={16} />
              <span className="text-sm font-medium">Новости</span>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8 md:p-16 backdrop-blur-sm border border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 animate-gradient-shift bg-[length:200%_200%]" />
              <div className="relative z-10 max-w-3xl">
                <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">✨ Добро пожаловать</Badge>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Открывайте новые
                  <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                    горизонты знаний
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Коллекция статей о технологиях, дизайне и науке от ведущих экспертов индустрии
                </p>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-2xl shadow-primary/25"
                  onClick={() => setActiveTab('search')}
                >
                  Начать чтение
                  <Icon name="ArrowRight" size={18} />
                </Button>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-3xl font-bold">Популярные статьи</h3>
                <Button variant="ghost" className="text-primary hover:bg-primary/10">
                  Все статьи
                  <Icon name="ArrowRight" size={16} />
                </Button>
              </div>
              {articles.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-4">
                    <Icon name="FileText" size={40} className="text-muted-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">Статей пока нет</h4>
                  <p className="text-muted-foreground mb-6">
                    Начните публиковать статьи через админ-панель
                  </p>
                  <Button 
                    onClick={() => navigate('/admin')}
                    className="bg-gradient-to-r from-primary to-secondary"
                  >
                    Перейти в админ-панель
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <Card 
                      key={article.id} 
                      className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 animate-fade-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={article.image} 
                          alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">
                          {article.category}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {article.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Icon name="Calendar" size={14} />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Clock" size={14} />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-8 animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold mb-6 text-center">Найти статью</h2>
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск по заголовкам, описанию или категории..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg border-border/50 bg-card/50 backdrop-blur-sm focus:border-accent"
                />
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {searchQuery && (
                <p className="text-muted-foreground mb-4">
                  Найдено: <span className="text-foreground font-semibold">{filteredArticles.length}</span> {filteredArticles.length === 1 ? 'статья' : 'статей'}
                </p>
              )}
              {(searchQuery ? filteredArticles : articles).length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-4">
                    <Icon name="Search" size={40} className="text-muted-foreground" />
                  </div>
                  <h4 className="text-xl font-semibold mb-2">
                    {searchQuery ? 'Ничего не найдено' : 'Статей пока нет'}
                  </h4>
                  <p className="text-muted-foreground">
                    {searchQuery ? 'Попробуйте изменить поисковый запрос' : 'Начните публиковать статьи через админ-панель'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(searchQuery ? filteredArticles : articles).map((article, index) => (
                    <Card 
                      key={article.id}
                      className="group hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 animate-scale-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex flex-col md:flex-row gap-4 p-6">
                        <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="text-xl font-bold group-hover:text-accent transition-colors">
                              {article.title}
                            </h3>
                            <Badge variant="outline" className="flex-shrink-0">{article.category}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Icon name="Calendar" size={14} />
                              <span>{article.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Icon name="Clock" size={14} />
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <Badge className="mb-4 bg-secondary/20 text-secondary border-secondary/30">📰 Новости</Badge>
              <h2 className="text-4xl font-bold mb-4">Последние обновления</h2>
              <p className="text-lg text-muted-foreground">
                Актуальные новости из мира технологий и науки
              </p>
            </div>

            {newsArticles.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-4">
                  <Icon name="Newspaper" size={40} className="text-muted-foreground" />
                </div>
                <h4 className="text-xl font-semibold mb-2">Новостей пока нет</h4>
                <p className="text-muted-foreground">
                  Добавьте статьи с категориями "Технологии" или "Наука"
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {newsArticles.map((article, index) => (
                  <Card 
                    key={article.id}
                    className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-secondary/50 transition-all duration-300 hover:shadow-xl hover:shadow-secondary/10 hover:-translate-y-1 animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-secondary/90 backdrop-blur-sm">
                        {article.category}
                      </Badge>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                          {article.title}
                        </h3>
                      </div>
                    </div>
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Icon name="Calendar" size={14} />
                            <span>{article.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Clock" size={14} />
                            <span>{article.readTime}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-secondary hover:bg-secondary/10">
                          Читать
                          <Icon name="ArrowRight" size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent animate-gradient-shift bg-[length:200%_200%]" />
                <h3 className="text-xl font-bold">Статьи</h3>
              </div>
              <p className="text-muted-foreground">
                Платформа для публикации и чтения статей о технологиях, дизайне и науке
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Разделы</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="hover:text-primary transition-colors cursor-pointer">Главная</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Поиск</li>
                <li className="hover:text-primary transition-colors cursor-pointer">Новости</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Категории</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-colors">Технологии</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-colors">Дизайн</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-colors">Наука</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-primary/10 hover:border-primary transition-colors">Искусство</Badge>
              </div>
            </div>
          </div>
          <div className="border-t border-border/40 mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2024 Статьи. Современная платформа для публикации контента</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
