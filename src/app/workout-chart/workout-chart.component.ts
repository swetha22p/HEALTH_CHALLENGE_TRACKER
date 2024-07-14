import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { User } from '../workout.model';

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.css']
})
export class WorkoutChartComponent implements OnInit {
  chartData: any[] = [];
  view: [number, number] = [700, 400];
  colorScheme = 'cool';

  constructor(private workoutService: WorkoutService) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    const users = this.workoutService.getUsers();
    const workoutData: { [key: string]: number } = {};

    users.forEach(user => {
      user.workouts.forEach(workout => {
        if (!workoutData[workout.type]) {
          workoutData[workout.type] = 0;
        }
        workoutData[workout.type] += workout.minutes;
      });
    });

    this.chartData = Object.keys(workoutData).map(key => ({
      name: key,
      value: workoutData[key]
    }));
  }
}
