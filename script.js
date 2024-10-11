// Main Script for List Management
let lists = JSON.parse(localStorage.getItem('lists')) || [];

const listsContainer = document.getElementById('lists-container'); // Move this line outside as well

document.addEventListener('DOMContentLoaded', () => {
    // Other variables
    const newListForm = document.getElementById('new-list-form');
    const listNameInput = document.getElementById('list-name');
    const listIconInput = document.getElementById('list-icon');
    const openPopupButton = document.getElementById('open-popup');
    const closePopupButton = document.getElementById('close-popup');
    const popup = document.getElementById('popup');
    const searchBar = document.getElementById('search-bar');

    function saveToLocalStorage() {
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    function renderLists(filter = '') {
        listsContainer.innerHTML = '';  // Clear the container
        lists
            .filter(list => list.name && list.name.toLowerCase().includes(filter.toLowerCase()))  // Check if list.name exists
            .forEach((list, index) => {
                const listItem = document.createElement('div');
                listItem.classList.add('list-item');
                listItem.innerHTML = `
                    <div style="display: flex; align-items: center; margin-bottom: 15px;">
                        ${list.icon ? `<img src="${list.icon}" alt="icon" style="width: 20px; height: 20px; margin-right: 5px;">` : ''}
                        <h2 style="float: left;">${list.name}</h2>
                    </div>
                    <p>Created on: ${list.dateCreated}</p>
                    <button class="delete-button" data-index="${index}">Delete</button>
                    <a href="taskPage.html"><button class="view-tasks-button" data-index="${index}">View Tasks</button></a>
                `;

                // Add delete functionality
                listItem.querySelector('.delete-button').addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteList(index);
                });

                // Add view tasks functionality
                listItem.querySelector('.view-tasks-button').addEventListener('click', (e) => {
                    e.stopPropagation();
                    window.location.href = `taskPage.html?index=${index}`; // Pass index as a query parameter
                });

                listsContainer.appendChild(listItem);
            });
    }

    // Handle Form Submission and List Creation
    newListForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newList = {
            name: listNameInput.value,
            icon: listIconInput.files[0] ? URL.createObjectURL(listIconInput.files[0]) : null,
            dateCreated: new Date().toLocaleDateString(),
            tasks: []
        };
        lists.push(newList);
        saveToLocalStorage();
        renderLists();
        popup.classList.add('hidden');
        listNameInput.value = '';
        listIconInput.value = '';
    });

    // Render existing lists when the page loads
    renderLists();

    // Handle search bar input
    searchBar.addEventListener('input', () => {
        renderLists(searchBar.value);
    });

    // Function to delete a list
    function deleteList(index) {
        lists.splice(index, 1);
        saveToLocalStorage();
        renderLists();
    }

    // Open and close the popup for creating new lists
    openPopupButton.addEventListener('click', () => {
        popup.classList.remove('hidden');
    });
    closePopupButton.addEventListener('click', () => {
        popup.classList.add('hidden');
    });
});

// When a new list is added, create a clickable link to list.html
function addNewList(list) {
    const listElement = document.createElement('div');
    listElement.className = 'list-item';

    const listLink = document.createElement('a');
    listLink.href = `list.html?list=${encodeURIComponent(list.name)}`;
    listLink.textContent = list.name;

    listElement.appendChild(listLink);
    listsContainer.appendChild(listElement);
}

// Load existing lists from localStorage and display them
lists.forEach(list => addNewList(list));




function saveToLocalStorage() {
    localStorage.setItem('lists', JSON.stringify(lists));
}

function renderLists() {
    const listsContainer = document.getElementById('lists-container'); // Reference to the container for lists
    listsContainer.innerHTML = ''; // Clear the container

    lists.forEach((list, index) => {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.innerHTML = `
            <h2>${list.name}</h2>
            <button class="view-tasks-button" data-index="${index}">View Tasks</button>
            <button class="delete-list-button" data-index="${index}">Delete List</button>
        `;

        // Add view tasks functionality
        listItem.querySelector('.view-tasks-button').addEventListener('click', () => {
            localStorage.setItem('currentListIndex', index); // Save current list index
            window.location.href = 'taskPage.html'; // Navigate to the tasks page
        });

        // Add delete functionality
        listItem.querySelector('.delete-list-button').addEventListener('click', () => {
            deleteList(index);
        });

        listsContainer.appendChild(listItem);
    });
}

function deleteList(index) {
    lists.splice(index, 1);
    saveToLocalStorage();
    renderLists();
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    renderLists();
});
