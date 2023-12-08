import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListPostsComponent } from './posts/list-posts/list-posts.component';
import { AddPostComponent } from './posts/add-post/add-post.component';
import { EditPostComponent } from './posts/edit-post/edit-post.component';
import { SinglePostsComponent } from './posts/single-posts/single-posts.component';
import { PostResolver } from './posts/posts.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'posts',
    resolve: { posts: PostResolver },
    component: ListPostsComponent,
  },
  {
    path: 'posts/add',
    component: AddPostComponent
  },
  {
    path: 'posts/edit/:id',
    component: EditPostComponent
  },
  {
    path: 'posts/details/:id',
    component: SinglePostsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
