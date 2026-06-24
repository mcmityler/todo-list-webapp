import ProjectManager from "./projectManager.js"

export default class Display{
    constructor(){
        this.closeNewProject = document.querySelector(".close-dialog-button");
        this.newProjectForm = document.getElementById("new-project-dialog");
        this.closeNewProject.addEventListener("click", ()=>{this.closeNewProjectForm()});
        this.newProjectForm.addEventListener("submit", ()=>{this.submitNewProjectForm()});
        this.projectManager = new ProjectManager();
        this.openNewProject = document.querySelector(".new-project-button");
        this.openNewProject.addEventListener("click", ()=>{this.openNewProjectForm()});

    }

    openNewProjectForm(){
        this.newProjectForm.showModal();
    }
    closeNewProjectForm(){
        this.newProjectForm.close()
    }
    submitNewProjectForm(){
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const projectName = formData.get('project-name-input');
        this.projectManager.addProject(projectName);
        this.projectManager.logProjects();
        this.updateProjectList();
        event.target.reset();
        this.newProjectForm.close()
    }
    updateProjectList(){

    }

}
