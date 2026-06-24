import ProjectManager from "./projectManager.js"

export default class Display{
    constructor(){
        this.closeNewProject = document.querySelector(".close-project-dialog-button");
        this.newProjectDialog = document.getElementById("new-project-dialog");
        this.newProjectForm = document.getElementById("new-project-form");
        this.closeNewProject.addEventListener("click", ()=>{this.closeDialogs()});
        this.newProjectForm.addEventListener("submit", ()=>{this.submitNewProjectForm()});
        this.projectManager = new ProjectManager();
        this.openNewProject = document.querySelector(".new-project-button");
        this.openNewProject.addEventListener("click", ()=>{this.openNewProjectForm()});

        this.projectListContainer = document.querySelector(".project-list-container");

        this.closeNewTodo = document.querySelector(".close-todo-dialog-button");
        this.newTodoDialog = document.getElementById("new-todo-dialog");
        this.newTodoForm = document.getElementById("new-todo-form");
        this.closeNewTodo.addEventListener("click", ()=>{this.closeDialogs()});
        this.newTodoForm.addEventListener("submit", ()=>{this.submitNewTodoForm()});




    }

    openNewProjectForm(){
        this.newProjectForm.reset(); //make sure form is empty every time you open
        this.newProjectDialog.showModal();
    }
    closeDialogs(){
        this.newProjectDialog.close()
        this.newTodoDialog.close()
    }
    submitNewProjectForm(){
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const projectName = formData.get('project-name-input');
        this.projectManager.addProject(projectName);
        this.projectManager.logProjects();
        this.updateProjectList();
        this.newProjectDialog.close()
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

        const m_projectSelect = document.createElement("button");
        m_projectSelect.classList.add("project-button");
        m_projectSelect.ariaLabel = `Select ${m_project.getProjectName()}`;

        const m_projectName = document.createElement("p");
        m_projectName.textContent = m_project.getProjectName();

        const m_projectDelete = document.createElement("button");
        m_projectDelete.classList.add("project-delete");
        m_projectDelete.ariaLabel = `Delete ${m_project.getProjectName()} project`;

        const m_trashIcon = document.createElement("i");
        m_trashIcon.classList.add("fa-solid", "fa-trash");


        m_projectDiv.appendChild(m_projectSelect);
        m_projectDiv.appendChild(m_projectName);
        m_projectDelete.appendChild(m_trashIcon);
        m_projectDiv.appendChild(m_projectDelete);
        this.projectListContainer.appendChild(m_projectDiv);
    }

    submitNewTodoForm(){
        event.preventDefault(); 
        const formData = new FormData(event.target);
        // const projectName = formData.get('project-name-input');
        // this.projectManager.addProject(projectName);
        // this.projectManager.logProjects();
        // this.updateProjectList();
        console.log("clicked");
        this.newTodoDialog.close()
    }

}
