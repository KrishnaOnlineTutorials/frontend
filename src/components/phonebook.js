// Contacts data and sorting state
const contactList = [];
let sortAscending = true;

// DOM Elements
const form = document.querySelector('#contactForm');
const tableBody = document.querySelector('#contactsBody');
const nameHeader = document.querySelector('#sortByName');
const errorDiv = document.querySelector('#error'); // Error message container

// Event listener for adding a new contact
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Retrieve input values
    const nameInput = document.querySelector('#name').value.trim();
    const phoneInput = document.querySelector('#phone').value.trim();

    // Validate inputs
    let errorMessage = '';
    if (!validateName(nameInput)) {
        errorMessage = 'Invalid name! Name should only contain alphabets and spaces, and must be 20 characters or less.';
    } else if (!validatePhone(phoneInput)) {
        errorMessage = 'Invalid phone number! Phone number should only contain 10 digits.';
    }

    // Show error if validation fails
    if (errorMessage) {
        showError(errorMessage);
        return;
    }

    // Hide error if all inputs are valid
    hideError();

    // Add the new contact to the list
    addContact(nameInput, phoneInput);

    // Clear the form fields
    form.reset();

    // Refresh the contact table
    displayContacts();
});

// Function to validate name
function validateName(name) {
    const nameRegex = /^[A-Za-z\s]{1,20}$/; // Only alphabets and spaces, max length 20
    return nameRegex.test(name);
}

// Function to validate phone number
function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/; // Only 10 digits
    return phoneRegex.test(phone);
}

// Function to add a contact
function addContact(name, phone) {
    contactList.push({ name, phone });
}

// Function to display contacts in the table
function displayContacts() {
    // Clear the table body
    tableBody.innerHTML = '';

    // Populate the table with contacts
    contactList.forEach((contact, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;
        tableBody.appendChild(row);
    });

    // Attach delete event listeners to buttons
    attachDeleteHandlers();
}

// Function to attach delete handlers to buttons
function attachDeleteHandlers() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            removeContact(index);
        });
    });
}

// Function to remove a contact
function removeContact(index) {
    contactList.splice(index, 1);
    displayContacts();
}

// Event listener for sorting contacts by name
nameHeader.addEventListener('click', () => {
    sortContactsByName();
    displayContacts();
    updateSortIndicator();
});

// Function to sort contacts by name
function sortContactsByName() {
    contactList.sort((a, b) => {
        return sortAscending
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });
    sortAscending = !sortAscending;
}

// Function to update the sort indicator in the header
function updateSortIndicator() {
    nameHeader.innerHTML = `Name ${sortAscending ? '&#x25B2;' : '&#x25BC;'}`;
}

// Function to show an error message
function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block'; // Make the error visible
}

// Function to hide the error message
function hideError() {
    errorDiv.style.display = 'none'; // Hide the error
}