import { db } from '@/firebaseConfig';
import { Task } from './Task';
import { doc, updateDoc, query, where, addDoc, collection, getDocs, DocumentData, Timestamp } from 'firebase/firestore';
import { TaskViewModel } from './TaskViewModel';

class Day {
  date: Date;
  day: string;
  tasks: Task[];
  weekStart: Date;
  weekEnd: Date;

  constructor(date: Date, tasks: Task[] = []) {
    this.date = date;
    this.day = date.toLocaleString('default', { weekday: 'long' });
    
    if (tasks.length === 0) {
    }

    this.tasks = [...tasks];
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
  
  async fetchTasks(currentUser: string) {

    const res: TaskViewModel[] = []
    // Get the current date in 'YYYY-MM-DD' format
    console.log('Fetching tasks for current user: ' + currentUser + '|  and date: ' + this.date.toDateString());
    try {
      const q = query(
        collection(db, 'tasks'),
        where('userId', '==', currentUser),
        where('date', '==', this.date.toDateString()),
      );
  
      const querySnapshot = await getDocs(q);
      const tasks: TaskViewModel[] = [];
      querySnapshot.forEach((doc) => {
        const task = new TaskViewModel(doc.data().id, doc.data().title, doc.data().description, new Date(doc.data().date), 
                              doc.data().completed);

        if(task instanceof TaskViewModel){
          res.push(task);
        }

      });
      console.log('Tasks fetched: ', res);
      return res;
    } catch (e) {
      console.error('Error fetching documents: ', e);
      throw new Error('Error fetching tasks');
    }
  }

}

export default Day;