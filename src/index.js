// src/index.js
import "./styles.css";
import ProjectManager from "./projectManager.js"


const projectManager = new ProjectManager();
projectManager.addProject("Flowstate");
projectManager.addProject("Grind Time");
projectManager.logProjects();






// import { greeting } from "./greeting.js";






// const Task1 = new ToDo("First Task", "Description of task", "08/08/26", 3);
// const Task2 = new ToDo("Second Task", "Description of task", "08/08/26", 5);
// Task1.setCompleteness(true)
// console.log(Task1.getCompleteness());

// // src/index.js
// import odinImage from "./odin.png";

// const image = document.createElement("img");
// image.src = odinImage;

// document.body.appendChild(image);
