import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
    id: number;
    task: string;
    desc: string;
    dateAdded: Date;
    status: number;
    duration: number;
    category: string;
    grade: number;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
    private tasksSource = new BehaviorSubject<Task[]>([
        {
            id: 1,
            task: 'نوشتن گزارش',
            desc: 'تکمیل گزارش ماهانه فروش',
            dateAdded: new Date('2025-10-28'),
            status: 0,
            duration: 120,
            category: 'یادگیری',
            grade: 3
        },
        {
            id: 2,
            task: 'ایمیل به مشتری',
            desc: 'ارسال بروزرسانی پروژه',
            dateAdded: new Date('2025-10-27'),
            status: 1,
            duration: 30,
            category: 'تجاری',
            grade: 2
        },
        {
            id: 3,
            task: 'جلسه تیمی',
            desc: 'برگزاری جلسه هفتگی تیم توسعه',
            dateAdded: new Date('2025-10-29'),
            status: 0,
            duration: 60,
            category: 'مدیریت',
            grade: 4
        },
        {
            id: 4,
            task: 'بازبینی کد',
            desc: 'مرور و اصلاح Pull Request های اخیر',
            dateAdded: new Date('2025-10-30'),
            status: 1,
            duration: 90,
            category: 'توسعه',
            grade: 3
        },
        {
            id: 5,
            task: 'آموزش آنلاین',
            desc: 'شرکت در وبینار Angular',
            dateAdded: new Date('2025-10-31'),
            status: 0,
            duration: 45,
            category: 'یادگیری',
            grade: 5
        },
        {
            id: 6,
            task: 'تست واحد',
            desc: 'نوشتن تست‌های واحد برای کامپوننت‌ها',
            dateAdded: new Date('2025-11-01'),
            status: 0,
            duration: 80,
            category: 'توسعه',
            grade: 4
        },
        {
            id: 7,
            task: 'به‌روزرسانی مستندات',
            desc: 'به‌روزرسانی مستندات پروژه و README',
            dateAdded: new Date('2025-11-02'),
            status: 1,
            duration: 50,
            category: 'مدیریت',
            grade: 3
        },
        {
            id: 8,
            task: 'بازخورد مشتری',
            desc: 'دریافت بازخورد و پیشنهادات مشتری',
            dateAdded: new Date('2025-11-03'),
            status: 0,
            duration: 40,
            category: 'تجاری',
            grade: 2
        },
        {
            id: 9,
            task: 'طراحی رابط کاربری',
            desc: 'ایجاد طراحی اولیه UI/UX برای صفحه داشبورد',
            dateAdded: new Date('2025-11-04'),
            status: 1,
            duration: 100,
            category: 'طراحی',
            grade: 5
        },
        {
            id: 10,
            task: 'مرور کدهای قدیمی',
            desc: 'بازبینی و پاکسازی کدهای قدیمی پروژه',
            dateAdded: new Date('2025-11-05'),
            status: 0,
            duration: 70,
            category: 'توسعه',
            grade: 4
        }
    ]

    );

    tasks$ = this.tasksSource.asObservable();

    addTask(task: Task) {
        const currentTasks = this.tasksSource.value;
        task.id = currentTasks.length + 1;
        this.tasksSource.next([...currentTasks, task]);
    }
}
