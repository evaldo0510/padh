import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Filter, Calendar, User, Heart, Download, Upload, Bookmark, Star } from 'lucide-react';

interface LibraryItem {
  id: string;
  title: string;
  type: 'chapter' | 'tool' | 'poem' | 'reflection';
  content: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
  favorite: boolean;
}

const libraryItems: LibraryItem[] = [
  {
    id: '1',
    title: 'Capítulo 1 - A cela invisível',
    type: 'chapter',
    content: 'Me disseram que eu era livre, mas meus passos não sabiam pra onde ir...',
    author: 'Liberdade Interior',
    date: '2024-01-15',
    category: 'Autoconhecimento',
    tags: ['liberdade', 'autoconhecimento', 'prisão interior'],
    favorite: true
  },
  {
    id: '2',
    title: 'Poema-Funil',
    type: 'tool',
    content: 'Ferramenta P.A.D.H. para indução progressiva através da poesia...',
    author: 'Ferramentas P.A.D.H.',
    date: '2024-01-12',
    category: 'Metodologia',
    tags: ['hipnose', 'poesia', 'terapia'],
    favorite: false
  },
  {
    id: '3',
    title: 'Nas Mãos do Criador',
    type: 'poem',
    content: 'Quando a tempestade rugir e o medo tentar me vencer...',
    author: 'Evaldo Poeta',
    date: '2024-01-10',
    category: 'Fé',
    tags: ['fé', 'esperança', 'proteção divina'],
    favorite: true
  },
  {
    id: '4',
    title: 'Reflexão sobre o Perdão',
    type: 'reflection',
    content: 'O perdão não é sobre esquecer, mas sobre libertar o coração...',
    author: 'Diário Espiritual',
    date: '2024-01-08',
    category: 'Reflexão',
    tags: ['perdão', 'cura interior', 'libertação'],
    favorite: false
  }
];

const typeColors = {
  chapter: 'spiritual-chip-amber',
  tool: 'spiritual-chip-violet',
  poem: 'spiritual-chip-violet',
  reflection: 'spiritual-chip-muted'
};

const typeNames = {
  chapter: 'Capítulo',
  tool: 'Ferramenta',
  poem: 'Poema',
  reflection: 'Reflexão'
};

const typeIcons = {
  chapter: <BookOpen className="h-4 w-4" />,
  tool: <Star className="h-4 w-4" />,
  poem: <Heart className="h-4 w-4" />,
  reflection: <Bookmark className="h-4 w-4" />
};

