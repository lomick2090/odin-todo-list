/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
let taskControl = (() => {

    let lists = [];

    function createList(name) {
        lists.push({name,
            tasks: []
        });
    }

    function addTask(listItem, taskName, taskDesc, taskDue,) {
        lists[listItem].tasks.push({
            name: taskName,
            desc: taskDesc,
            due: taskDue
        })
    }

    return {
        createList,
        lists,
        addTask,
    }

})();

function updateStorage() {
    localStorage.setItem('lists', JSON.stringify(taskControl.lists));
}

function updateFromStorage() {

    let storedLists = JSON.parse(localStorage.getItem('lists'));
    for(i = 0; i < storedLists.length; i++) {
        taskControl.lists.push(storedLists[i]);
    }
}

function createListPrompt() {
    let listFormDiv = document.createElement('div')
    listFormDiv.className = 'listformdiv';

    let listForm = document.createElement('form');
    listForm.className = 'listform';

    let listHeader = document.createElement('h1');
    listHeader.textContent = 'Add List:';

    let listInputLabel = document.createElement('label');
    listInputLabel.for = 'listname'
    listInputLabel.textContent = 'List Name: '

    let listInput = document.createElement('input');
    listInput.type = 'text';
    listInput.id = 'listname';
    listInput.name = 'listname';

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Add';
    submitButton.addEventListener('click', () => {
        event.preventDefault();
        document.querySelector('.page').id = '';
        if (listInput.value != '') {
            taskControl.createList(listInput.value);
            updateStorage();
            populateLists();
        }
        listForm.reset();
        listFormDiv.remove();
    });

    listInputLabel.appendChild(listInput);
    listForm.appendChild(listHeader);
    listForm.appendChild(listInputLabel);
    listForm.appendChild(submitButton);
    listFormDiv.appendChild(listForm);

    document.querySelector('body').appendChild(listFormDiv);

    document.querySelector('.page').id = 'blur';
    
}

function populateLists() {
    while (document.querySelector('.tasklists').firstChild) {
        document.querySelector('.tasklists').firstChild.remove()
    }
    
    for (let i = 0; i< taskControl.lists.length; i++) {
        let newListDiv = document.createElement('div');
        let newList = document.createElement('li');
        newListDiv.className = 'listnames'
        newListDiv.id = i
        newList.textContent = taskControl.lists[i].name;

        let newListButton = document.createElement('button');
        newListButton.textContent = 'X';
        newListButton.addEventListener('click', deleteList);

        newListDiv.appendChild(newList);
        newListDiv.appendChild(newListButton);
        document.querySelector('.tasklists').appendChild(newListDiv);
        newListDiv.addEventListener('click', () =>  populateTaskPage(newListDiv.id));
    }
}

function deleteList() {
    listIndex = this.parentNode.id;
    taskControl.lists.splice(listIndex, 1);
    updateStorage();
    populateLists();
}

function populateTaskPage(listIndex) {
    while (document.querySelector('.list').firstChild) {
        document.querySelector('.list').firstChild.remove();
    }

    let taskDiv = document.querySelector('.tasktitle');

    while (taskDiv.firstChild) {
        taskDiv.firstChild.remove();
    }

    let taskHeader = document.createElement ('h1');
    taskHeader.textContent = `${taskControl.lists[listIndex].name}`;

    let addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task +';
    addTaskButton.addEventListener('click', () => createTaskPrompt(listIndex));

    taskDiv.appendChild(taskHeader);
    taskDiv.appendChild(addTaskButton);
    populateTasks(listIndex);
}

