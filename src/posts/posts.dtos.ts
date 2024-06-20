import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  url: string;
  @IsString()
  @IsNotEmpty()
  content: string;
}

interface PostAuthor {
  id: number;
  name: string;
}

export interface PostDto {
  id: number;
  title: string;
  url: string;
  content: string;
  createdBy: PostAuthor;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface PostsPageDto {
  data: PostDto[];
  totalElements: number;
  totalPages: number;
  pageNumber: number;
  isFirst: boolean;
  isLast: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}
