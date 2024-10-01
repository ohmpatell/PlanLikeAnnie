import { Task } from '../models/Task';

export class TaskViewModel {
    id: string;
    dbid: string;
    title: string;
    description?: string;
    date?: Date;
    completed: boolean;


    constructor(id: string, dbid: string,title: string, description?: string, date?: Date, completed: boolean = false) {
        this.id = id;
        this.dbid = dbid;
        this.title = title;
        this.description = description;
        this.date = date;
        this.completed = completed;
    }

    static fromTask(task: Task): TaskViewModel {
        return new TaskViewModel(task.id , task.dbid,task.title, task.description, task.date, task.completed);
    }

    static fromJSON(json: any): TaskViewModel {
        return new TaskViewModel(json.id, json.dbid, json.title, json.description, new Date(json.date), json.completed);
    }
    
}