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

        this.projectListContainer = document.querySelector(".project-list-container");
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
        //Update the entire visible element for what projects are in my list
        const myProjectList = this.projectManager.getProjects();
        this.projectListContainer.textContent = ""; //do this to reset element to add to it
        for (let i = 0; i < myProjectList.length; i++) {
            this.addNewProjectDiv(myProjectList[i]);
        }
    }
    addNewProjectDiv(m_project){
        const m_projectDiv = document.createElement("div");
        m_projectDiv.classList.add("project");

        const m_projectButton = document.createElement("button");
        m_projectButton.classList.add("project-button");
        m_projectButton.ariaLabel = `Select ${m_project.getProjectName()}`;

        const m_projectName = document.createElement("p");
        m_projectName.textContent = m_project.getProjectName();

        const m_projectDelete = document.createElement("button");
        m_projectDelete.classList.add("project-delete");
        m_projectDelete.ariaLabel = `Delete ${m_project.getProjectName()} project`;

        const m_trashIcon = document.createElement("i");
        m_trashIcon.classList.add("fa-solid", "fa-trash");


        m_projectDiv.appendChild(m_projectButton);
        m_projectDiv.appendChild(m_projectName);
        m_projectDelete.appendChild(m_trashIcon);
        m_projectDiv.appendChild(m_projectDelete);
        this.projectListContainer.appendChild(m_projectDiv);
    }

}