export const BibliotecaDigital = () => {
  const [items] = useState<LibraryItem[]>(libraryItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<LibraryItem | null>(items[0]);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === 'all' || item.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  const handleExport = () => {
    // In a real app, this would export the library to a file
    console.log('Exporting library...');
  };

  const handleImport = () => {
    // In a real app, this would open a file picker
    console.log('Importing content...');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="gradient-spiritual text-white border-0 shadow-strong">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-4">
            <BookOpen className="h-12 w-12 animate-gentle-bounce" />
          </div>
          <CardTitle className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Biblioteca Digital
          </CardTitle>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Seu acervo completo de capítulos, ferramentas, poemas e reflexões organizados e acessíveis
          </p>
        </CardHeader>
      </Card>

      {/* Search and Filters */}
      <Card className="shadow-medium">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por título, conteúdo ou tags..."
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('all')}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Todos
              </Button>
              <Button
                variant={selectedType === 'chapter' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('chapter')}
                className="flex items-center gap-2"
              >
                {typeIcons.chapter}
                Capítulos
              </Button>
              <Button
                variant={selectedType === 'tool' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('tool')}
                className="flex items-center gap-2"
              >
                {typeIcons.tool}
                Ferramentas
              </Button>
              <Button
                variant={selectedType === 'poem' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('poem')}
                className="flex items-center gap-2"
              >
                {typeIcons.poem}
                Poemas
              </Button>
              <Button
                variant={selectedType === 'reflection' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedType('reflection')}
                className="flex items-center gap-2"
              >
                {typeIcons.reflection}
                Reflexões
              </Button>
            </div>

            {/* Import/Export */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleImport}>
                <Upload className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Items List */}
        <Card className="lg:col-span-1 glass-morphism border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl font-heading flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-spiritual-indigo" />
              Conteúdos ({filteredItems.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[600px] overflow-y-auto">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-lg cursor-pointer transition-smooth border ${
                  selectedItem?.id === item.id 
                    ? 'bg-primary/10 border-primary shadow-soft' 
                    : 'bg-muted/30 border-transparent hover:bg-muted/50'
                }`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {typeIcons[item.type]}
                    <Badge variant="spiritual" className={`text-xs ${typeColors[item.type]}`}>
                      {typeNames[item.type]}
                    </Badge>
                  </div>
                  {item.favorite && (
                    <Heart className="h-4 w-4 text-spiritual-rose fill-spiritual-rose" />
                  )}
                </div>
                
                <h4 className="font-heading font-semibold text-sm mb-1 line-clamp-2">{item.title}</h4>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{item.content}</p>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {item.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(item.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.slice(0, 2).map((tag, index) => (
                    <span key={index} className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                  {item.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{item.tags.length - 2}</span>
                  )}
                </div>
              </div>
            ))}

            {filteredItems.length === 0 && (
              <div className="text-center py-8">
                <Search className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                <p className="text-muted-foreground">Nenhum item encontrado</p>
                <p className="text-xs text-muted-foreground mt-1">Tente ajustar os filtros ou termos de busca</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Item Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedItem ? (
            <>
              <Card className="shadow-medium">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        {typeIcons[selectedItem.type]}
                        <Badge variant="spiritual" className={typeColors[selectedItem.type]}>
                          {typeNames[selectedItem.type]}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{selectedItem.category}</span>
                        {selectedItem.favorite && (
                          <Heart className="h-5 w-5 text-spiritual-rose fill-spiritual-rose" />
                        )}
                      </div>
                      
                      <CardTitle className="text-3xl font-heading text-primary">
                        {selectedItem.title}
                      </CardTitle>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {selectedItem.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(selectedItem.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`bg-gradient-to-br from-${selectedItem.type === 'chapter' ? 'primary' : selectedItem.type === 'tool' ? 'spiritual-violet' : selectedItem.type === 'poem' ? 'secondary' : 'spiritual-indigo'}/5 to-${selectedItem.type === 'chapter' ? 'primary' : selectedItem.type === 'tool' ? 'spiritual-violet' : selectedItem.type === 'poem' ? 'secondary' : 'spiritual-indigo'}/10 border-l-4 border-${selectedItem.type === 'chapter' ? 'primary' : selectedItem.type === 'tool' ? 'spiritual-violet' : selectedItem.type === 'poem' ? 'secondary' : 'spiritual-indigo'} rounded-lg p-6`}>
                    {selectedItem.type === 'poem' ? (
                      <blockquote className="poem-text text-foreground whitespace-pre-line">
                        {selectedItem.content}
                      </blockquote>
                    ) : (
                      <p className="text-lg leading-relaxed">{selectedItem.content}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Tags and Metadata */}
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Tags:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Categoria:</span>
                        <p className="font-semibold">{selectedItem.category}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Tipo:</span>
                        <p className="font-semibold">{typeNames[selectedItem.type]}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Data:</span>
                        <p className="font-semibold">
                          {new Date(selectedItem.date).toLocaleDateString('pt-BR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="shadow-medium">
              <CardContent className="p-12 text-center">
                <BookOpen className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h3 className="text-xl font-heading font-semibold text-muted-foreground mb-2">
                  Selecione um item
                </h3>
                <p className="text-muted-foreground">
                  Escolha um conteúdo da lista ao lado para visualizar seus detalhes
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};