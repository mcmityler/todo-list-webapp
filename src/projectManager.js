import Project from "./projects.js"

export default class ProjectManager{
    constructor(){
        this.projects = []; //array of project classes
    }

    addProject(name){
        const _newProject = new Project(name);
        this.projects.push(_newProject);
    }
    logProjects(){
        console.table(this.projects);
    }
}