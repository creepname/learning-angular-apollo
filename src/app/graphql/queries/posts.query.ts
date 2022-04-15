import { Injectable } from '@angular/core';
import { Query, gql } from 'apollo-angular';

export type Post = {
  id: number;
  title: string;
  votes: number;
  author: any;
};

export type PostsQueryResponse = {
  posts: Post[];
};

@Injectable()
export class PostsQuery extends Query<PostsQueryResponse> {
  document = gql`
    query allPosts {
      posts {
        id
        title
        votes
        author {
          id
          firstName
          lastName
        }
      }
    }
  `;
}