function createTaskPrompt(listIndex) {

    //listItem, taskName, taskDesc, taskDue
    let taskFormDiv = document.createElement('div')
    taskFormDiv.className = 'taskformdiv';

    let taskForm = document.createElement('form');
    taskForm.className = 'taskform';

    let taskHeader = document.createElement('h1');
    taskHeader.textContent = 'Add Task to List:';

    let taskNameInputLabel = document.createElement('label');
    taskNameInputLabel.for = 'taskname'
    taskNameInputLabel.textContent = 'Task Name: '

    let taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.id = 'taskname';
    taskNameInput.name = 'taskname';
    taskNameInputLabel.appendChild(taskNameInput)

    let taskDescInputLabel = document.createElement('label');
    taskDescInputLabel.for = 'taskdesc'
    taskDescInputLabel.textContent = 'Task Description: '

    let taskDescInput = document.createElement('input');
    taskDescInput.type = 'text';
    taskDescInput.id = 'taskdesc';
    taskDescInput.name = 'taskdesc';
    taskDescInputLabel.appendChild(taskDescInput)

    let taskDueInputLabel = document.createElement('label');
    taskDueInputLabel.for = 'taskdue'
    taskDueInputLabel.textContent = 'Task Due Date: '

    let taskDueInput = document.createElement('input');
    taskDueInput.type = 'date';
    taskDueInput.id = 'taskdue';
    taskDueInput.name = 'taskdue';
    taskDueInputLabel.appendChild(taskDueInput)

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Add';
    submitButton.addEventListener('click', () => {
        event.preventDefault();
        taskControl.addTask(listIndex, taskNameInput.value, taskDescInput.value, taskDueInput.value);
        updateStorage();
        populateTaskPage(listIndex);
        taskForm.reset();
        document.querySelector('.page').id = '';
        taskFormDiv.remove();
    });



    taskFormDiv.appendChild(taskHeader);
    taskForm.appendChild(taskNameInputLabel);
    taskForm.appendChild(taskDescInputLabel);
    taskForm.appendChild(taskDueInputLabel);
    taskForm.appendChild(submitButton);
    taskFormDiv.appendChild(taskForm);

    document.querySelector('body').appendChild(taskFormDiv);

    document.querySelector('.page').id = 'blur';


}

function populateTasks(listIndex) {
    while (document.querySelector('.tasks')) {
        document.querySelector('.tasks').remove()
    }
    

    for (let i = 0; i < (taskControl.lists[listIndex].tasks.length); i++) {
        let newTaskDiv = document.createElement('div');
        newTaskDiv.id = i;
        newTaskDiv.className = 'tasks'

        let newTaskHeader = document.createElement('h3');
        newTaskHeader.textContent = taskControl.lists[listIndex].tasks[i].name
        newTaskDiv.appendChild(newTaskHeader);

        let newTaskDesc = document.createElement('p');
        newTaskDesc.textContent = taskControl.lists[listIndex].tasks[i].desc
        newTaskDiv.appendChild(newTaskDesc);

        let newTaskDue = document.createElement('p');
        newTaskDue.textContent = `Due by: ${taskControl.lists[listIndex].tasks[i].due}`;
        newTaskDiv.appendChild(newTaskDue);

        let newTaskButton = document.createElement('button');
        newTaskButton.textContent = 'X';
        newTaskButton.className = 'taskDeleteButton';
        newTaskButton.addEventListener('click', () => deleteTask(listIndex, i));

        let taskEditButton = document.createElement('button');
        taskEditButton.textContent = 'Edit';
        taskEditButton.className = 'taskEditButton';
        taskEditButton.addEventListener('click', () => createEditTaskPrompt(listIndex, i));

        let buttonDiv = document.createElement('div');
        buttonDiv.className = 'buttondiv';
        buttonDiv.appendChild(taskEditButton);
        buttonDiv.appendChild(newTaskButton);
        newTaskDiv.appendChild(buttonDiv);

        document.querySelector('.list').appendChild(newTaskDiv);

    }

    
}

function deleteTask(listIndex, taskIndex) {
    taskControl.lists[listIndex].tasks.splice(taskIndex, 1);
    updateStorage();
    populateTasks(listIndex);
}

