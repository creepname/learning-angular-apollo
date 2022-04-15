import { Injectable } from '@angular/core';
import { gql, Query } from 'apollo-angular';
import { Post } from '../queries/posts.query';

export type PostsByAuthorIdQueryResponse = {
  postsOf: Post[];
};

@Injectable()
export class PostsByAuthorIdQuery extends Query<PostsByAuthorIdQueryResponse> {
  document = gql`
  query postsOfAuthor($authorId: Int!) {
    postsOf(authorId: $authorId) {
      id
      title
      votes
    }
  }
`;
}
