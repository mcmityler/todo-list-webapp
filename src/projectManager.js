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
    logProjects(){
        console.table(this.projects);
    }
    selectProject(project){
        this.selected = project;
        console.log(this.selected.name);
    }
}