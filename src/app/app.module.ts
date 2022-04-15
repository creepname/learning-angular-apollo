import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PostsQuery } from './graphql/queries/posts.query';
import { Apollo } from 'apollo-angular';
import { UpvotePostMutation } from './graphql/mutations/upvote-post.mutation';
import { PostsByAuthorIdQuery } from 'src/app/graphql/queries/posts-by-author-id.query';

@NgModule({
  imports: [BrowserModule, FormsModule, GraphQLModule, HttpClientModule],
  declarations: [AppComponent],
  providers: [PostsQuery, PostsByAuthorIdQuery, UpvotePostMutation, Apollo],
  bootstrap: [AppComponent],
})
export class AppModule {}
