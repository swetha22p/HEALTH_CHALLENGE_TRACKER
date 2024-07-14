import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get initial users', () => {
    const users = service.getUsers();
    expect(users.length).toBe(3);
  });

  it('should add a user', () => {
    const newUser = { id: 4, name: 'Test User', workouts: [{ type: 'Running', minutes: 10 }] };
    service.addUser(newUser);
    const users = service.getUsers();
    expect(users.length).toBe(4);
    expect(users[3].name).toBe('Test User');
  });
});
