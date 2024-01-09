/*Web Programming Assignment
Name: Parth Patel
Student Id: 100685337
*/
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    function sortTasksByPriority(){
        tasks.sort((a, b) =>{
        const priorityOrder = ['Urgent', 'High', 'Medium', 'Low', 'Unknown', 'None'];
        const priorityComparison = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
        if (priorityComparison === 0) {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        }
        return priorityComparison;
    });
    }
function displayTasks(){
    const taskList = document.getElementById('taskList');
    const completeList = document.getElementById('completeList');

    taskList.innerHTML = '';
    completeList.innerHTML = '';

    sortTasksByPriority();

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `Task: ${task.task}<br>Due: ${task.date}<br> Priority: ${task.priority}<br>`;

        const prioritySelect = document.createElement('select');
        const priorityOptions = ['None', 'Urgent', 'High', 'Medium', 'Low', 'Unknown'];
        priorityOptions.forEach((option)=>{
            const optionElement = document.createElement('option');
            optionElement.textContent = option;
            prioritySelect.appendChild(optionElement);
        });
        prioritySelect.value = task.priority;
        prioritySelect.addEventListener('change', (e) => updateTaskPriority(index, e.target.value));

        if(!task.completed){
            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.onclick = () => completeTask(index);
            li.appendChild(completeButton);
            completeButton.className = 'completeAdd';
            taskList.appendChild(li);
        }
        else{
            const moveBackButton = document.createElement('button');
            moveBackButton.textContent = 'Move Back';
            moveBackButton.onclick = () => moveTaskBack(index);
            li.appendChild(moveBackButton);
            moveBackButton.className = 'moveBack';

            completeList.appendChild(li);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        li.appendChild(deleteButton);
        deleteButton.className = 'deleteAdd';
    });
}
function updateTaskPriority(index, newPriority) {
    tasks[index].priority = newPriority;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}
function addTask(){
    const taskInput = document.getElementById("taskInput");
    const dueDate = document.getElementById("dueDate");
    const prioritySelect = document.getElementById("priorityInput");
    
    const task = taskInput.value.trim();
    const date = dueDate.value.trim();
    const priority = prioritySelect.value.trim();

    if(task === ''){
        alert("Please enter the task first!");
        return;
    }

    tasks.push({task, date, priority, completed: false});
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    dueDate.value = '';
    prioritySelect.value = 'None';
    displayTasks();
}

function deleteTask(index){
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function completeTask(index){
    tasks[index].completed = true;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

function moveTaskBack(index) {
    tasks[index].completed = false;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

displayTasks();