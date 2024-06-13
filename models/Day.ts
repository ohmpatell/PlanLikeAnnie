import { Task } from './Task';

class Day {
  date: Date;
  day: string;
  tasks: Task[];
  weekStart: Date;
  weekEnd: Date;

  constructor(date: Date, tasks: Task[] = []) {
    this.date = date;
    this.day = date.toLocaleString('default', { weekday: 'long' });
    this.tasks = tasks;
    const weekInfo = this.getWeekRange(date);
    this.weekStart = weekInfo.weekStart;
    this.weekEnd = weekInfo.weekEnd;
  }

  private getWeekRange(date: Date): { weekStart: Date, weekEnd: Date } {
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    const diffToSunday = 7 - dayOfWeek;

    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() + diffToMonday);

    const weekEnd = new Date(date);
    weekEnd.setDate(date.getDate() + diffToSunday);

    return { weekStart, weekEnd };
  }
}

export default Day;
