import {Injectable} from '@angular/core';
import {filter, map, Observable, shareReplay, Subject, tap} from "rxjs";
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

  private subject: Subject<UserInterface> = new Subject<UserInterface>()
  user$: Observable<UserInterface> = this.subject.asObservable().pipe(filter(user => !!user));
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id))
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(isLogged => !isLogged))


  constructor(private http: HttpClient) {
    this.http.get<UserInterface>('/api/user')
      .subscribe(user => {
        this.subject.next(user ? user : ANONYMOUS_USER)
      })
  }

  signUp(email: string, password: string): Observable<UserInterface> {
    return this.http.post<UserInterface>('/api/auth/register', {email, password})
      .pipe(shareReplay(), tap(user => this.subject.next(user)))
  }

  login(email: string, password: string): Observable<UserInterface> {
    return this.http.post<UserInterface>('/api/auth/login', {email, password})
      .pipe(
        shareReplay(),
        tap(user => this.subject.next(user))
      )
  }

  logout(): Observable<any> {
    return this.http.post('/api/auth/logout', {})
      .pipe(
        shareReplay(),
        tap(() => this.subject.next(ANONYMOUS_USER))
      )
  }
}
