import Project from "./projects.js"

export default class ProjectManager{
    constructor(){
        this.projects = []; //array of project classes
        this.selected = {}; //what project is currently selected
        this.loadProjects = this.loadProjects.bind(this);
    }

    addProject(name){
        const _newProject = new Project(name);
        this.projects.push(_newProject);
        if(this.projects.length === 1){
            this.selected = this.projects[0];
        }
    }
    deleteProject(project){
        console.log(this.selected === project);
        if(this.selected === project){
            this.selected = {};
        }
        this.projects = this.projects.filter(_project => _project !== project);
    }
    getProjects(){
        return this.projects;
    }
    getCurrentSelected(){
        if(this.selected.uniqueID === null){
            console.log("no selected project found");
            return {};
        }
        return this.projects.find(_project => _project.uniqueID === this.selected.uniqueID);
    }
    getSelectedTodos(){
        const m_selected = this.projects.find(_project => _project.uniqueID === this.selected.uniqueID);
        // console.log(m_selected);
        if(m_selected === undefined){
            return [];
        }
        return m_selected.getTodoList();
    }
    logProjects(){
        console.table(this.projects);
    }
    selectProject(project){
        this.selected = project;
        console.log(this.selected.name);
    }
    saveProjects(){
        localStorage.setItem("projects", JSON.stringify(this.projects));
        console.log("saved files")
    }
    loadProjects(){
        this.projects.length = 0;
        const projectsArray = JSON.parse(localStorage.getItem("projects"));
        if(projectsArray !== undefined){
            for (let i = 0; i < projectsArray.length; i++) {
                this.addProject(projectsArray[i].name);
                console.log("loaded");
                console.log(projectsArray);
                const m_todoList = projectsArray[i].todoList;
                for (let k = 0; k < m_todoList.length; k++) {
                    console.log(projectsArray[i].todoList);
                    console.log( m_todoList[k].completedDate);
                    this.projects[i].addTodoTask({
                        name: m_todoList[k].name,
                        description: m_todoList[k].description,
                        hasDueDate: m_todoList[k].hasDueDate,
                        dueDate: m_todoList[k].dueDate,
                        priority: m_todoList[k].priority,
                        completed: m_todoList[k].completed,
                        completedDate: m_todoList[k].completedDate
                    });
                }
            }
        }
    }
}