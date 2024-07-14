// workout.service.ts
import { Injectable } from '@angular/core';
import { User } from './workout.model'; // Adjust path as per your project structure

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private usersKey = 'users';

  constructor() {
    // Initialize localStorage with initial data if it doesn't exist
    if (!localStorage.getItem(this.usersKey)) {
      const initialData: User[] = [
        { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
        { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
        { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }] },
      ];
      localStorage.setItem(this.usersKey, JSON.stringify(initialData));
    }
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  updateUser(users: User[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}