function createEditTaskPrompt(listIndex, taskIndex) {
    let taskFormDiv = document.createElement('div')
    taskFormDiv.className = 'taskformdiv';

    let taskForm = document.createElement('form');
    taskForm.className = 'taskform';

    let taskHeader = document.createElement('h1');
    taskHeader.textContent = 'Edit Task:';

    let taskNameInputLabel = document.createElement('label');
    taskNameInputLabel.for = 'taskname'
    taskNameInputLabel.textContent = 'Task Name: '

    let taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.id = 'taskname';
    taskNameInput.name = 'taskname';
    taskNameInputLabel.appendChild(taskNameInput)

    let taskDescInputLabel = document.createElement('label');
    taskDescInputLabel.for = 'taskdesc'
    taskDescInputLabel.textContent = 'Task Description: '

    let taskDescInput = document.createElement('input');
    taskDescInput.type = 'text';
    taskDescInput.id = 'taskdesc';
    taskDescInput.name = 'taskdesc';
    taskDescInputLabel.appendChild(taskDescInput)

    let taskDueInputLabel = document.createElement('label');
    taskDueInputLabel.for = 'taskdue'
    taskDueInputLabel.textContent = 'Task Due Date: '

    let taskDueInput = document.createElement('input');
    taskDueInput.type = 'date';
    taskDueInput.id = 'taskdue';
    taskDueInput.name = 'taskdue';
    taskDueInputLabel.appendChild(taskDueInput)

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Add';
    submitButton.addEventListener('click', () => {
        event.preventDefault();
        taskControl.lists[listIndex].tasks[taskIndex].name = taskNameInput.value;
        taskControl.lists[listIndex].tasks[taskIndex].desc = taskDescInput.value;
        taskControl.lists[listIndex].tasks[taskIndex].due = taskDueInput.value;
        updateStorage();
        populateTaskPage(listIndex);
        taskForm.reset();
        document.querySelector('.page').id = '';
        taskFormDiv.remove();
    });



    taskFormDiv.appendChild(taskHeader);
    taskForm.appendChild(taskNameInputLabel);
    taskForm.appendChild(taskDescInputLabel);
    taskForm.appendChild(taskDueInputLabel);
    taskForm.appendChild(submitButton);
    taskFormDiv.appendChild(taskForm);

    document.querySelector('body').appendChild(taskFormDiv);

    document.querySelector('.page').id = 'blur';
}

document.querySelector('.addlistbutton').addEventListener('click', () => createListPrompt())

