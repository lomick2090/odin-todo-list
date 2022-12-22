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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7Ozs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0Esb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0EsNkNBQTZDLHlCQUF5Qiw2QkFBNkI7QUFDbkc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdDQUFnQyxrQ0FBa0M7O0FBRWxFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7Ozs7QUFJVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQSw2QyIsInNvdXJjZXMiOlsid2VicGFjazovL29kaW4tdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCB0YXNrQ29udHJvbCA9ICgoKSA9PiB7XG5cbiAgICBsZXQgbGlzdHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUxpc3QobmFtZSkge1xuICAgICAgICBsaXN0cy5wdXNoKHtuYW1lLFxuICAgICAgICAgICAgdGFza3M6IFtdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRhc2sobGlzdEl0ZW0sIHRhc2tOYW1lLCB0YXNrRGVzYywgdGFza0R1ZSwpIHtcbiAgICAgICAgbGlzdHNbbGlzdEl0ZW1dLnRhc2tzLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogdGFza05hbWUsXG4gICAgICAgICAgICBkZXNjOiB0YXNrRGVzYyxcbiAgICAgICAgICAgIGR1ZTogdGFza0R1ZVxuICAgICAgICB9KVxuICAgIH1cblxuXG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZUxpc3QsXG4gICAgICAgIGxpc3RzLFxuICAgICAgICBhZGRUYXNrLFxuICAgIH1cblxufSkoKTtcblxuXG5mdW5jdGlvbiBwb3B1bGF0ZUxpc3RzKCkge1xuICAgIGxldCBuZXdUYXNrID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgbmV3VGFzay5pZCA9IGAke3Rhc2tDb250cm9sLmxpc3RzLmxlbmd0aCAtMX1gXG4gICAgbmV3VGFzay50ZXh0Q29udGVudCA9IHRhc2tDb250cm9sLmxpc3RzWyh0YXNrQ29udHJvbC5saXN0cy5sZW5ndGggLSAxKV0ubmFtZTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFza2xpc3RzJykuYXBwZW5kQ2hpbGQobmV3VGFzayk7XG4gICAgbmV3VGFzay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtjb25zb2xlLmxvZyhuZXdUYXNrLmlkKTsgcG9wdWxhdGVUYXNrUGFnZShuZXdUYXNrLmlkKX0pO1xufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZVRhc2tQYWdlKGxpc3RJbmRleCkge1xuICAgIHdoaWxlIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdCcpLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3QnKS5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGxldCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGFza0Rpdi5jbGFzc05hbWUgPSAndGFza0Rpdic7XG5cbiAgICBsZXQgdGFza0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgKCdoMScpO1xuICAgIHRhc2tIZWFkZXIudGV4dENvbnRlbnQgPSBgJHt0YXNrQ29udHJvbC5saXN0c1tsaXN0SW5kZXhdLm5hbWV9YDtcblxuICAgIGxldCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYWRkVGFza0J1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQgVGFzayArJztcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgIC8vbGlzdEl0ZW0sIHRhc2tOYW1lLCB0YXNrRGVzYywgdGFza0R1ZVxuICAgICAgICBsZXQgdGFza0Zvcm1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICB0YXNrRm9ybURpdi5jbGFzc05hbWUgPSAndGFza2Zvcm1kaXYnO1xuICAgIFxuICAgICAgICBsZXQgdGFza0Zvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgIHRhc2tGb3JtLmNsYXNzTmFtZSA9ICd0YXNrZm9ybSc7XG4gICAgXG4gICAgICAgIGxldCB0YXNrSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDEnKTtcbiAgICAgICAgdGFza0hlYWRlci50ZXh0Q29udGVudCA9ICdBZGQgVGFzayB0byBMaXN0Oic7XG5cbiAgICAgICAgbGV0IHRhc2tOYW1lSW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIHRhc2tOYW1lSW5wdXRMYWJlbC5mb3IgPSAndGFza25hbWUnXG4gICAgICAgIHRhc2tOYW1lSW5wdXRMYWJlbC50ZXh0Q29udGVudCA9ICdUYXNrIE5hbWU6ICdcbiAgICBcbiAgICAgICAgbGV0IHRhc2tOYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICB0YXNrTmFtZUlucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIHRhc2tOYW1lSW5wdXQuaWQgPSAndGFza25hbWUnO1xuICAgICAgICB0YXNrTmFtZUlucHV0Lm5hbWUgPSAndGFza25hbWUnO1xuICAgICAgICB0YXNrTmFtZUlucHV0TGFiZWwuYXBwZW5kQ2hpbGQodGFza05hbWVJbnB1dClcblxuICAgICAgICBsZXQgdGFza0Rlc2NJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgdGFza0Rlc2NJbnB1dExhYmVsLmZvciA9ICd0YXNrZGVzYydcbiAgICAgICAgdGFza0Rlc2NJbnB1dExhYmVsLnRleHRDb250ZW50ID0gJ1Rhc2sgRGVzY3JpcHRpb246ICdcbiAgICBcbiAgICAgICAgbGV0IHRhc2tEZXNjSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICB0YXNrRGVzY0lucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgICAgIHRhc2tEZXNjSW5wdXQuaWQgPSAndGFza2Rlc2MnO1xuICAgICAgICB0YXNrRGVzY0lucHV0Lm5hbWUgPSAndGFza2Rlc2MnO1xuICAgICAgICB0YXNrRGVzY0lucHV0TGFiZWwuYXBwZW5kQ2hpbGQodGFza0Rlc2NJbnB1dClcblxuICAgICAgICBsZXQgdGFza0R1ZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICB0YXNrRHVlSW5wdXRMYWJlbC5mb3IgPSAndGFza2R1ZSdcbiAgICAgICAgdGFza0R1ZUlucHV0TGFiZWwudGV4dENvbnRlbnQgPSAnVGFzayBEZXNjcmlwdGlvbjogJ1xuICAgIFxuICAgICAgICBsZXQgdGFza0R1ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgdGFza0R1ZUlucHV0LnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgIHRhc2tEdWVJbnB1dC5pZCA9ICd0YXNrZHVlJztcbiAgICAgICAgdGFza0R1ZUlucHV0Lm5hbWUgPSAndGFza2R1ZSc7XG4gICAgICAgIHRhc2tEdWVJbnB1dExhYmVsLmFwcGVuZENoaWxkKHRhc2tEdWVJbnB1dClcblxuICAgICAgICBsZXQgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHN1Ym1pdEJ1dHRvbi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgICAgICBzdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGFza0NvbnRyb2wuYWRkVGFzayhsaXN0SW5kZXgsIHRhc2tOYW1lSW5wdXQudmFsdWUsIHRhc2tEZXNjSW5wdXQudmFsdWUsIHRhc2tEdWVJbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UnKS5pZCA9ICcnO1xuICAgICAgICAgICAgdGFza0Zvcm1EaXYucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICB0YXNrRm9ybURpdi5hcHBlbmRDaGlsZCh0YXNrSGVhZGVyKTtcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza05hbWVJbnB1dExhYmVsKTtcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza0Rlc2NJbnB1dExhYmVsKTtcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQodGFza0R1ZUlucHV0TGFiZWwpO1xuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZChzdWJtaXRCdXR0b24pO1xuICAgICAgICB0YXNrRm9ybURpdi5hcHBlbmRDaGlsZCh0YXNrRm9ybSk7XG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKHRhc2tGb3JtRGl2KTtcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZScpLmlkID0gJ2JsdXInO1xuICAgIFxuXG4gICAgfSlcblxuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0hlYWRlcik7XG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZChhZGRUYXNrQnV0dG9uKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdCcpLmFwcGVuZENoaWxkKHRhc2tEaXYpO1xufVxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkbGlzdGJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIGxldCBsaXN0Rm9ybURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgbGlzdEZvcm1EaXYuY2xhc3NOYW1lID0gJ2xpc3Rmb3JtZGl2JztcblxuICAgIGxldCBsaXN0Rm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICBsaXN0Rm9ybS5jbGFzc05hbWUgPSAnbGlzdGZvcm0nO1xuXG4gICAgbGV0IGxpc3RIZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICAgIGxpc3RIZWFkZXIudGV4dENvbnRlbnQgPSAnQWRkIExpc3Q6JztcblxuICAgIGxldCBsaXN0SW5wdXRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgbGlzdElucHV0TGFiZWwuZm9yID0gJ2xpc3RuYW1lJ1xuICAgIGxpc3RJbnB1dExhYmVsLnRleHRDb250ZW50ID0gJ0xpc3QgTmFtZTogJ1xuXG4gICAgbGV0IGxpc3RJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgbGlzdElucHV0LnR5cGUgPSAndGV4dCc7XG4gICAgbGlzdElucHV0LmlkID0gJ2xpc3RuYW1lJztcbiAgICBsaXN0SW5wdXQubmFtZSA9ICdsaXN0bmFtZSc7XG5cbiAgICBsZXQgc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgc3VibWl0QnV0dG9uLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgc3VibWl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZScpLmlkID0gJyc7XG4gICAgICAgIGlmIChsaXN0SW5wdXQudmFsdWUgIT0gJycpIHtcbiAgICAgICAgICAgIHRhc2tDb250cm9sLmNyZWF0ZUxpc3QobGlzdElucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIHBvcHVsYXRlTGlzdHMoKTtcbiAgICAgICAgfVxuICAgICAgICBsaXN0Rm9ybS5yZXNldCgpO1xuICAgICAgICBsaXN0Rm9ybURpdi5yZW1vdmUoKTtcbiAgICB9KTtcblxuICAgIGxpc3RJbnB1dExhYmVsLmFwcGVuZENoaWxkKGxpc3RJbnB1dCk7XG4gICAgbGlzdEZvcm0uYXBwZW5kQ2hpbGQobGlzdEhlYWRlcik7XG4gICAgbGlzdEZvcm0uYXBwZW5kQ2hpbGQobGlzdElucHV0TGFiZWwpO1xuICAgIGxpc3RGb3JtLmFwcGVuZENoaWxkKHN1Ym1pdEJ1dHRvbik7XG4gICAgbGlzdEZvcm1EaXYuYXBwZW5kQ2hpbGQobGlzdEZvcm0pO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKGxpc3RGb3JtRGl2KTtcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYWdlJykuaWQgPSAnYmx1cic7XG59KVxuXG5cbi8vIGNvbnNvbGUubG9nKHRhc2tDb250cm9sLmxpc3RzKTtcbi8vIHRhc2tDb250cm9sLmNyZWF0ZUxpc3QoJ2hlbGxvJylcbi8vIHRhc2tDb250cm9sLmFkZFRhc2soMCwgJ0RvIExhdW5kcnknLCAnV2FzaCBhbmQgZm9sZCBsYXVuZHJ5JywgXCJ0b2RheVwiKTtcbi8vIGNvbnNvbGUubG9nKHRhc2tDb250cm9sLmxpc3RzWzBdLnRhc2tzWzBdKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==