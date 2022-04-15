import { Injectable } from '@angular/core';
import { Mutation, gql } from 'apollo-angular';
import { Post } from '../queries/posts.query';

export type UpvotePostMutationResponse = {
  post: Post;
};

@Injectable()
export class UpvotePostMutation extends Mutation<UpvotePostMutationResponse> {
  document = gql`
    mutation upvotePost($postId: Int!) {
      upvotePost(postId: $postId) {
        id
        votes
      }
    }
  `;
}
