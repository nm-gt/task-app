import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task, TaskService } from '../../task.service';
import { Subscription } from 'rxjs';
import { RouterLink } from "@angular/router";
import { UserStatusDirective } from '../../user-status';

@Component({
  selector: 'app-tasklist',
  imports: [NgFor, NgxPaginationModule, FormsModule, ReactiveFormsModule, CommonModule, RouterLink, UserStatusDirective],
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.css',
})
export class Tasklist {

  searchTerm: string = '';
  tasks: Task[] = [];
  filteredTasks: Task[] = [];

  private subscription!: Subscription;

  page = 1;

  setSort: boolean = false;
  setGrade: boolean = true;

  taskToDeleteId: number | null = null;

  selectedTask: Task | null = null;
  dateAddedStr: any;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.subscription = this.taskService.tasks$.subscribe(tasks => {
      this.tasks = [...tasks];
      this.filteredTasks = [...tasks];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // -------------------- SEARCH --------------------
  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.task.toLowerCase().includes(term) ||
      task.desc.toLowerCase().includes(term)
    );
    this.page = 1;
  }

  // -------------------- SORT --------------------
  sortTask() {
    this.tasks = [...this.tasks].sort((a, b) =>
      this.setSort ? a.status - b.status : b.status - a.status
    );
    this.setSort = !this.setSort;
    this.filteredTasks = [...this.tasks];
    this.page = 1;
  }

  sortByGrade() {
    this.tasks = [...this.tasks].sort((a, b) =>
      this.setGrade ? a.grade - b.grade : b.grade - a.grade
    );
    this.setGrade = !this.setGrade;
    this.filteredTasks = [...this.tasks];
    this.page = 1;
  }

  // -------------------- FILTER --------------------
  filterByCategory(event: Event, category: string) {
    event.preventDefault();

    if (!category) this.filteredTasks = [...this.tasks];
    else this.filteredTasks = this.tasks.filter(task => task.category === category);

    this.page = 1;
  }

  filterByGrade(event: Event, grade: number) {
    event.preventDefault();

    if (!grade) this.filteredTasks = [...this.tasks];
    else this.filteredTasks = this.tasks.filter(task => task.grade === grade);

    this.page = 1;
  }

  // -------------------- DELETE --------------------
  openDeleteModal(id: number) {
    this.taskToDeleteId = id;
    const modalEl = document.getElementById('deleteModal');
    if (!modalEl) return;

    const modal = new (window as any).bootstrap.Modal(modalEl);
    modal.show();
  }

  closeModal() {
    const modalEl = document.getElementById('deleteModal');
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
    this.taskToDeleteId = null;
  }

  confirmDelete() {
    if (this.taskToDeleteId !== null) {
      this.tasks = this.tasks.filter(t => t.id !== this.taskToDeleteId);
      this.filteredTasks = [...this.tasks];
      this.closeModal();
    }
  }

  // -------------------- EDIT --------------------
  openEditModal(task: Task) {
    this.selectedTask = {
      id: task.id,
      task: task.task || '',
      desc: task.desc || '',
      category: task.category || '',
      grade: task.grade ?? 1,
      status: task.status ?? 1,
      dateAdded: task.dateAdded || new Date(),
      duration: task.duration ?? 0
    };

    const modalEl = document.getElementById('editModal');
    if (!modalEl) return;

    const modal = new (window as any).bootstrap.Modal(modalEl);
    modal.show();
  }


  closeModal2() {
    const modalEl = document.getElementById('editModal');
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
    this.selectedTask = null;
  }

  applyChanges() {
    if (!this.selectedTask) return;

    const index = this.tasks.findIndex(t => t.id === this.selectedTask!.id);
    if (index !== -1) {
      this.tasks[index] = { ...this.selectedTask };
      this.filteredTasks = [...this.tasks];
    }
    this.closeModal2();
  }
}
