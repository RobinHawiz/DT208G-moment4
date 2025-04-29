import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '@core/models/course.model';
import { CourseService } from '@core/services/course.service';
import { alphabetize } from '@core/utils/sort.util';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  courses = signal<Array<Course> | undefined>(undefined);
  isLoading = signal<boolean>(false);
  didFetchFail = computed(
    () => this.courses() === undefined && !this.isLoading()
  );

  searchTerm = signal<string>('');
  private readonly coursePropsToCheck: Array<keyof Course> = [
    'code',
    'coursename',
  ];
  filteredCourses = computed(() =>
    this.courses()?.filter((course) =>
      this.coursePropsToCheck.some((prop) =>
        course[prop].toLowerCase().includes(this.searchTerm().toLowerCase())
      )
    )
  );

  constructor(private courseService: CourseService) {}

  private alphabetizeBy(prop: keyof Course) {
    const courses = this.courses();
    if (!courses) return;

    const sorted = [...courses].sort((a, b) => alphabetize(a[prop], b[prop]));
    this.courses.set(sorted);
  }

  ngOnInit() {
    this.isLoading.set(true);
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses.set(data);
      },
      error: (err) => {
        console.error('Misslyckad hämtning av data: ', err);
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  alphabetizeCourseCode(): void {
    this.alphabetizeBy('code');
  }

  alphabetizeCourseName(): void {
    this.alphabetizeBy('coursename');
  }

  alphabetizeCourseProgression(): void {
    this.alphabetizeBy('progression');
  }
}
