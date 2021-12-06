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
    manipulateDOM.appendItem(item.getItem().title)
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
    projectContainer.addProject()


  }

  const appendProject = () => {
    let newProjDom = document.createElement('div');
    let removeButton = document.createElement('div');
    let addProjButton = document.getElementById('add-project')
    let projectName = ""
    sideBar.insertBefore(newProjDom, addProjButton)

    newProjDom.classList.add('project-entry');
    // newProjDom.innerHTML = `${projectName}`
    newProjDom.innerHTML = `<form id = "project-name-form" onsubmit = "return false" >
              <input type="text" id="title" name="title" ><br></form>`;
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = `x`
    removeButton.addEventListener('click', e => {
      removeProject(e.target.parentNode.id)
    })
    newProjDom.appendChild(removeButton)
    let form = document.querySelector('#project-name-form')
    form.addEventListener('submit',e =>{
      projectName = form.elements['title'].value;
      newProjDom.innerHTML = projectName;
      newProjDom.appendChild(removeButton)
      newProjDom.setAttribute('id',`${projectName}-project`);
      projectContainer.addProject(projectName)
    })
    return projectName
    
  }
  const appendItem = (itemName) => {
    let newItemDom = document.createElement('div');
    let addItemButton = document.getElementById('add-item')
    newItemDom.setAttribute('id',`${itemName}`);
    newItemDom.classList.add('item-entry');
    newItemDom.innerHTML = `${itemName}`
    let removeButton = document.createElement('div');
    removeButton.classList.add('remove-button');
    removeButton.innerHTML = `x`
    removeButton.addEventListener('click', e => {
      removeItem(e.target.parentNode.id)
    })
    newItemDom.appendChild(removeButton)
    todolistspace.insertBefore(newItemDom, addItemButton)
  }

  const removeProject = (projectId) => {
    let toRemoveDiv = document.getElementById(`${projectId}`)
    if(toRemoveDiv === null){
      return
    }
    sideBar.removeChild(toRemoveDiv)
  }

  const removeItem = (itemName) => {
    let toRemoveDiv = document.getElementById(`${itemName}`)
    if(toRemoveDiv === null){
      return
    }
    todolistspace.removeChild(toRemoveDiv)
  }


  return {startUp, appendProject, appendItem, removeProject, removeItem}

})();

const projectContainer = (() => {
  let projectList = {};
  const addProject = (projectName) =>{
    projectList[projectName] = project()
  }
  const removeProject = (projectName) =>{
    delete projectList[projectName]
    manipulateDOM.removeProject(projectName)
  }

  return {projectList, addProject, removeProject};
})();


manipulateDOM.startUp()


// projectContainer.projectList.defaultProject.addItem(todoItem("laundry", "do your laundry", new Date(2020, 1, 11),'low'))

// projectContainer.projectList['defaultProject'].changeItemProject('laundry','home')



