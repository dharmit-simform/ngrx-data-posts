import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostEntityService } from '../service/post-entity.service';

@Component({
  selector: 'app-single-posts',
  templateUrl: './single-posts.component.html',
  styleUrl: './single-posts.component.css'
})
export class SinglePostsComponent implements OnInit {
  post: Post;

  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private PostEntityService: PostEntityService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.PostEntityService.entities$.subscribe(posts => {
        const post = posts.find((post) => post._id === id);
        this.post = post;
      })
    })
  }
}
