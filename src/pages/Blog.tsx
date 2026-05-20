import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, User, Loader2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { useTranslation } from 'react-i18next';
import { getAllBlogs, Blog as BlogType } from '@/services/blogService';

const Blog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [blogsRef, blogsVisible] = useScrollAnimation(0.1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Blogs - Athos Collagen Pvt. Ltd';
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getAllBlogs({ limit: 100 });
      setBlogs(response.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Extract unique categories from fetched blogs
  const categories = ['All', ...Array.from(new Set(blogs.map(blog => blog.category)))];

  // Filter posts by category
  const filteredPosts = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory);

  const handleBlogClick = (blogId: string) => {
    navigate(`/blog/${blogId}`);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadTime = (readingTime?: number) => {
    if (!readingTime) return '5 min read';
    return `${readingTime} min read`;
  };

  return (
    <div className="bg-background overflow-x-hidden w-full">
      <Navbar />
      <main className="relative">
        {/* Blog Posts Section */}
        <div
          ref={blogsRef}
          className={`transition-all duration-500 ease-out ${blogsVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 xl:px-32">
              {/* Page Heading */}
              <div className="text-center mb-12">
                <h1 className="font-medium leading-tight text-3xl sm:text-4xl md:text-5xl mb-4" style={{ color: 'rgba(29, 129, 165, 1)' }}>
                  {t('blog.title')}
                </h1>
                <p className="text-lg md:text-xl max-w-3xl mx-auto" style={{ color: 'rgba(67, 67, 64, 0.8)' }}>
                  {t('blog.subtitle')}
                </p>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${selectedCategory === category
                        ? 'bg-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                        }`}
                      style={
                        selectedCategory === category
                          ? { color: 'rgba(106, 191, 0, 1)', border: '2px solid rgba(106, 191, 0, 1)' }
                          : {}
                      }
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loading State */}
              {loading && (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-12 w-12 animate-spin text-[rgba(27, 125, 161, 1)]" />
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="text-center py-20">
                  <p className="text-red-500 text-lg mb-4">{error}</p>
                  <Button onClick={fetchBlogs} variant="outline">
                    Try Again
                  </Button>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && filteredPosts.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-gray-500 text-lg">No blogs found.</p>
                </div>
              )}

              {/* Blog Grid */}
              {!loading && !error && filteredPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {filteredPosts.map((post) => (
                    <article
                      key={post._id}
                      onClick={() => handleBlogClick(post._id)}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                    >
                      {/* Image */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={post.blogImageUrl || '/images/athos_product.png'}
                          alt={post.blogTitle}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h2 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-[rgba(27, 125, 161, 1)] transition-colors">
                          {post.blogTitle}
                        </h2>

                        {/* Meta Information */}
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{formatDate(post.publishedAt || post.createdAt)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{getReadTime(post.readingTime)}</span>
                          </div>
                        </div>

                        {/* Author */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-1 text-gray-400" />
                            <span className="text-xs text-gray-600">{post.authorName.split(' ')[0]}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[rgba(27, 125, 161, 1)] hover:text-[rgba(27, 125, 161, 0.8)] group-hover:translate-x-1 transition-transform h-7 px-2 text-xs"
                          >
                            {t('blog.readMore')} <ArrowRight className="h-3 w-3 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;

