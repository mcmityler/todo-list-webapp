import { format, addDays, differenceInDays} from "date-fns";
export default class ToDo{
    constructor(name, description = "", hasDueDate = false, dueDate = "", priority = 1, completed = false, completedDate = ""){
        this.name = name;
        this.description = description;
        this.hasDueDate = hasDueDate;
        this.dueDate = dueDate;
        this.priority = +priority;
        this.completed = completed; 
        this.completedDate = completedDate; 
        this.uniqueID = crypto.randomUUID();

    }

    setCompletedDate(){
        this.completedDate = format(new Date(), "MM/dd/yyyy");
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
            return format(addDays(new Date(this.dueDate),1), "MM/dd/yyyy")
        }else{
            return "No date set";
        }
    }
    getDueIn(){
        if(this.hasDueDate !== "on"){
            return -1;
        }
        return differenceInDays(new Date(this.dueDate), new Date());
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