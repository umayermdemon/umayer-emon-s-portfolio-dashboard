export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  summary: string;
  coverImage: string;
  author: string;
  authorAvatar: string;
  tags: string[];
  category: string;
  published: boolean;
  views: number;
  likes: number;
  commentsCount: number;
  isDeleted: boolean;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  createdAt: string;
  updatedAt: string;
}
