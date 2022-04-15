import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { PostsQuery, PostsQueryResponse } from 'src/app/graphql/queries/posts.query';
import { PostsByAuthorIdQuery } from 'src/app/graphql/queries/posts-by-author-id.query';
import { UpvotePostMutation } from 'src/app/graphql/mutations/upvote-post.mutation';
import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing';
import { ApolloQueryResult } from '@apollo/client/core/types';
import { of } from 'rxjs';

const postsMock = [
  {
    id: 0,
    title: 'Some post',
    votes: 5,
    author: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe'
    }
  }
];

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let controller: ApolloTestingController;
  let component: AppComponent;
  let postsQuery: PostsQuery;
  let postsByAuthorIdQuery: PostsByAuthorIdQuery;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ApolloTestingModule],
      declarations: [AppComponent],
      providers: [PostsQuery, PostsByAuthorIdQuery, UpvotePostMutation]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    postsQuery = TestBed.inject(PostsQuery);
    postsByAuthorIdQuery = TestBed.inject(PostsByAuthorIdQuery);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    // checks that we don’t have outstanding connections
    controller.verify();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('fetchPosts', () => {
    it('should call postQuery', () => {
      spyOn(postsQuery, 'watch').and.returnValue({
        valueChanges: of({})
      } as any);

      component.fetchPosts();

      expect(postsQuery.watch).toHaveBeenCalled();
    });

    it('expect and answer', (done: DoneFn) => {
      // Call the Apollo method you want to test
      component.fetchPosts().subscribe((result: ApolloQueryResult<PostsQueryResponse>) => {
        expect(result.data.posts.length).toEqual(1);
        expect(result.data.posts[0].title).toEqual('Some post');
        done();
      });

      // expectOne() accept the query itself and will return TestOperation
      controller
        .expectOne(postsQuery.document)
        .flush({
          data: { posts: postsMock }
        });

      // checks that we don’t have outstanding connections
      controller.verify();
    });
  });
});
