import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { User, Workout } from '../workout.model';

@Component({
  selector: 'app-workout-form',
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.css']
})
export class WorkoutFormComponent {
  name: string = '';
  workoutType: string = '';
  minutes: number = 0;

  constructor(private workoutService: WorkoutService) {}

  addWorkout(): void {
    const users = this.workoutService.getUsers();
    let user = users.find(u => u.name.toLowerCase() === this.name.toLowerCase());

    if (!user) {
      user = { id: users.length + 1, name: this.name, workouts: [] };
      users.push(user);
    }

    user.workouts.push({ type: this.workoutType, minutes: this.minutes });
    this.workoutService.updateUser(users);

    this.name = '';
    this.workoutType = '';
    this.minutes = 0;
  }
}
