export default class ToDo{
    constructor(name, description, dueDate, priority){
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false; 
    }

    setCompleteness(completed){
        this.completed = completed
    }
    getCompleteness(){
        return this.completed;
    }

}