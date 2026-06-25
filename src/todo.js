export default class ToDo{
    constructor(name, description = "", hasDueDate = false, dueDate = "", priority = 1){
        this.name = name;
        this.description = description;
        this.hasDueDate = hasDueDate;
        this.dueDate = new Date(dueDate).toLocaleDateString('en-GB');
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
    getUniqueID(){
        return this.uniqueID;
    }
    getName(){
        return this.name;
    }
    getDueDate(){
        if(this.hasDueDate === "on"){
            return this.dueDate
        }else{
            return "No date set!";
        }
    }
    getPriorityExclamation(){
        let m_exclamation = "";
        for (let i = 0; i < this.priority; i++) {
            m_exclamation += "! "
        }
        return m_exclamation;
    }
    getDescription(){
        return this.description;
    }
    editTodo({name, description, dueDate, priority}){
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

}