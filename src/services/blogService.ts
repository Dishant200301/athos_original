import axios from 'axios';
import { API_BASE_URL } from '@/lib/apiConfig';

export interface BlogSection {
  sectionTitle: string;
  sectionContent: string;
}

export interface Blog {
  _id: string;
  blogTitle: string;
  slug: string;
  authorName: string;
  category: string;
  blogExcerpt: string;
  blogImageUrl?: string;
  readingTime?: number;
  content?: string;
  blogSections: BlogSection[];
  isPublished: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogsResponse {
  success: boolean;
  data: Blog[];
  pagination: {
    currentPage: number;
    totalPages: number;
    total: number;
    limit: number;
  };
}

export interface SingleBlogResponse {
  success: boolean;
  data: Blog;
}

// Get all published blogs
export const getAllBlogs = async (params?: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}): Promise<BlogsResponse> => {
  const queryParams = new URLSearchParams({
    isPublished: 'true',
    ...(params?.category && { category: params.category }),
    ...(params?.search && { search: params.search }),
    ...(params?.page && { page: params.page.toString() }),
    ...(params?.limit && { limit: params.limit.toString() }),
  });

  const response = await axios.get<BlogsResponse>(
    `${API_BASE_URL}/blogs?${queryParams.toString()}`
  );
  return response.data;
};

// Get single blog by ID
export const getBlogById = async (id: string): Promise<SingleBlogResponse> => {
  const response = await axios.get<SingleBlogResponse>(
    `${API_BASE_URL}/blogs/${id}`
  );
  return response.data;
};

// Get blog by slug
export const getBlogBySlug = async (slug: string): Promise<SingleBlogResponse> => {
  const response = await axios.get<SingleBlogResponse>(
    `${API_BASE_URL}/blogs/slug/${slug}`
  );
  return response.data;
};

// Get unique categories from blogs
export const getCategories = async (): Promise<string[]> => {
  const response = await getAllBlogs({ limit: 1000 });
  const categories = Array.from(new Set(response.data.map(blog => blog.category)));
  return categories;
};
