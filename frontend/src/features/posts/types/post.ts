export interface Post {
  id: number;
  name: string;
  description: string;
  imageUrl?: string | null;
}

export interface PostRequest {
  name: string;
  description: string;
  imageUrl?: string | null;
}
