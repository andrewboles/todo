// import { format, compareAsc } from 'date-fns'

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
  }
  const changeItemProject = (itemTitle, newProject) => {
    itemList[itemTitle].change('projectSet', newProject)
    projectContainer.projectList[newProject].addItem(itemList[itemTitle])
    removeItem(itemList[itemTitle])
  }

  return {itemList, addItem, removeItem, changeItemProject};
}

const manipulateDOM = (() =>{
  const startUp = () =>{
    let mainContent = document.createElement('div')
    mainContent.setAttribute('id',`content`);
    document.body.appendChild(mainContent)
  }
  return {startUp}

})();

const projectContainer = (() => {
  let projectList = {};
  const addProject = (projectName) =>{
    projectList[projectName] = project()
  }
  const removeProject = (projectName) =>{
    delete projectList[projectName]
  }

  return {projectList, addProject, removeProject};
})();


projectContainer.addProject('defaultProject')
projectContainer.addProject('home')

// console.log(projectContainer.projectList.default)

projectContainer.projectList.defaultProject.addItem(todoItem("laundry", "do your laundry", new Date(2020, 1, 11),'low'))
projectContainer.projectList.defaultProject.addItem(todoItem("taxes", "do your taxes", new Date(2020, 1, 11),'low'))

// console.log(projectContainer.projectList.default.itemList)
projectContainer.projectList['defaultProject'].itemList.laundry.change('description','make sure to only dry')

projectContainer.projectList['defaultProject'].changeItemProject('laundry','home')
// console.log(laundry.getItem().title)
console.log(projectContainer.projectList.home.itemList.laundry.getItem())
console.log(projectContainer.projectList.defaultProject.itemList)
console.log(projectContainer.projectList.home.itemList)

manipulateDOM.startUp()

