import { Post } from '../entities/post.entity';
import { PostDto } from './posts.dtos';

export function mapToPostDto(post: Post): PostDto {
  return {
    id: post.id,
    title: post.title,
    url: post.url,
    content: post.content,
    createdBy: {
      id: post.created_by.id,
      name: post.created_by.name,
    },
    createdAt: post.created_date,
    updatedAt: post.updated_date,
  };
}
