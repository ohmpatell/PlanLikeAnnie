import { doc, updateDoc, query, where, addDoc, collection, getDocs, DocumentData } from 'firebase/firestore';
import {db, storage} from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import { TaskViewModel } from './TaskViewModel';




/**
 * Class representing a task.
 * Saved as object: {userId: string, id: string, title: string, description: string, date: Date, completed: boolean}
 * 
 */
export class Task {
    /**
     * Unique identifier for the task.
     * Generated as `${user}-${date.getTime()}` to ensure uniqueness.
     */
    userId: string;
  
    id: string;

    /**
     * Name of the task.
     */
    title: string;
  
    /**
     * Optional description of the task.
     */
    description?: string;
  
    /**
     * Optional date associated with the task.
     */
    date?: Date;
  
    /**
     * Boolean indicating whether the task is completed.
     */
    completed: boolean;
  
    /**
     * Create a task.
     * @param {string} user - The user ID associated with the task.
     * @param {string} title - The name of the task.
     * @param {string} [description] - The optional description of the task.
     * @param {Date} [date] - The optional date associated with the task.
     * @param {boolean} [completed=false] - The initial completion status of the task.
     */
    constructor(user: string, title: string, description?: string, date?: Date, completed: boolean = false) {
      this.id = `${user}-${date?.getTime() || 'notes'}-${date?.getMonth()}-${date?.getFullYear()}-${date?.getHours()}-${date?.getMinutes()}-${date?.getSeconds()}`;
      this.userId = `${user}`;
      this.title = title;
      this.description = description;
      this.date = date;
      this.completed = completed;
      console.log('Task created: ', this.id);
      this.save();
    }

    private getUserId(){
        return this.userId;
    }

    async saveToFirebase() {
      console.log('Saving to Firebase');
      try {
        await addDoc(collection(db, 'tasks'), {
          userId: this.userId,
          id: this.id,
          title: this.title,
          description: this.description,
          date: this.date?.toDateString() || "notes",
          completed: this.completed,
        });
      } catch (e) {
        console.error('Error adding document: ', e);
      }
    }
  
    async saveLocally() {
      // Don't save tasks more than 30 days in the future or past
      if (this.date) {
        const now = new Date();
        if (this.date.getTime() < now.getTime() - 30 * 24 * 60 * 60 * 1000) {
          return;
        }
        if (this.date.getTime() > now.getTime() + 30 * 24 * 60 * 60 * 1000) {
          return;
        }
      }

      console.log('Saving locally');
      // save it to local storage
      try {
        const tasks = JSON.parse(await AsyncStorage.getItem('tasks') || '') || [];
        tasks.push(JSON.stringify(this));
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (e) {
        console.error('Error saving locally: ', e);
      }
    }
  
    async save() {
      const state = await NetInfo.fetch();
      console.log('Connection type', state.type);
      if (state.isConnected) {
        console.log('Connected to the internet!');
        await this.saveToFirebase();
        await this.saveLocally();
      } else {
        await this.saveLocally();
      }
    }

    static async update(t: TaskViewModel) {
      console.log('Updating task: ', t.id);
      
      try {
        await updateDoc(doc(db, 'tasks', "7UiSdmPiBwqPsJqTw92w"), {
          title: t.title,
          description: t.description,
          date: t.date?.toDateString() || "notes",
          completed: t.completed,
        });
        
      } catch (e) {
        console.error('Error updating document: ', e);
      }
    }
  }
  
  export default Task;
  