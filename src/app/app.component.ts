import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { PostsQuery, PostsQueryResponse } from './graphql/queries/posts.query';
import { UpvotePostMutation } from './graphql/mutations/upvote-post.mutation';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { PostsByAuthorIdQuery, PostsByAuthorIdQueryResponse } from 'src/app/graphql/queries/posts-by-author-id.query';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { ApolloError } from '@apollo/client/core';

// @UntilDestroy()
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  postsLoading$: Observable<boolean> = of(true);
  posts$: Observable<PostsQueryResponse['posts']> | undefined;
  postsByAuthorId$: Observable<PostsByAuthorIdQueryResponse['postsOf']> | undefined;

  constructor(
    private readonly postsQuery: PostsQuery,
    private readonly upvotePostMutation: UpvotePostMutation,
    private readonly postsByAuthorIdQuery: PostsByAuthorIdQuery
  ) {}

  ngOnInit(): void {
    const postsQuery$ = this.fetchPosts();

    this.postsLoading$ = postsQuery$
      .pipe(map((result: ApolloQueryResult<PostsQueryResponse>) => result.loading));
    this.posts$ = postsQuery$
      .pipe(map((result: ApolloQueryResult<PostsQueryResponse>) => result?.data?.posts));
    this.postsByAuthorId$ = this.postsByAuthorIdQuery.watch({ authorId: 3 })
      .valueChanges
      .pipe(map((result: any) => result?.data?.postsOf));
  }

  ngOnDestroy(): void {}

  fetchPosts(): Observable<ApolloQueryResult<PostsQueryResponse>> {
    return this.postsQuery
      .watch({}, { errorPolicy: 'all' })
      .valueChanges
      .pipe(shareReplay(1));
  }

  likePost(postId: number): void {
    this.upvotePostMutation
      .mutate({ postId })
      .pipe(
        catchError((error: ApolloError) => throwError(error))
        // untilDestroyed(this)
      )
      .subscribe();
  }
}
