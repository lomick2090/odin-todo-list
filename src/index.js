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


function populateLists() {
    let newTask = document.createElement('div');
    newTask.id = `${taskControl.lists.length -1}`
    newTask.textContent = taskControl.lists[(taskControl.lists.length - 1)].name;
    document.querySelector('.tasklists').appendChild(newTask);
    newTask.addEventListener('click', () => {console.log(newTask.id); populateTaskPage(newTask.id)});
}

function populateTaskPage(listIndex) {
    while (document.querySelector('.list').firstChild) {
        document.querySelector('.list').firstChild.remove();
    }

    let taskDiv = document.createElement('div');
    taskDiv.className = 'taskDiv';

    let taskHeader = document.createElement ('h1');
    taskHeader.textContent = `${taskControl.lists[listIndex].name}`;

    let addTaskButton = document.createElement('button');
    addTaskButton.textContent = 'Add Task +';
    addTaskButton.addEventListener('click', () => {

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
        taskDueInputLabel.textContent = 'Task Description: '
    
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
    

    })

    taskDiv.appendChild(taskHeader);
    taskDiv.appendChild(addTaskButton);
    document.querySelector('.list').appendChild(taskDiv);
}

document.querySelector('.addlistbutton').addEventListener('click', () => {
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
})


// console.log(taskControl.lists);
// taskControl.createList('hello')
// taskControl.addTask(0, 'Do Laundry', 'Wash and fold laundry', "today");
// console.log(taskControl.lists[0].tasks[0])