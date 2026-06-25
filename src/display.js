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

        this.ongoingTodoContainer = document.querySelector(".ongoing-todos");
        this.completedTodoContainer = document.querySelector(".completed-todos");



    }

    openNewProjectForm(){
        this.newProjectForm.reset(); //make sure form is empty every time you open
        this.newProjectDialog.showModal();
    }
    openNewTodoForm(){
        this.newTodoForm.reset(); //make sure form is empty every time you open
        console.log("need to set project title here")
        this.newTodoDialog.showModal();
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
        this.highlightSelectProject();
    }
    addNewProjectDiv(m_project){
        const m_projectDiv = document.createElement("div");
        m_projectDiv.classList.add("project", `id_${m_project.uniqueID}`);

        const m_projectSelect = document.createElement("button");
        m_projectSelect.classList.add("project-button");
        m_projectSelect.ariaLabel = `Select ${m_project.getProjectName()}`;
        m_projectSelect.addEventListener("click", () =>{
            this.projectManager.selectProject(m_project);
            this.highlightSelectProject();
        });
            
        const m_projectName = document.createElement("p");
        m_projectName.textContent = m_project.getProjectName();

        const m_projectDelete = document.createElement("button");
        m_projectDelete.classList.add("project-delete");
        m_projectDelete.ariaLabel = `Delete ${m_project.getProjectName()} project`;
        m_projectDelete.addEventListener("click", () => {
            this.projectManager.deleteProject(m_project);
            this.updateProjectList();
            this.updateTodoSections();
        })

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
        const name = formData.get('todo-name-input');
        const description = formData.get('todo-description');
        const hasDueDate = formData.get('due-date-checkbox');
        const dueDate = formData.get('due-date-selector');
        const priority = formData.get('priority-initial');
        console.log({
            name,
            description,
            hasDueDate,
            dueDate,
            priority
        })
        const m_selectedProject = this.projectManager.getCurrentSelected();
        m_selectedProject.addTodoTask({
            name,
            description,
            hasDueDate,
            dueDate,
            priority
        })
        // const projectName = formData.get('project-name-input');
        // this.projectManager.addProject(projectName);
        this.projectManager.logProjects();
        this.updateTodoSections();
        console.log("clicked");
        this.newTodoDialog.close()
    }
    updateTodoSections(){
        const m_currentTodoList = this.projectManager.getSelectedTodos();
        this.ongoingTodoContainer.textContent = "";
        this.completedTodoContainer.textContent = "";
        if(this.projectManager.getCurrentSelected() === undefined){
            return;
        }
        this.createTodoAddButton();
        //also need to empty completed container
        for (let i = 0; i < m_currentTodoList.length; i++) {
            if(m_currentTodoList[i].getCompleteness() === false){
                this.addOngoingTodoDiv(m_currentTodoList[i]);
            }
            else{
                //add this to the completed todos
                this.addCompleteTodoDiv(m_currentTodoList[i]);

            }
            
        }
    }
    createTodoAddButton(){
        const m_addButtonContainer = document.createElement("div");
        m_addButtonContainer.classList.add("add-todo-container");

        const m_addTodoButton = document.createElement("button");
        m_addTodoButton.ariaLabel = "Add new to do task";
        m_addTodoButton.classList.add("new-todo-button");
        m_addTodoButton.addEventListener("click", ()=>{this.openNewTodoForm()});


        const m_circleDiv = document.createElement("div");
        m_circleDiv.classList.add("add-circle");

        const m_plusIcon = document.createElement("div");
        m_plusIcon.classList.add("fa-solid","fa-plus");

        m_addButtonContainer.appendChild(m_addTodoButton);
        m_circleDiv.appendChild(m_plusIcon);
        m_addButtonContainer.appendChild(m_circleDiv);
        this.ongoingTodoContainer.appendChild(m_addButtonContainer);
    }
    addOngoingTodoDiv(m_todoTask){
        const m_ongoingDiv = document.createElement("div");
        m_ongoingDiv.classList.add("ongoing-task");
        
        const m_dueInDate = document.createElement("p");
        m_dueInDate.classList.add("due-in");
        //DO CALCULATION HERE FOR HOW LONG UNTIL DUE
        m_dueInDate.textContent = "Due in not set up";

        const m_taskName = document.createElement("p");
        m_taskName.classList.add("task-name");
        m_taskName.textContent = m_todoTask.getName();

        const m_taskPriority = document.createElement("p");
        m_taskPriority.classList.add("task-priority");
        m_taskPriority.textContent = m_todoTask.getPriorityExclamation();

        const m_taskDescription = document.createElement("p");
        m_taskDescription.classList.add("task-description");
        m_taskDescription.textContent = m_todoTask.getDescription();
        

        const m_dueDate = document.createElement("p");
        m_dueDate.classList.add("task-dueDate");
        m_dueDate.textContent = "Due Date: " + m_todoTask.getDueDate();

        const m_taskEditButton = document.createElement("button");
        m_taskEditButton.classList.add("task-edit");
        m_taskEditButton.textContent = "Edit";
        //need to set this up completely. also need to set up edit dialog

        const m_taskCompleteButton = document.createElement("button");
        m_taskCompleteButton.classList.add("task-complete");
        m_taskCompleteButton.textContent = "Mark Complete";
        //Clicking has to move from here to the completed section somehow

        const m_taskDeleteButton = document.createElement("button");
        m_taskDeleteButton.classList.add("task-delete");
        m_taskDeleteButton.ariaLabel = "delete " + m_todoTask.getName();
        //clicking has to delete this task from the todo list
        
        const m_trashIcon = document.createElement("i");
        m_trashIcon.classList.add("fa-solid", "fa-trash");
        m_taskDeleteButton.appendChild(m_trashIcon);

        m_ongoingDiv.appendChild(m_dueInDate);
        m_ongoingDiv.appendChild(m_taskName);
        m_ongoingDiv.appendChild(m_taskPriority);
        m_ongoingDiv.appendChild(m_taskDescription);
        m_ongoingDiv.appendChild(m_dueDate);
        m_ongoingDiv.appendChild(m_taskEditButton);
        m_ongoingDiv.appendChild(m_taskCompleteButton); 
        m_ongoingDiv.appendChild(m_taskDeleteButton);
        this.ongoingTodoContainer.appendChild(m_ongoingDiv);
       
    }
    addCompleteTodoDiv(m_todoTask){
        const m_completedDiv = document.createElement("div");
        m_completedDiv.classList.add("completed-task");
        
        const m_incompleteButton = document.createElement("button");
        m_incompleteButton.classList.add("task-incomplete");

        const m_completedName = document.createElement("p");
        m_completedName.classList.add("completed-name");
        m_completedName.textContent = m_todoTask.getName();

        const m_completedDate = document.createElement("p");
        m_completedDate.classList.add("completed-date");
        m_completedDate.textContent = "11-11-1111";

        const m_completedDeleteButton = document.createElement("button");
        m_completedDeleteButton.classList.add("completed-delete");
        m_completedDeleteButton.ariaLabel = "delete " + m_todoTask.getName();
        //clicking has to delete this task from the todo list
        
        const m_trashIcon = document.createElement("i");
        m_trashIcon.classList.add("fa-solid", "fa-trash");
        m_completedDeleteButton.appendChild(m_trashIcon);

        m_completedDiv.appendChild(m_incompleteButton);
        m_completedDiv.appendChild(m_completedName);
        m_completedDiv.appendChild(m_completedDate);
        m_completedDiv.appendChild(m_completedDeleteButton);
        this.completedTodoContainer.appendChild(m_completedDiv);
    }
    highlightSelectProject(){
        //if any are selected remove them
        if(this.projectManager.selected.uniqueID != null){
            document.querySelector(".selected") != null ? document.querySelector(".selected").classList.remove("selected"): console.log("nothing to deselect");
            document.querySelector(`.id_${this.projectManager.selected.uniqueID}`).classList.add("selected");
            this.updateTodoSections();
        }
    }

}
