export default class ToDo{
    constructor(name, description = "", dueDate = "", priority = 5){
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false; 
        this.uniqueID = crypto.randomUUID();

    }

    setCompleteness(completed){
        this.completed = completed
    }
    getCompleteness(){
        return this.completed;
    }

}