if (localStorage.getItem('lists')) {
    updateFromStorage();
    populateLists();
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGVBQWUsd0JBQXdCO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNkJBQTZCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQWdDLGtDQUFrQzs7QUFFbEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7O0FBSUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQixpREFBaUQ7QUFDckU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0Q0FBNEMsMENBQTBDO0FBQ3RGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7OztBQUlMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vb2Rpbi10b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IHRhc2tDb250cm9sID0gKCgpID0+IHtcblxuICAgIGxldCBsaXN0cyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlTGlzdChuYW1lKSB7XG4gICAgICAgIGxpc3RzLnB1c2goe25hbWUsXG4gICAgICAgICAgICB0YXNrczogW11cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFzayhsaXN0SXRlbSwgdGFza05hbWUsIHRhc2tEZXNjLCB0YXNrRHVlLCkge1xuICAgICAgICBsaXN0c1tsaXN0SXRlbV0udGFza3MucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiB0YXNrTmFtZSxcbiAgICAgICAgICAgIGRlc2M6IHRhc2tEZXNjLFxuICAgICAgICAgICAgZHVlOiB0YXNrRHVlXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlTGlzdCxcbiAgICAgICAgbGlzdHMsXG4gICAgICAgIGFkZFRhc2ssXG4gICAgfVxuXG59KSgpO1xuXG5mdW5jdGlvbiB1cGRhdGVTdG9yYWdlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsaXN0cycsIEpTT04uc3RyaW5naWZ5KHRhc2tDb250cm9sLmxpc3RzKSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUZyb21TdG9yYWdlKCkge1xuXG4gICAgbGV0IHN0b3JlZExpc3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlzdHMnKSk7XG4gICAgZm9yKGkgPSAwOyBpIDwgc3RvcmVkTGlzdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGFza0NvbnRyb2wubGlzdHMucHVzaChzdG9yZWRMaXN0c1tpXSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVMaXN0UHJvbXB0KCkge1xuICAgIGxldCBsaXN0Rm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbGlzdEZvcm1EaXYuY2xhc3NOYW1lID0gJ2xpc3Rmb3JtZGl2JztcblxuICAgIGxldCBsaXN0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBsaXN0Rm9ybS5jbGFzc05hbWUgPSAnbGlzdGZvcm0nO1xuXG4gICAgbGV0IGxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGxpc3RIZWFkZXIudGV4dENvbnRlbnQgPSAnQWRkIExpc3Q6JztcblxuICAgIGxldCBsaXN0SW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgbGlzdElucHV0TGFiZWwuZm9yID0gJ2xpc3RuYW1lJ1xuICAgIGxpc3RJbnB1dExhYmVsLnRleHRDb250ZW50ID0gJ0xpc3QgTmFtZTogJ1xuXG4gICAgbGV0IGxpc3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbGlzdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgbGlzdElucHV0LmlkID0gJ2xpc3RuYW1lJztcbiAgICBsaXN0SW5wdXQubmFtZSA9ICdsaXN0bmFtZSc7XG5cbiAgICBsZXQgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZScpLmlkID0gJyc7XG4gICAgICAgIGlmIChsaXN0SW5wdXQudmFsdWUgIT0gJycpIHtcbiAgICAgICAgICAgIHRhc2tDb250cm9sLmNyZWF0ZUxpc3QobGlzdElucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIHVwZGF0ZVN0b3JhZ2UoKTtcbiAgICAgICAgICAgIHBvcHVsYXRlTGlzdHMoKTtcbiAgICAgICAgfVxuICAgICAgICBsaXN0Rm9ybS5yZXNldCgpO1xuICAgICAgICBsaXN0Rm9ybURpdi5yZW1vdmUoKTtcbiAgICB9KTtcblxuICAgIGxpc3RJbnB1dExhYmVsLmFwcGVuZENoaWxkKGxpc3RJbnB1dCk7XG4gICAgbGlzdEZvcm0uYXBwZW5kQ2hpbGQobGlzdEhlYWRlcik7XG4gICAgbGlzdEZvcm0uYXBwZW5kQ2hpbGQobGlzdElucHV0TGFiZWwpO1xuICAgIGxpc3RGb3JtLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4gICAgbGlzdEZvcm1EaXYuYXBwZW5kQ2hpbGQobGlzdEZvcm0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKGxpc3RGb3JtRGl2KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuaWQgPSAnYmx1cic7XG4gICAgXG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlTGlzdHMoKSB7XG4gICAgd2hpbGUgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrbGlzdHMnKS5maXJzdENoaWxkKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrbGlzdHMnKS5maXJzdENoaWxkLnJlbW92ZSgpXG4gICAgfVxuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpPCB0YXNrQ29udHJvbC5saXN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgbmV3TGlzdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBsZXQgbmV3TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIG5ld0xpc3REaXYuY2xhc3NOYW1lID0gJ2xpc3RuYW1lcydcbiAgICAgICAgbmV3TGlzdERpdi5pZCA9IGlcbiAgICAgICAgbmV3TGlzdC50ZXh0Q29udGVudCA9IHRhc2tDb250cm9sLmxpc3RzW2ldLm5hbWU7XG5cbiAgICAgICAgbGV0IG5ld0xpc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgbmV3TGlzdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgICAgbmV3TGlzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRlbGV0ZUxpc3QpO1xuXG4gICAgICAgIG5ld0xpc3REaXYuYXBwZW5kQ2hpbGQobmV3TGlzdCk7XG4gICAgICAgIG5ld0xpc3REaXYuYXBwZW5kQ2hpbGQobmV3TGlzdEJ1dHRvbik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrbGlzdHMnKS5hcHBlbmRDaGlsZChuZXdMaXN0RGl2KTtcbiAgICAgICAgbmV3TGlzdERpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+ICBwb3B1bGF0ZVRhc2tQYWdlKG5ld0xpc3REaXYuaWQpKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUxpc3QoKSB7XG4gICAgbGlzdEluZGV4ID0gdGhpcy5wYXJlbnROb2RlLmlkO1xuICAgIHRhc2tDb250cm9sLmxpc3RzLnNwbGljZShsaXN0SW5kZXgsIDEpO1xuICAgIHVwZGF0ZVN0b3JhZ2UoKTtcbiAgICBwb3B1bGF0ZUxpc3RzKCk7XG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlVGFza1BhZ2UobGlzdEluZGV4KSB7XG4gICAgd2hpbGUgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0JykuZmlyc3RDaGlsZCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdCcpLmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgbGV0IHRhc2tEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza3RpdGxlJyk7XG5cbiAgICB3aGlsZSAodGFza0Rpdi5maXJzdENoaWxkKSB7XG4gICAgICAgIHRhc2tEaXYuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBsZXQgdGFza0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgKCdoMScpO1xuICAgIHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSBgJHt0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLm5hbWV9YDtcblxuICAgIGxldCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYWRkVGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgVGFzayArJztcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY3JlYXRlVGFza1Byb21wdChsaXN0SW5kZXgpKTtcblxuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0hlYWRlcik7XG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZChhZGRUYXNrQnV0dG9uKTtcbiAgICBwb3B1bGF0ZVRhc2tzKGxpc3RJbmRleCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2tQcm9tcHQobGlzdEluZGV4KSB7XG5cbiAgICAvL2xpc3RJdGVtLCB0YXNrTmFtZSwgdGFza0Rlc2MsIHRhc2tEdWVcbiAgICBsZXQgdGFza0Zvcm1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHRhc2tGb3JtRGl2LmNsYXNzTmFtZSA9ICd0YXNrZm9ybWRpdic7XG5cbiAgICBsZXQgdGFza0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgdGFza0Zvcm0uY2xhc3NOYW1lID0gJ3Rhc2tmb3JtJztcblxuICAgIGxldCB0YXNrSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICB0YXNrSGVhZGVyLnRleHRDb250ZW50ID0gJ0FkZCBUYXNrIHRvIExpc3Q6JztcblxuICAgIGxldCB0YXNrTmFtZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRhc2tOYW1lSW5wdXRMYWJlbC5mb3IgPSAndGFza25hbWUnXG4gICAgdGFza05hbWVJbnB1dExhYmVsLnRleHRDb250ZW50ID0gJ1Rhc2sgTmFtZTogJ1xuXG4gICAgbGV0IHRhc2tOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRhc2tOYW1lSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICB0YXNrTmFtZUlucHV0LmlkID0gJ3Rhc2tuYW1lJztcbiAgICB0YXNrTmFtZUlucHV0Lm5hbWUgPSAndGFza25hbWUnO1xuICAgIHRhc2tOYW1lSW5wdXRMYWJlbC5hcHBlbmRDaGlsZCh0YXNrTmFtZUlucHV0KVxuXG4gICAgbGV0IHRhc2tEZXNjSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGFza0Rlc2NJbnB1dExhYmVsLmZvciA9ICd0YXNrZGVzYydcbiAgICB0YXNrRGVzY0lucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnVGFzayBEZXNjcmlwdGlvbjogJ1xuXG4gICAgbGV0IHRhc2tEZXNjSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgIHRhc2tEZXNjSW5wdXQudHlwZSA9ICd0ZXh0JztcbiAgICB0YXNrRGVzY0lucHV0LmlkID0gJ3Rhc2tkZXNjJztcbiAgICB0YXNrRGVzY0lucHV0Lm5hbWUgPSAndGFza2Rlc2MnO1xuICAgIHRhc2tEZXNjSW5wdXRMYWJlbC5hcHBlbmRDaGlsZCh0YXNrRGVzY0lucHV0KVxuXG4gICAgbGV0IHRhc2tEdWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0YXNrRHVlSW5wdXRMYWJlbC5mb3IgPSAndGFza2R1ZSdcbiAgICB0YXNrRHVlSW5wdXRMYWJlbC50ZXh0Q29udGVudCA9ICdUYXNrIER1ZSBEYXRlOiAnXG5cbiAgICBsZXQgdGFza0R1ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0YXNrRHVlSW5wdXQudHlwZSA9ICdkYXRlJztcbiAgICB0YXNrRHVlSW5wdXQuaWQgPSAndGFza2R1ZSc7XG4gICAgdGFza0R1ZUlucHV0Lm5hbWUgPSAndGFza2R1ZSc7XG4gICAgdGFza0R1ZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQodGFza0R1ZUlucHV0KVxuXG4gICAgbGV0IHN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgIHN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGFza0NvbnRyb2wuYWRkVGFzayhsaXN0SW5kZXgsIHRhc2tOYW1lSW5wdXQudmFsdWUsIHRhc2tEZXNjSW5wdXQudmFsdWUsIHRhc2tEdWVJbnB1dC52YWx1ZSk7XG4gICAgICAgIHVwZGF0ZVN0b3JhZ2UoKTtcbiAgICAgICAgcG9wdWxhdGVUYXNrUGFnZShsaXN0SW5kZXgpO1xuICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZScpLmlkID0gJyc7XG4gICAgICAgIHRhc2tGb3JtRGl2LnJlbW92ZSgpO1xuICAgIH0pO1xuXG5cblxuICAgIHRhc2tGb3JtRGl2LmFwcGVuZENoaWxkKHRhc2tIZWFkZXIpO1xuICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHRhc2tOYW1lSW5wdXRMYWJlbCk7XG4gICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza0Rlc2NJbnB1dExhYmVsKTtcbiAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZCh0YXNrRHVlSW5wdXRMYWJlbCk7XG4gICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQoc3VibWl0QnV0dG9uKTtcbiAgICB0YXNrRm9ybURpdi5hcHBlbmRDaGlsZCh0YXNrRm9ybSk7XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQodGFza0Zvcm1EaXYpO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5pZCA9ICdibHVyJztcblxuXG59XG5cbmZ1bmN0aW9uIHBvcHVsYXRlVGFza3MobGlzdEluZGV4KSB7XG4gICAgd2hpbGUgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcycpKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrcycpLnJlbW92ZSgpXG4gICAgfVxuICAgIFxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAodGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrcy5sZW5ndGgpOyBpKyspIHtcbiAgICAgICAgbGV0IG5ld1Rhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgbmV3VGFza0Rpdi5pZCA9IGk7XG4gICAgICAgIG5ld1Rhc2tEaXYuY2xhc3NOYW1lID0gJ3Rhc2tzJ1xuXG4gICAgICAgIGxldCBuZXdUYXNrSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgbmV3VGFza0hlYWRlci50ZXh0Q29udGVudCA9IHRhc2tDb250cm9sLmxpc3RzW2xpc3RJbmRleF0udGFza3NbaV0ubmFtZVxuICAgICAgICBuZXdUYXNrRGl2LmFwcGVuZENoaWxkKG5ld1Rhc2tIZWFkZXIpO1xuXG4gICAgICAgIGxldCBuZXdUYXNrRGVzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgbmV3VGFza0Rlc2MudGV4dENvbnRlbnQgPSB0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLnRhc2tzW2ldLmRlc2NcbiAgICAgICAgbmV3VGFza0Rpdi5hcHBlbmRDaGlsZChuZXdUYXNrRGVzYyk7XG5cbiAgICAgICAgbGV0IG5ld1Rhc2tEdWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIG5ld1Rhc2tEdWUudGV4dENvbnRlbnQgPSBgRHVlIGJ5OiAke3Rhc2tDb250cm9sLmxpc3RzW2xpc3RJbmRleF0udGFza3NbaV0uZHVlfWA7XG4gICAgICAgIG5ld1Rhc2tEaXYuYXBwZW5kQ2hpbGQobmV3VGFza0R1ZSk7XG5cbiAgICAgICAgbGV0IG5ld1Rhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgbmV3VGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICdYJztcbiAgICAgICAgbmV3VGFza0J1dHRvbi5jbGFzc05hbWUgPSAndGFza0RlbGV0ZUJ1dHRvbic7XG4gICAgICAgIG5ld1Rhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBkZWxldGVUYXNrKGxpc3RJbmRleCwgaSkpO1xuXG4gICAgICAgIGxldCB0YXNrRWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICB0YXNrRWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdFZGl0JztcbiAgICAgICAgdGFza0VkaXRCdXR0b24uY2xhc3NOYW1lID0gJ3Rhc2tFZGl0QnV0dG9uJztcbiAgICAgICAgdGFza0VkaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjcmVhdGVFZGl0VGFza1Byb21wdChsaXN0SW5kZXgsIGkpKTtcblxuICAgICAgICBsZXQgYnV0dG9uRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJ1dHRvbkRpdi5jbGFzc05hbWUgPSAnYnV0dG9uZGl2JztcbiAgICAgICAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKHRhc2tFZGl0QnV0dG9uKTtcbiAgICAgICAgYnV0dG9uRGl2LmFwcGVuZENoaWxkKG5ld1Rhc2tCdXR0b24pO1xuICAgICAgICBuZXdUYXNrRGl2LmFwcGVuZENoaWxkKGJ1dHRvbkRpdik7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QnKS5hcHBlbmRDaGlsZChuZXdUYXNrRGl2KTtcblxuICAgIH1cblxuICAgIFxufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrKGxpc3RJbmRleCwgdGFza0luZGV4KSB7XG4gICAgdGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrcy5zcGxpY2UodGFza0luZGV4LCAxKTtcbiAgICB1cGRhdGVTdG9yYWdlKCk7XG4gICAgcG9wdWxhdGVUYXNrcyhsaXN0SW5kZXgpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFZGl0VGFza1Byb21wdChsaXN0SW5kZXgsIHRhc2tJbmRleCkge1xuICAgIGxldCB0YXNrRm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgdGFza0Zvcm1EaXYuY2xhc3NOYW1lID0gJ3Rhc2tmb3JtZGl2JztcblxuICAgIGxldCB0YXNrRm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICB0YXNrRm9ybS5jbGFzc05hbWUgPSAndGFza2Zvcm0nO1xuXG4gICAgbGV0IHRhc2tIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSAnRWRpdCBUYXNrOic7XG5cbiAgICBsZXQgdGFza05hbWVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICB0YXNrTmFtZUlucHV0TGFiZWwuZm9yID0gJ3Rhc2tuYW1lJ1xuICAgIHRhc2tOYW1lSW5wdXRMYWJlbC50ZXh0Q29udGVudCA9ICdUYXNrIE5hbWU6ICdcblxuICAgIGxldCB0YXNrTmFtZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0YXNrTmFtZUlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgdGFza05hbWVJbnB1dC5pZCA9ICd0YXNrbmFtZSc7XG4gICAgdGFza05hbWVJbnB1dC5uYW1lID0gJ3Rhc2tuYW1lJztcbiAgICB0YXNrTmFtZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQodGFza05hbWVJbnB1dClcblxuICAgIGxldCB0YXNrRGVzY0lucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgIHRhc2tEZXNjSW5wdXRMYWJlbC5mb3IgPSAndGFza2Rlc2MnXG4gICAgdGFza0Rlc2NJbnB1dExhYmVsLnRleHRDb250ZW50ID0gJ1Rhc2sgRGVzY3JpcHRpb246ICdcblxuICAgIGxldCB0YXNrRGVzY0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICB0YXNrRGVzY0lucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgdGFza0Rlc2NJbnB1dC5pZCA9ICd0YXNrZGVzYyc7XG4gICAgdGFza0Rlc2NJbnB1dC5uYW1lID0gJ3Rhc2tkZXNjJztcbiAgICB0YXNrRGVzY0lucHV0TGFiZWwuYXBwZW5kQ2hpbGQodGFza0Rlc2NJbnB1dClcblxuICAgIGxldCB0YXNrRHVlSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgdGFza0R1ZUlucHV0TGFiZWwuZm9yID0gJ3Rhc2tkdWUnXG4gICAgdGFza0R1ZUlucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnVGFzayBEdWUgRGF0ZTogJ1xuXG4gICAgbGV0IHRhc2tEdWVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgdGFza0R1ZUlucHV0LnR5cGUgPSAnZGF0ZSc7XG4gICAgdGFza0R1ZUlucHV0LmlkID0gJ3Rhc2tkdWUnO1xuICAgIHRhc2tEdWVJbnB1dC5uYW1lID0gJ3Rhc2tkdWUnO1xuICAgIHRhc2tEdWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKHRhc2tEdWVJbnB1dClcblxuICAgIGxldCBzdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBzdWJtaXRCdXR0b24udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRhc2tDb250cm9sLmxpc3RzW2xpc3RJbmRleF0udGFza3NbdGFza0luZGV4XS5uYW1lID0gdGFza05hbWVJbnB1dC52YWx1ZTtcbiAgICAgICAgdGFza0NvbnRyb2wubGlzdHNbbGlzdEluZGV4XS50YXNrc1t0YXNrSW5kZXhdLmRlc2MgPSB0YXNrRGVzY0lucHV0LnZhbHVlO1xuICAgICAgICB0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLnRhc2tzW3Rhc2tJbmRleF0uZHVlID0gdGFza0R1ZUlucHV0LnZhbHVlO1xuICAgICAgICB1cGRhdGVTdG9yYWdlKCk7XG4gICAgICAgIHBvcHVsYXRlVGFza1BhZ2UobGlzdEluZGV4KTtcbiAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5pZCA9ICcnO1xuICAgICAgICB0YXNrRm9ybURpdi5yZW1vdmUoKTtcbiAgICB9KTtcblxuXG5cbiAgICB0YXNrRm9ybURpdi5hcHBlbmRDaGlsZCh0YXNrSGVhZGVyKTtcbiAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZCh0YXNrTmFtZUlucHV0TGFiZWwpO1xuICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHRhc2tEZXNjSW5wdXRMYWJlbCk7XG4gICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza0R1ZUlucHV0TGFiZWwpO1xuICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4gICAgdGFza0Zvcm1EaXYuYXBwZW5kQ2hpbGQodGFza0Zvcm0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHRhc2tGb3JtRGl2KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuaWQgPSAnYmx1cic7XG59XG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGRsaXN0YnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBjcmVhdGVMaXN0UHJvbXB0KCkpXG5cbmlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbGlzdHMnKSkge1xuICAgIHVwZGF0ZUZyb21TdG9yYWdlKCk7XG4gICAgcG9wdWxhdGVMaXN0cygpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9