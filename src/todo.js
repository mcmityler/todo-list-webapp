export default class ToDo{
    constructor(name, description = "", hasDueDate = false, dueDate = "", priority = 1){
        this.name = name;
        this.description = description;
        this.hasDueDate = hasDueDate;
        this.dueDate = dueDate;
        this.priority = +priority;
        this.completed = false; 
        this.completedDate = ""; 
        this.uniqueID = crypto.randomUUID();

    }

    setCompletedDate(){
        this.completedDate = new Date().toLocaleDateString("en-US");
    }
    setCompleteness(completed){
        this.completed = completed
        if(completed === true){
            this.setCompletedDate();
        }
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
            return "No date set";
        }
    }
    getDueIn(){
        if(this.hasDueDate !== "on"){
            return -1;
        }
        const mdy = this.dueDate.split('-');
        const m_dueDate = new Date(this.dueDate);
        console.log(m_dueDate)
        return Math.round((m_dueDate - new Date()) / (1000 * 60 * 60 * 24));
    }
    getPriority(){
        return this.priority;
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
    editTodo({name, description, hasDueDate, dueDate, priority}){
        this.name = name;
        this.description = description;
        this.hasDueDate = hasDueDate;
        this.dueDate = dueDate;
        this.priority = +priority;
    }
    getCompletedDate(){
        return this.completedDate;
    }

}