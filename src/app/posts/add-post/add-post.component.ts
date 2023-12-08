import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../../models/post.model';
import { PostEntityService } from '../service/post-entity.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(
    private _router: Router,
    private PostEntityService: PostEntityService,
  ) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(6)]),
      body: new FormControl('', [Validators.required, Validators.minLength(10)]),
    });
  }

  onAddPost() {
    if (this.postForm.valid) {
      const post: Post = this.postForm.value;
      this.PostEntityService.add(post).subscribe(data => {
        this.postForm.reset();
        this._router.navigate(['../posts']);
      });
    }
  }
}
