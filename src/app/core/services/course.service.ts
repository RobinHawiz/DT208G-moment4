import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '@core/models/course.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  url: string = 'https://webbutveckling.miun.se/files/ramschema.json';

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Array<Course>> {
    return this.http.get<Array<Course>>(this.url);
  }
}
