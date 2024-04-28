import { useState } from "react"
import NewProject from "./components/NewProject"
import NoProjectSelected from "./components/NoProjectSelected"
import ProjectsSidebar from "./components/ProjectsSidebar"
import SelectedProject from "./components/SelectedProject"

function App() {
    const [projectsState, setProjectsState]= useState({
        selectedProjectId: undefined,
        projects:[],
        tasks:[]
    });

function handleAddTask(text){
    setProjectsState((prevState)=>{
        const taskId = Math.random();
        const newTask ={
            text:text,
            projectId:prevState.selectedProjectId,
            id:taskId
        }
        return{
            ...prevState,
            tasks: [...prevState.tasks, newTask]
        }
    })

}

function handleDeleteTask(id){
    setProjectsState((prevState)=>{
        return{
            ...prevState,
            tasks: prevState.tasks.filter((task)=>task.id !==id)
        }
    })
}

function handleStartAddProject(){
     setProjectsState(prevState=>{
        return {
            ...prevState,
            selectedProjectId:null
        }
     })
    }
function handleSelectProject(id){
     setProjectsState(prevState=>{
        return {
            ...prevState,
            selectedProjectId:id
        }
     })
    }

function handleDeleteProject(){
    setProjectsState(prevState=>{
        return {
            ...prevState,
            selectedProjectId:undefined,
            projects: prevState.projects.filter((project)=>project.id!==prevState.selectedProjectId)

        }
     })
}


function handleCancelProject(){
    setProjectsState(prevState=>{
        return {
            ...prevState,
            selectedProjectId:undefined
        }

    })
}

function handleAddProject(projectData){
    setProjectsState(prevState=>{
        const projectId =Math.random()
        const newProject={
            ...projectData,
            id:projectId
        }
        return{
            ...prevState,
            selectedProjectId: undefined,
            projects:[...prevState.projects, newProject]
        }
    })
}

const selectedProject=projectsState.projects.find(project=>project.id===projectsState.selectedProjectId)

 console.log('### ', projectsState)
    let content = (
    <SelectedProject project={selectedProject} 
        onDelete={handleDeleteProject}
        onAddTask ={handleAddTask}
        onDeleteTask = {handleDeleteTask}
        tasks ={projectsState.tasks}
        />
        )
    if (projectsState.selectedProjectId===null){
        content=<NewProject onAdd={handleAddProject} onCancel={handleCancelProject}/>
    }else if (projectsState.selectedProjectId===undefined){
        content = <NoProjectSelected onStartAddProject = {handleStartAddProject}/>
    }
  return (
    <main className="h-screen my-8 flex gap-8">
        <ProjectsSidebar onStartAddProject = {handleStartAddProject}
        projects={projectsState.projects} 
        onSelectProject={handleSelectProject}
        />
        {/* <NewProject /> */}
        {/* <NoProjectSelected onStartAddProject = {handleStartAddProject}/> */}
      {content}
      </main>
  );
}

export default App;
