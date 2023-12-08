import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { Post } from '../../models/post.model';
import { Observable, map } from 'rxjs';
import { HttpOptions } from '@ngrx/data/src/dataservices/interfaces';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class PostDataService extends DefaultDataService<Post> {

  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator)
  }

  override getAll(): Observable<Post[]> {
    return this.http.get<any>(`/api/posts/all-posts`).pipe(
      map(data => {
        const posts: Post[] = [];
        for (let key in data.responseObject.posts) {
          posts.push({ ...data.responseObject.posts[key], id: key });
        }
        return posts;
      })
    );
  }

  override add(post: Post): Observable<any> {
    return this.http.post<any>('/api/posts/create-post', post).pipe(
      map(data => {
        return { ...data.responseObject.post, id: data.responseObject.post._id }
      })
    )
  }

  override update(update: Update<Post>): Observable<Post> {
    return this.http.put<any>(`/api/posts/edit-post/${update.changes._id}`, update).pipe(
      map(data => {
        return { ...data.responseObject.post, id: data.responseObject.post._id }
      })
    )
  }

  override delete(key: string | number): Observable<any> {
    return this.http.delete<any>(`/api/posts/delete-post/${key}`).pipe(
      map(data => {
        return key;
      })
    );
  }
}
