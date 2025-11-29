import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task, TaskService } from '../../task.service';

@Component({
  selector: 'app-addtask',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './addtask.html',
  styleUrl: './addtask.css',
})
export class Addtask {
  taskTitleControl = new FormControl('');
  descControl = new FormControl('');
  category: string = '';
  grade: number = 1;
  duration: number = 0;

  constructor(private taskService: TaskService) { }

  tasks = [
    {
      id: 1,
      task: 'Write report',
      desc: 'Complete monthly sales report for the team.',
      dateAdded: new Date('2025-10-28'),
      status: 0,
      duration: 120,
      category: 'Learn',
      grade: 3
    },
    {
      id: 2,
      task: 'Email client',
      desc: 'Send project update email to the client.',
      dateAdded: new Date('2025-10-27'),
      status: 1,
      duration: 30,
      category: 'Business',
      grade: 2
    },
    {
      id: 3,
      task: 'Team meeting',
      desc: 'Discuss tasks for the upcoming sprint.',
      dateAdded: new Date('2025-10-26'),
      status: 0,
      duration: 60,
      category: 'Business',
      grade: 5
    }
  ];


  selectCategory(c: string, event: Event) {
    event.preventDefault();
    this.category = c;
  }

  selectGrade(n: number, event: Event) {
    event.preventDefault();
    this.grade = n;
  }

  addTask() {
    const newTask: Task = {
      id: 0,
      task: this.taskTitleControl.value ?? '',
      desc: this.descControl.value ?? '',
      dateAdded: new Date(),
      status: 0,
      duration: this.duration,
      category: this.category,
      grade: this.grade
    };
    this.taskService.addTask(newTask);

    this.taskTitleControl.reset();
    this.descControl.reset();
  }
}
