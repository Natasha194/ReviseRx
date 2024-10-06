document.addEventListener('DOMContentLoaded', () => {
    // Initialize Quill Editor
    const quill = new Quill('#editor-container', {
        theme: 'snow',
        modules: {
            toolbar: '#toolbar'
        }
    });

    // Retrieve the list ID from the URL
    const listId = new URLSearchParams(window.location.search).get('id');

    // Load the list name and content from localStorage
    if (listId) {
        const lists = JSON.parse(localStorage.getItem('lists')) || [];
        const list = lists[listId];
        
        if (list) {
            // Set the list name as the heading
            document.getElementById('list-name-heading').textContent = list.name;

            // Load existing content into the editor
            quill.root.innerHTML = list.content;
            applyStrikethrough();
        } else {
            alert('List not found.');
        }
    }

    // Function to apply strikethrough to checked checklist items
    function applyStrikethrough() {
        const checklistItems = quill.root.querySelectorAll('li.ql-check');
        checklistItems.forEach((item) => {
            const checkbox = item.querySelector('input[type="checkbox"]');
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        item.style.textDecoration = 'line-through'; // Strikethrough checked items
                    } else {
                        item.style.textDecoration = 'none'; // Remove strikethrough for unchecked items
                    }
                });
                if (checkbox.checked) {
                    item.style.textDecoration = 'line-through'; // Initially checked items
                }
            }
        });
    }

    // Save button functionality
    document.getElementById('save-button').addEventListener('click', () => {
        if (listId) {
            const lists = JSON.parse(localStorage.getItem('lists')) || [];
            if (listId >= lists.length) {
                alert('Invalid list ID.');
                return;
            }
            const updatedContent = quill.root.innerHTML;

            // Save the updated content back to local storage
            lists[listId].content = updatedContent;
            localStorage.setItem('lists', JSON.stringify(lists));
            alert('List saved successfully!');
        } else {
            alert('No list ID found.');
        }
    });

    // Handle custom text color input from color picker
    document.getElementById('color-picker').addEventListener('input', (e) => {
        const selectedColor = e.target.value;
        quill.format('color', selectedColor); // Apply the selected color to the text
    });

    // Handle custom background color input from color picker (for highlighter)
    document.getElementById('bg-color-picker').addEventListener('input', (e) => {
        const selectedColor = e.target.value;
        quill.format('background', selectedColor); // Apply the selected background color to the text
    });

    // Handle custom font size input
    document.querySelector('.ql-custom-size').addEventListener('input', (e) => {
        const fontSize = `${e.target.value}px`;
        quill.format('size', fontSize); // Apply the custom font size
    });

    applyStrikethrough(); // Apply strikethrough when items are checked/unchecked

    // Observer for dynamically created checklist items
    const observer = new MutationObserver(() => {
        applyStrikethrough();
    });

    observer.observe(quill.root, {
        childList: true,
        subtree: true,
    });
});
