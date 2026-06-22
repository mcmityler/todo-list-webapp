import ToDo from "./todo.js"

export default class Project{
    constructor(name){
        this.name = name; 
        this.todoList = [];
        this.uniqueID = crypto.randomUUID();
    }
    addTodoTask(_newTodo){
        const newTodo = new ToDo(_newTodo.name, _newTodo.description, _newTodo.dueDate, _newTodo.priority);
        this.todoList.push(newTodo);
    }
    deleteTodoTask(_uniqueID){
        this.todoList = this.todoList.filter(_task => _task.uniqueID !== _uniqueID);
    }
}

