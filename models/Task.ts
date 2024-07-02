/**
 * Class representing a task.
 */
export class Task {
    /**
     * Unique identifier for the task.
     * Generated as `${user}-${date.getTime()}` to ensure uniqueness.
     */
    id: string;
  
    /**
     * Name of the task.
     */
    name: string;
  
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
     * @param {string} name - The name of the task.
     * @param {string} [description] - The optional description of the task.
     * @param {Date} [date] - The optional date associated with the task.
     * @param {boolean} [completed=false] - The initial completion status of the task.
     */
    constructor(user: string, name: string, description?: string, date?: Date, completed: boolean = false) {
      this.id = `${user}-${date?.getDate() || "notes" + date?.getMonth() + date?.getFullYear()}`;
      this.name = name;
      this.description = description;
      this.date = date;
      this.completed = completed;
    }

    hello(){
      console.log("Hello")
    }


  }
  
  export default Task;
  