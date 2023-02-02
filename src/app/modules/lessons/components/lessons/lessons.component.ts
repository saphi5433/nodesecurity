import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-lessons',
  template: `
    <div class="overflow-x-auto">
      <table class="table w-full">
        <!-- head -->
        <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>

        </tr>
        </thead>
        <tbody>

        <tr *ngFor="let lesson of lessons$ | async">
          <th>{{lesson.id}}</th>
          <th>{{lesson.name}}</th>
        </tr>

        </tbody>
      </table>
    </div>
  `,
  styles: [
  ]
})
export class LessonsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  lessons$: Observable<{id: number, name: string}[]> = this.getLessons()

  ngOnInit(): void {

  }

  getLessons(): Observable<{id: number, name: string}[]> {
    return this.http.get<{ lessons: { id: number, name: string }[] }>('api/lessons').pipe(map(res => res.lessons))
  }

}
