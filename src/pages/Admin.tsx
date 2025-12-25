import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
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

const Admin = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [newArticle, setNewArticle] = useState({
    title: '',
    excerpt: '',
    category: '',
    image: ''
  });

  const handlePublish = () => {
    if (newArticle.title && newArticle.excerpt && newArticle.category) {
      const article: Article = {
        id: articles.length + 1,
        title: newArticle.title,
        excerpt: newArticle.excerpt,
        category: newArticle.category,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
        readTime: '5 мин',
        image: newArticle.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80'
      };
      setArticles([article, ...articles]);
      setNewArticle({ title: '', excerpt: '', category: '', image: '' });
    }
  };

  const handleDelete = (id: number) => {
    setArticles(articles.filter(article => article.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="hover:bg-muted/50"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent animate-gradient-shift bg-[length:200%_200%]" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Админ-панель
                </h1>
              </div>
            </div>
            
            <Badge variant="outline" className="gap-2">
              <Icon name="FileText" size={14} />
              {articles.length} {articles.length === 1 ? 'статья' : 'статей'}
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="PenSquare" size={20} />
                  Новая статья
                </CardTitle>
                <CardDescription>Заполните форму для публикации</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Заголовок</Label>
                  <Input
                    id="title"
                    placeholder="Введите заголовок статьи"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Input
                    id="category"
                    placeholder="Технологии, Дизайн, Наука..."
                    value={newArticle.category}
                    onChange={(e) => setNewArticle({ ...newArticle, category: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Краткое описание</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Опишите о чем ваша статья"
                    value={newArticle.excerpt}
                    onChange={(e) => setNewArticle({ ...newArticle, excerpt: e.target.value })}
                    className="mt-2 min-h-[120px]"
                  />
                </div>
                <div>
                  <Label htmlFor="image">URL изображения (опционально)</Label>
                  <Input
                    id="image"
                    placeholder="https://example.com/image.jpg"
                    value={newArticle.image}
                    onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <Button 
                  onClick={handlePublish}
                  className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  disabled={!newArticle.title || !newArticle.excerpt || !newArticle.category}
                >
                  <Icon name="Send" size={18} />
                  Опубликовать
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Опубликованные статьи</h2>
            </div>

            {articles.length === 0 ? (
              <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted/50 mb-4">
                    <Icon name="FileText" size={40} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Статей пока нет</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    Начните с создания первой статьи через форму слева
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {articles.map((article, index) => (
                  <Card 
                    key={article.id}
                    className="group border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 animate-fade-up"
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
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                              {article.title}
                            </h3>
                            <Badge variant="outline" className="mb-2">{article.category}</Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(article.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                        </div>
                        <p className="text-muted-foreground line-clamp-2">{article.excerpt}</p>
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
      </main>

      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>Админ-панель для управления статьями</p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;
