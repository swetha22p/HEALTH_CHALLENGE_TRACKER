// workout-list.component.ts
import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { User } from '../workout.model'; // Adjust path as per your project structure

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchName: string = '';
  filterType: string = '';
  displayedColumns: string[] = ['name', 'workoutType', 'minutes'];
  innerDisplayedColumns: string[] = ['workoutType', 'minutes'];
  pageSize = 5;
  pageIndex = 0;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.users = this.workoutService.getUsers();
    this.filteredUsers = [...this.users]; // Initialize filteredUsers with a copy of all users initially
  }

  filterWorkouts(): void {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchName.toLowerCase()) &&
      user.workouts.some(workout => workout.type.toLowerCase().includes(this.filterType.toLowerCase()))
    );
  }

  handlePageEvent(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const startIndex = this.pageIndex * this.pageSize;
    this.filteredUsers = this.users.slice(startIndex, startIndex + this.pageSize);
  }
}
