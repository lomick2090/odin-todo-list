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
        document.querySelector('.tasklists').firstChild.remove();
    }
    
    for (let i = 0; i< taskControl.lists.length; i++) {
        let newListDiv = document.createElement('div');
        let newList = document.createElement('li');
        newListDiv.className = 'listnames'
        newListDiv.id = i;
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
    let taskFormDiv = document.createElement('div');
    taskFormDiv.className = 'taskformdiv';

    let taskForm = document.createElement('form');
    taskForm.className = 'taskform';

    let taskHeader = document.createElement('h1');
    taskHeader.textContent = 'Add Task to List:';

    let taskNameInputLabel = document.createElement('label');
    taskNameInputLabel.for = 'taskname';
    taskNameInputLabel.textContent = 'Task Name: ';

    let taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.id = 'taskname';
    taskNameInput.name = 'taskname';
    taskNameInputLabel.appendChild(taskNameInput)

    let taskDescInputLabel = document.createElement('label');
    taskDescInputLabel.for = 'taskdesc';
    taskDescInputLabel.textContent = 'Task Description: ';

    let taskDescInput = document.createElement('input');
    taskDescInput.type = 'text';
    taskDescInput.id = 'taskdesc';
    taskDescInput.name = 'taskdesc';
    taskDescInputLabel.appendChild(taskDescInput)

    let taskDueInputLabel = document.createElement('label');
    taskDueInputLabel.for = 'taskdue';
    taskDueInputLabel.textContent = 'Task Due Date: ';

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
        document.querySelector('.tasks').remove();
    }
    

    for (let i = 0; i < (taskControl.lists[listIndex].tasks.length); i++) {
        let newTaskDiv = document.createElement('div');
        newTaskDiv.id = i;
        newTaskDiv.className = 'tasks';

        let newTaskHeader = document.createElement('h3');
        newTaskHeader.textContent = taskControl.lists[listIndex].tasks[i].name;
        newTaskDiv.appendChild(newTaskHeader);

        let newTaskDesc = document.createElement('p');
        newTaskDesc.textContent = taskControl.lists[listIndex].tasks[i].desc;
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
    let taskFormDiv = document.createElement('div');
    taskFormDiv.className = 'taskformdiv';

    let taskForm = document.createElement('form');
    taskForm.className = 'taskform';

    let taskHeader = document.createElement('h1');
    taskHeader.textContent = 'Edit Task:';

    let taskNameInputLabel = document.createElement('label');
    taskNameInputLabel.for = 'taskname';
    taskNameInputLabel.textContent = 'Task Name: ';

    let taskNameInput = document.createElement('input');
    taskNameInput.type = 'text';
    taskNameInput.id = 'taskname';
    taskNameInput.name = 'taskname';
    taskNameInput.defaultValue = taskControl.lists[listIndex].tasks[taskIndex].name
    taskNameInputLabel.appendChild(taskNameInput);

    let taskDescInputLabel = document.createElement('label');
    taskDescInputLabel.for = 'taskdesc';
    taskDescInputLabel.textContent = 'Task Description: ';

    let taskDescInput = document.createElement('input');
    taskDescInput.type = 'text';
    taskDescInput.id = 'taskdesc';
    taskDescInput.name = 'taskdesc';
    taskDescInput.defaultValue = taskControl.lists[listIndex].tasks[taskIndex].desc
    taskDescInputLabel.appendChild(taskDescInput);

    let taskDueInputLabel = document.createElement('label');
    taskDueInputLabel.for = 'taskdue';
    taskDueInputLabel.textContent = 'Task Due Date: ';

    let taskDueInput = document.createElement('input');
    taskDueInput.type = 'date';
    taskDueInput.id = 'taskdue';
    taskDueInput.name = 'taskdue';
    taskDueInput.defaultValue = taskControl.lists[listIndex].tasks[taskIndex].due
    taskDueInputLabel.appendChild(taskDueInput);

    let submitButton = document.createElement('button');
    submitButton.textContent = 'Update task';
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

document.querySelector('.addlistbutton').addEventListener('click', () => createListPrompt());

if (localStorage.getItem('lists')) {
    updateFromStorage();
    populateLists();
    populateTaskPage(0);
}