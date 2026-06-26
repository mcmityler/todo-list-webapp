// src/index.js
import "./styles.css";
import Display from "./display.js"


const display = new Display(); //deals with displaying projects and todos

if(JSON.parse(localStorage.getItem("projects")).length <= 0){
    //if no projects are there when loading then create default
    display.projectManager.addProject("Default");
    display.projectManager.selectProject(display.projectManager.projects[0]);
    display.projectManager.projects[0].addTodoTask({name: "Task at hand", description: "This is a crazy description"});
    display.projectManager.projects[0].todoList[0].setCompleteness(true)
    display.projectManager.saveProjects();
}else{
    //otherwise load old save files if there are projects available
    display.projectManager.loadProjects();
}
//update viewing
display.updateProjectList();


