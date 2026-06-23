import Project from "./projects.js"

export default class ProjectManager{
    constructor(){
        this.projects = []; //array of project classes
    }

    addProject(name){
        const _newProject = new Project(name);
        this.projects.push(_newProject);
    }
    deleteProject(project){
        this.projects = this.projects.filter(_project => _project !== project);
    }
    logProjects(){
        console.table(this.projects);
    }
}