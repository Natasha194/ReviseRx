document.addEventListener('DOMContentLoaded', () => {
    const newTaskForm = document.getElementById('new-task-form');
    const taskNameInput = document.getElementById('task-name');
    const dueDateInput = document.getElementById('due-date');
    const importanceSelect = document.getElementById('importance');
    const tasksContainer = document.getElementById('tasks-container');
    const addTaskButton = document.getElementById('add-task-btn');
    const closePopupButton = document.getElementById('close-popup');
    const popup = document.getElementById('popup');

    // At the beginning of the script
    const currentListIndex = localStorage.getItem('currentListIndex') || 0; // Default to 0 if not set
    let lists = JSON.parse(localStorage.getItem('lists')) || [];

    // Ensure the current list index is a valid number and points to a valid list
    if (lists.length === 0) {
        lists = [{ tasks: [] }]; // Initialize with a default list if none exist
        localStorage.setItem('lists', JSON.stringify(lists)); // Save to local storage
    }

    localStorage.setItem('currentListIndex', 0); // Sets the index to the first list

    


    // Toggle the completion status of a task
    function toggleCompletion(taskIndex) {
        lists[currentListIndex].tasks[taskIndex].completed = !lists[currentListIndex].tasks[taskIndex].completed;
        saveTasks();
        loadTasks(); // Refresh the task list
    }

    // Load tasks for the current list
    function loadTasks() {
        tasksContainer.innerHTML = ''; // Clear the current tasks
        const currentList = lists[currentListIndex];
    
        if (currentList && currentList.tasks) {
            currentList.tasks.forEach((task, index) => {
                const taskItem = document.createElement('div');
                taskItem.classList.add('task-item');

                // Set the background color with opacity
                if (task.importance === "red") {
                    taskItem.style.backgroundColor = "rgba(255, 0, 0, 0.7)"; // Red with 70% opacity
                } 
                else if (task.importance === "green") {
                    taskItem.style.backgroundColor = "rgba(0, 128, 0, 0.7)"; // Green with 70% opacity
                } 
                else if (task.importance === "orange") {
                    taskItem.style.backgroundColor = "rgba(255, 165, 0, 0.7)"; // Orange with 70% opacity
                }
    
    
                // Conditionally apply the 'completed' class to the task name
                taskItem.innerHTML = `
                    <div style="display: flex; flex-direction:column; align-items: left;">
                        <h2 class="task-name ${task.completed ? 'completed' : ''}">${task.name}</h2>
                        <p class="task-name ${task.completed ? 'completed' : ''}">Due: ${task.dueDate}</p><br>
                        <div style="display: flex; align-items: center;">
                            <button style="background-color: rgba(0, 0, 0, 0)" class="completed-task-button" data-task-index="${index}">${task.completed ? '<img src="cross.png" style="width: 20px">' : '<img src="tick.webp" style="width: 20px">'}</button>
                            <button style="background-color: rgba(0, 0, 0, 0)" class="delete-task-button" data-task-index="${index}"><img src="trash.png" style="width: 20px"></button>
                        </div>
                    </div>
                `;
    
                // Add completed functionality
                taskItem.querySelector('.completed-task-button').addEventListener('click', () => {
                    toggleCompletion(index);
                });
    
                // Add delete functionality
                taskItem.querySelector('.delete-task-button').addEventListener('click', () => {
                    deleteTask(index);
                });
    
                tasksContainer.appendChild(taskItem);
            });
        }
    }
    
    

    // Save the tasks back to local storage
    function saveTasks() {
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    // Add a new task
    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = taskNameInput.value.trim();
        const dueDate = dueDateInput.value;
        const importance = importanceSelect.value;

        if (taskName && dueDate && importance) {
            const newTask = { name: taskName, dueDate, importance };
        
            lists[currentListIndex].tasks.push(newTask);
            saveTasks();
            loadTasks(); // Refresh the task list
            popup.classList.add('hidden'); // Hide the popup
            newTaskForm.reset(); // Clear the form
        }
    });

    // Delete a task
    function deleteTask(taskIndex) {
        lists[currentListIndex].tasks.splice(taskIndex, 1);
        saveTasks();
        loadTasks(); // Refresh the task list
    }

    // Show the popup for adding a task
    addTaskButton.addEventListener('click', () => {
        popup.classList.remove('hidden');
    });

    // Close the popup
    closePopupButton.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    // Load tasks initially
    loadTasks();
});







