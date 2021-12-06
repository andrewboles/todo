// import { format, compareAsc } from 'date-fns'
import './style.css';

const todoItem = (title, description, dueDate, priority, projectSet = 'defaultProject')  => {
  let info = {title, description, dueDate, priority, projectSet};
  const getItem = () => info;
  const change = (aspect, newAspect) => {
    info[aspect] = newAspect;
  }
  return {change, getItem};
};

const project = () => {
  let itemList = {};
  const addItem = (item) =>{
    itemList[item.getItem().title] = item
  }
  const removeItem = (item) =>{
    delete itemList[item.getItem().title];
    manipulateDOM.removeItem(item.getItem().title)
  }
  const changeItemProject = (itemTitle, newProject) => {
    itemList[itemTitle].change('projectSet', newProject)
    projectContainer.projectList[newProject].addItem(itemList[itemTitle])
    removeItem(itemList[itemTitle])
  }

  return {itemList, addItem, removeItem, changeItemProject};
}

const manipulateDOM = (() =>{
  const mainContent = document.createElement('div')
  const sideBar = document.createElement('section')
  const todolistspace = document.createElement('div')
  const addProjButton = document.createElement('button')
  const addItemButton = document.createElement('button')
  const startUp = () =>{
    addProjButton.innerHTML = "Add Project"
    addItemButton.innerHTML = "Add Item"
    addProjButton.setAttribute('id',`add-project`);
    addItemButton.setAttribute('id',`add-item`);
    mainContent.setAttribute('id',`content`);
    document.body.appendChild(mainContent)
    sideBar.setAttribute('id',`side-bar`);
    mainContent.appendChild(sideBar)
    todolistspace.setAttribute('id',`todo-list-space`);
    mainContent.appendChild(todolistspace)
    sideBar.appendChild(addProjButton)
    todolistspace.appendChild(addItemButton)
    addProjButton.addEventListener('click',()=>{
      manipulateDOM.appendProject()
    })
    addItemButton.addEventListener('click',()=>{
      manipulateDOM.appendItem()
    })
    projectContainer.addProject()


  }

  const appendProject = () => {
    let newProjDom = document.createElement('div');
    let removeButton = document.createElement('div');
    let addProjButton = document.getElementById('add-project')
    let projectName = ""
    newProjDom.addEventListener('click', e =>{
      projectContainer.setProject(e.target.id)
      let allEntries = document.querySelectorAll('.project-entry')
      allEntries.forEach(e => {
        e.classList.remove('project-entry-highlight')
      })
      newProjDom.classList.add('project-entry-highlight')
    });
    sideBar.insertBefore(newProjDom, addProjButton)

    newProjDom.classList.add('project-entry');
    // newProjDom.innerHTML = `${projectName}`
    let nameForm = document.createElement('form');
    nameForm.setAttribute('onsubmit','return false');
    nameForm.innerHTML = '<input type="text" id="title" name="title" ><br></form>'
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = `x`
    removeButton.addEventListener('click', e => {
      removeProject(e.target.parentNode)
    });
    newProjDom.appendChild(nameForm);
    newProjDom.appendChild(removeButton);
    
    nameForm.addEventListener('submit',e =>{

      projectName = nameForm.elements['title'].value;
      newProjDom.setAttribute('id',`${projectName}`);
      projectContainer.setProject(e.target.parentNode.id)
      projectContainer.addProject(projectName)
      newProjDom.innerHTML = projectName;
      newProjDom.appendChild(removeButton)
    })
    
  }
  const appendItem = (itemName) => {
    let newProjDom = document.createElement('div');
    let removeButton = document.createElement('div');
    let addItemButton = document.getElementById('add-item')
    let projectName = ""
    newProjDom.addEventListener('click', e =>{
      // projectContainer.setProject(e.target.id)
      // newProjDom.classList.toggle('project-entry-highlight')
    });
    todolistspace.insertBefore(newProjDom, addItemButton)

    newProjDom.classList.add('item-entry');
    // newProjDom.innerHTML = `${projectName}`
    let nameForm = document.createElement('form');
    nameForm.setAttribute('onsubmit','return false');
    nameForm.innerHTML = '<input type="text" id="title" name="title" ><br></form>'
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = `x`
    removeButton.addEventListener('click', e => {
      removeItem(e.target.parentNode)
    });
    newProjDom.appendChild(nameForm);
    newProjDom.appendChild(removeButton);
    
    nameForm.addEventListener('submit',e =>{
      itemName = nameForm.elements['title'].value;
      newProjDom.innerHTML = itemName;
      newProjDom.appendChild(removeButton)
      newProjDom.setAttribute('id',`${itemName}`);
      projectContainer.projectList[`${projectContainer.getCurrentProject()}`].addItem(todoItem(`${itemName}`, "do your laundry", new Date(2020, 1, 11),'low'),`${projectContainer.getCurrentProject()}`)
    })
  }

  const removeProject = (project) => {
    
    if(project === null){
      return
    }
    sideBar.removeChild(project)
  }

  const removeItem = (item) => {
    if(item === null){
      return
    }
    todolistspace.removeChild(item)
  }


  return {startUp, appendProject, appendItem, removeProject, removeItem}

})();

const projectContainer = (() => {
  let projectList = {};
  let selected_project = null
  const addProject = (projectName) =>{
    projectList[projectName] = project()
  }
  const removeProject = (projectName) =>{
    manipulateDOM.removeProject(projectName);
    delete projectList[projectName];
  }

  const setProject = (projectName) => {
    selected_project = projectName;
  }

  const getCurrentProject = () => selected_project

  return {projectList, addProject, removeProject, selected_project, setProject, getCurrentProject};
})();


manipulateDOM.startUp()
