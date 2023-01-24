import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <h1 class="text-5xl font-bold">Login</h1>
    <input type="text" placeholder="Username" class="input w-full max-w-xs" />
    <input type="password" placeholder="Password" class="input w-full max-w-xs" />
    <button class="btn btn-primary">Login</button>
  `,
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
