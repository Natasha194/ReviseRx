document.addEventListener('DOMContentLoaded', () => {
    const newListForm = document.getElementById('new-list-form');
    const listNameInput = document.getElementById('list-name');
    const listIconInput = document.getElementById('list-icon');
    const listsContainer = document.getElementById('lists-container');
    const openPopupButton = document.getElementById('open-popup');
    const closePopupButton = document.getElementById('close-popup');
    const popup = document.getElementById('popup');
    const searchBar = document.getElementById('search-bar');

    let lists = JSON.parse(localStorage.getItem('lists')) || [];

    // Save Lists to Local Storage
    function saveToLocalStorage() {
        localStorage.setItem('lists', JSON.stringify(lists));
    }

    // Render Lists (optional search filter)
    function renderLists(filter = '') {
        listsContainer.innerHTML = '';
        lists
            .filter(list => list.name.toLowerCase().includes(filter.toLowerCase()))
            .forEach((list, index) => {
                const listItem = document.createElement('div');
                listItem.classList.add('list-item');
                listItem.innerHTML = `
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    ${list.icon ? `<img src="${list.icon}" alt="icon">` : ''}
                    
                        <h2 style="float: left;">${list.name}</h2>
                </div>
                        <p>Created on: ${list.dateCreated}</p>
                    
                    <button class="delete-button" data-index="${index}">Delete</button>
                `;
                listItem.querySelector('.delete-button').addEventListener('click', (e) => {
                    e.stopPropagation();
                    deleteList(index);
                });
                listItem.addEventListener('click', () => {
                    window.location.href = `list.html?id=${index}`;
                });
                listsContainer.appendChild(listItem);
            });
    }

    // Delete a List
    function deleteList(index) {
        lists.splice(index, 1);
        saveToLocalStorage();
        renderLists(); // Re-render after deletion
    }

    // Open Popup
    openPopupButton.addEventListener('click', () => {
        popup.classList.remove('hidden');
    });

    // Close Popup
    closePopupButton.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    // Add New List
    newListForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const listName = listNameInput.value;
        const listIcon = listIconInput.files[0] ? URL.createObjectURL(listIconInput.files[0]) : '';
        const dateCreated = new Date().toLocaleDateString();
        const newList = { name: listName, icon: listIcon, dateCreated };
        lists.push(newList);
        saveToLocalStorage();
        renderLists();
        newListForm.reset();
        popup.classList.add('hidden');
    });

    // Search Functionality
    searchBar.addEventListener('input', (e) => {
        renderLists(e.target.value); // Filter lists by search
    });

    // Initial render
    renderLists();
});















































document.addEventListener("DOMContentLoaded", function() {
    const slideLeftElements = document.querySelectorAll('.slide-left');
    const slideRightElements = document.querySelectorAll('.slide-right');
    
    const observerOptions = {
        threshold: 1 // Initial low threshold to start observing
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Additional check for visibility
                const rect = entry.target.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                
                if (rect.top < viewportHeight * 0.75) { // Ensure element is further into the viewport
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    slideLeftElements.forEach(element => {
        observer.observe(element);
    });

    slideRightElements.forEach(element => {
        observer.observe(element);
    });
});



document.addEventListener("DOMContentLoaded", function() {
    const elementsToReveal = document.querySelectorAll('.slide-left, .slide-right');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToReveal.forEach(element => {
        observer.observe(element);
    });
});

