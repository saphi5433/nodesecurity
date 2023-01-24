import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, shareReplay, tap} from "rxjs";
import {UserInterface} from "../interfaces/user.interface";
import {HttpClient} from "@angular/common/http";

export const ANONYMOUS_USER: UserInterface = {
  id: undefined,
  email: ''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(ANONYMOUS_USER)
  user$: Observable<UserInterface> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id))
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLogged => !isLogged))



  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string): Observable<UserInterface> {
    return this.http.post<UserInterface>('/api/auth/register', {email, password})
      .pipe(shareReplay(), tap(user => this.subject.next(user)))
  }
}
