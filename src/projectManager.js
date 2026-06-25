import Project from "./projects.js"

export default class ProjectManager{
    constructor(){
        this.projects = []; //array of project classes
        this.selected = {}; //what project is currently selected
    }

    addProject(name){
        const _newProject = new Project(name);
        this.projects.push(_newProject);
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
        console.log(m_selected);
        return m_selected.getTodoList();
    }
    logProjects(){
        console.table(this.projects);
    }
    selectProject(project){
        this.selected = project;
        console.log(this.selected.name);
    }
}