import api from '../../../lib/apiClient';
import type { Post, PostRequest } from '../types';

export interface FetchPostsParams {
  search?: string;
  sortDirection?: 'asc' | 'desc';
}

export const getPosts = async (params: FetchPostsParams): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts', { params });
  return response.data;
};

export const getPost = async (id: number): Promise<Post> => {
  const response = await api.get<Post>(`/posts/${id}`);
  return response.data;
};

export const createPost = async (payload: PostRequest): Promise<Post> => {
  const response = await api.post<Post>('/posts', payload);
  return response.data;
};

export const updatePost = async (id: number, payload: PostRequest): Promise<Post> => {
  const response = await api.put<Post>(`/posts/${id}`, payload);
  return response.data;
};

export const deletePost = async (id: number): Promise<void> => {
  await api.delete(`/posts/${id}`);
};
