import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PostEntityService } from '../service/post-entity.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {
  postForm: FormGroup;
  post: Post;

  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private PostEntityService: PostEntityService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this._activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.PostEntityService.entities$.subscribe(posts => {
        const post = posts.find((post) => post._id === id);
        this.postForm.patchValue({
          title: post.title,
          body: post.body
        })
      })
    })
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      body: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    });
  }

  onEditPost() {
    if (this.postForm.valid) {
      const post = { ...this.post };
      post.title = this.postForm.value.title;
      post.body = this.postForm.value.body;

      this.PostEntityService.update(post);
      this.router.navigate(['../posts']);
    }
  }
}
