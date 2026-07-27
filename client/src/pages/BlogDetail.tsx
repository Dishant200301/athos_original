import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Mail, ChevronRight, Loader2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { getBlogById, getAllBlogs, Blog } from '@/services/blogService';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [contentRef, contentVisible] = useScrollAnimation(0.1);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [recommendedBlogs, setRecommendedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlogData();
    }
  }, [id]);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch the current blog
      const blogResponse = await getBlogById(id!);
      setBlog(blogResponse.data);

      // Fetch all blogs for recommendations
      const allBlogsResponse = await getAllBlogs({ limit: 100 });
      const otherBlogs = allBlogsResponse.data.filter(b => b._id !== id);
      setRecommendedBlogs(otherBlogs.slice(0, 3));
    } catch (err) {
      console.error('Error fetching blog:', err);
      setError('Failed to load blog. Please try again later.');
    } finally {
      setLoading(false);
    }
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

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = blog?.blogTitle || 'Athos Collagen Blog';

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'email':
        const text = `Check out this article: ${title}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
        break;
    }
  };

  const pageTitle = blog ? `${blog.blogTitle} - Athos Collagen Blog` : 'Blog Detail - Athos Collagen Pvt. Ltd';
  const pageDescription = blog?.blogExcerpt ? blog.blogExcerpt.slice(0, 160) : undefined;
  const pageOgImage = blog?.blogImageUrl ? blog.blogImageUrl : undefined;

  const blogPostingSchema = blog ? {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.blogTitle,
    image: blog.blogImageUrl ? [blog.blogImageUrl] : undefined,
    datePublished: blog.createdAt,
    description: blog.blogExcerpt,
    author: {
      '@type': 'Organization',
      name: 'Athos Collagen Pvt. Ltd',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Athos Collagen Pvt. Ltd',
      logo: {
        '@type': 'ImageObject',
        url: 'https://athoscollagen.com/images/athos_logo.webp',
      },
    },
  } : undefined;

  return (
    <div className="bg-background overflow-x-hidden w-full">
      <SEO title={pageTitle} description={pageDescription} ogImage={pageOgImage} schema={blogPostingSchema} />
      <Navbar />
      <main className="relative">
        {/* Content Section */}
        <div
          ref={contentRef}
          className={`transition-all duration-500 ease-out ${contentVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <section className="py-12 md:py-20 bg-background">
            <div className="container mx-auto px-4 lg:px-10 xl:px-32">
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
                  <Button onClick={fetchBlogData} variant="outline">
                    Try Again
                  </Button>
                </div>
              )}

              {/* Blog Content */}
              {!loading && !error && blog && (
                <div>
                  {/* Breadcrumb Navigation */}
                  <nav className="mt-8 mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 text-sm">
                      <li>
                        <Link
                          to="/"
                          className="text-gray-600 hover:text-[rgba(27, 125, 161, 1)] transition-colors"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </li>
                      <li>
                        <Link
                          to="/blog"
                          className="text-gray-600 hover:text-[rgba(27, 125, 161, 1)] transition-colors"
                        >
                          Blog
                        </Link>
                      </li>
                      <li>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </li>
                      <li>
                        <span className="text-gray-900 font-medium line-clamp-1">
                          {blog.blogTitle}
                        </span>
                      </li>
                    </ol>
                  </nav>

                  {/* Category Badge */}
                  <div className="mb-4">
                    <span
                      className="inline-block px-3 py-1 text-sm font-semibold text-white rounded-full"
                      style={{ backgroundColor: 'rgba(106, 191, 0, 1)' }}
                    >
                      {blog.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h1 className="font-medium leading-tight text-3xl sm:text-4xl md:text-5xl mb-6" style={{ color: 'rgba(29, 129, 165, 1)' }}>
                    {blog.blogTitle}
                  </h1>

                  {/* Meta Information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm mb-8 pb-8 border-b border-gray-200" style={{ color: 'rgba(67, 67, 64, 0.7)' }}>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(blog.publishedAt || blog.createdAt)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {getReadTime(blog.readingTime)}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      {blog.authorName}
                    </div>
                  </div>

                  {/* Featured Image */}
                  {blog.blogImageUrl && (
                    <div className="mb-8 aspect-video w-full rounded-lg overflow-hidden">
                      <img
                        src={blog.blogImageUrl}
                        alt={blog.blogTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Excerpt */}
                  <div className="mb-8">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {blog.blogExcerpt}
                    </p>
                  </div>

                  {/* Blog Sections */}
                  {/* Blog Content */}
                  <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed [& ul]:list-disc [& ul]:pl-5 [& ol]:list-decimal [& ol]:pl-5 [& h1]:text-3xl [& h1]:font-bold [& h1]:mb-4 [& h1]:mt-8 [& h2]:text-2xl [& h2]:font-bold [& h2]:mb-3 [& h2]:mt-6 [& h3]:text-xl [& h3]:font-bold [& h3]:mb-2 [& h3]:mt-4 [& p]:text-base [& p]:font-normal [& p]:mb-4 [& blockquote]:border-l-4 [& blockquote]:border-gray-300 [& blockquote]:pl-4 [& blockquote]:italic [& a]:text-blue-600 [& a]:hover:underline"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    {blog.content ? (
                      <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    ) : (
                      blog.blogSections?.map((section, index) => (
                        <div key={index} className="mb-8">
                          <h2 className="text-2xl font-bold mt-8 mb-4">{section.sectionTitle}</h2>
                          <p className="mb-4 whitespace-pre-wrap">{section.sectionContent}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Share Section */}
                  <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="text-xl font-semibold mb-4" style={{ color: 'rgba(29, 129, 165, 1)' }}>Share this article</h3>
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('facebook')}
                        className="flex items-center"
                      >
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('twitter')}
                        className="flex items-center"
                      >
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('linkedin')}
                        className="flex items-center"
                      >
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShare('email')}
                        className="flex items-center"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>

                  {/* Recommended Blogs Section */}
                  {recommendedBlogs.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-gray-200">
                      <h3 className="text-2xl font-semibold mb-8" style={{ color: 'rgba(29, 129, 165, 1)' }}>Recommended Articles</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {recommendedBlogs.map((recommendedPost) => (
                          <article
                            key={recommendedPost._id}
                            onClick={() => navigate(`/blog/${recommendedPost._id}`)}
                            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
                          >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                              <img
                                src={recommendedPost.blogImageUrl || '/images/athos_product.png'}
                                alt={recommendedPost.blogTitle}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>

                            {/* Content */}
                            <div className="p-4">
                              <div className="mb-2">
                                <span
                                  className="inline-block px-2 py-1 text-xs font-semibold text-white rounded-full"
                                  style={{ backgroundColor: 'rgba(106, 191, 0, 1)' }}
                                >
                                  {recommendedPost.category}
                                </span>
                              </div>
                              <h4 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[rgba(27, 125, 161, 1)] transition-colors">
                                {recommendedPost.blogTitle}
                              </h4>

                              {/* Meta Information */}
                              <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  <span>{formatDate(recommendedPost.publishedAt || recommendedPost.createdAt)}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{getReadTime(recommendedPost.readingTime)}</span>
                                </div>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[rgba(27, 125, 161, 1)] hover:text-[rgba(27, 125, 161, 0.8)] p-0 h-auto text-sm"
                              >
                                Read More →
                              </Button>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  )}
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

export default BlogDetail;

