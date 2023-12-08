import { Component, OnInit } from '@angular/core';
import { PostEntityService } from '../service/post-entity.service';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrl: './list-posts.component.css'
})
export class ListPostsComponent implements OnInit {

  posts$: Observable<Post[]>
  constructor(
    private PostEntityService: PostEntityService
  ) { }

  ngOnInit(): void {
    this.posts$ = this.PostEntityService.entities$;
  }

  onDeletePost(postId: string) {
    if (confirm('Are you sure you want to delete this post')) {
      this.PostEntityService.delete(postId);
    }
  }
}
