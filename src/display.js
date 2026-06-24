export default class Display{
    constructor(){
        this.closeNewProject = document.querySelector(".close-dialog-button");
        this.newProjectForm = document.getElementById("new-project-dialog");
        this.closeNewProject.addEventListener("click", ()=>{this.newProjectForm.close()})

    }

}
