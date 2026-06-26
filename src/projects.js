import ToDo from "./todo.js"

export default class Project{
    constructor(name){
        this.name = name; 
        this.todoList = [];
        this.uniqueID = crypto.randomUUID();
    }
    addTodoTask(m_newTodo){
        const newTodo = new ToDo(
            m_newTodo.name,
            m_newTodo.description,
            m_newTodo.hasDueDate,
            m_newTodo.dueDate,
            m_newTodo.priority
        );
        this.todoList.push(newTodo);
    }
    deleteTodoTask(m_todo){
        this.todoList = this.todoList.filter(_task => _task !== m_todo);
    }
    findTodoTask(m_todoID){
        return this.todoList.find(m_todo => m_todoID === m_todo.uniqueID);
    }
    getUniqueID(){
        return this.uniqueID;
    }
    getProjectName(){
        return this.name;
    }
    getTodoList(){
        return this.todoList;
    }
    changeProjectName(m_name){
        this.name = m_name;
    }
}

