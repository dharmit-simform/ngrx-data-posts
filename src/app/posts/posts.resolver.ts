import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, first, tap } from "rxjs";
import { PostEntityService } from "./service/post-entity.service";

@Injectable({
  providedIn: 'root'
})
export class PostResolver implements Resolve<boolean> {
  constructor(
    private PostEntityService: PostEntityService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.PostEntityService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.PostEntityService.getAll();
        }
      }),
      first(),
    )
  }
}
