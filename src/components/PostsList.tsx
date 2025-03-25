'use client';

import { useState } from 'react';
import { useGetFilteredPostsQuery } from '@/services/api';
import { 
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Skeleton,
  Alert,
  AlertDescription,
  Badge,
  ScrollArea,
  Button
} from '@/components/ui';
import { 
  Search, 
  LayoutGrid,
  LayoutList,
  Sparkles
} from 'lucide-react';

export default function PostsList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const { data: posts, isLoading, error } = useGetFilteredPostsQuery(searchQuery);

  if (isLoading) {
    return (
      <div className="space-y-8 p-6">
        <div className="flex items-center space-x-4 max-w-md mx-auto">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-24" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-2xl mx-auto m-6">
        <AlertDescription>
          {'error' in error ? error.error : 'An error occurred while fetching posts'}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-2rem)]">
      <div className="space-y-8 p-6">
        {/* Search Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-6 px-4 rounded-xl shadow-sm border border-border/50">
          <div className="max-w-7xl mx-auto space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="h-10 px-6 flex items-center gap-2 bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 hover:bg-indigo-500/20 dark:hover:bg-indigo-500/30">
                  <Sparkles className="h-4 w-4" />
                  {posts?.length || 0} Posts
                </Badge>
                <div className="flex items-center gap-2 border rounded-lg p-1">
                  <Button
                    variant={isGridView ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setIsGridView(true)}
                    className="h-8 w-8"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={!isGridView ? "secondary" : "ghost"}
                    size="icon"
                    onClick={() => setIsGridView(false)}
                    className="h-8 w-8"
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid/List */}
        <div className={`max-w-7xl mx-auto ${
          isGridView 
            ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
            : "flex flex-col gap-4"
        }`}>
          {posts?.map((post, index) => (
            <Card 
              key={post.id} 
              className={`group relative overflow-hidden transition-all duration-300 border-border/50 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/10 ${
                !isGridView ? "flex flex-row" : ""
              }`}
            >
              {/* Accent gradient */}
              <div className={`absolute ${!isGridView ? "left-0 top-0 h-full w-1" : "top-0 left-0 w-full h-1"} 
                bg-gradient-to-r from-violet-500 via-indigo-500 to-purple-500 opacity-70`} 
              />
              
              {/* Card Content */}
              <div className={`flex-1 ${!isGridView ? "flex flex-row items-start gap-4 py-4 pl-4" : ""}`}>
                <div className={`${!isGridView ? "flex-1" : ""} relative`}>
                  <CardHeader className={`pb-4 ${!isGridView ? "p-0" : ""}`}>
                    <CardTitle className={`text-xl font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 ${
                      isGridView ? "line-clamp-2" : "line-clamp-1"
                    }`}>
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className={!isGridView ? "p-0" : ""}>
                    <div className={`text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/90 transition-colors duration-300 ${
                      isGridView ? "line-clamp-4" : "line-clamp-2"
                    }`}>
                      {post.body}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {posts?.length === 0 && (
          <Alert>
            <AlertDescription className="text-center">
              No posts found matching your search.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </ScrollArea>
  );
}