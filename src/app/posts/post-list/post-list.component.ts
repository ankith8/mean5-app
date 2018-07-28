import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostsService } from './../posts.service';
import { Subscription } from 'rxjs';

import { Post } from './../post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub: Subscription;

  // posts = [
  //   {title: 'First Post', content: 'This is the First Post'},
  //   {title: 'Second Post', content: 'This is the Second Post'},
  //   {title: 'Third Post', content: 'This is the Third Post'}
  // ];

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
