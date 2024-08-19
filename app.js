const baseUrl = "http://localhost:8080"; // Adjust if necessary

// Add User
document.getElementById('add-user-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;

    fetch(`${baseUrl}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
    })
    .then(response => response.json())
    .then(data => {
        alert('User added successfully!');
        document.getElementById('add-user-form').reset();
    })
    .catch(error => console.error('Error:', error));
});

// Fetch All Users
document.getElementById('fetch-users').addEventListener('click', function() {
    fetch(`${baseUrl}/users`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const usersList = document.getElementById('users-list');
            usersList.innerHTML = '';
            if (data.length === 0) {
                usersList.innerHTML = '<li>No users found.</li>';
            } else {
                data.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`;
                    usersList.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch users.');
        });
});

// Add Book
document.getElementById('add-book-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;

    fetch(`${baseUrl}/books`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
    })
    .then(response => response.json())
    .then(data => {
        alert('Book added successfully!');
        document.getElementById('add-book-form').reset();
    })
    .catch(error => console.error('Error:', error));
});

// Fetch All Books
document.getElementById('fetch-books').addEventListener('click', function() {
    fetch(`${baseUrl}/books`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const booksList = document.getElementById('books-list');
            booksList.innerHTML = '';
            if (data.length === 0) {
                booksList.innerHTML = '<li>No books found.</li>';
            } else {
                data.forEach(book => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Borrowed: ${book.borrowed ? 'Yes' : 'No'}`;
                    booksList.appendChild(li);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to fetch books.');
        });
});

// Borrow Book
document.getElementById('borrow-book').addEventListener('click', function() {
    const bookId = document.getElementById('book-id').value;
    const userId = document.getElementById('user-id').value;

    fetch(`${baseUrl}/books/${bookId}/borrow?userId=${userId}`, {
        method: 'POST',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            alert(`Book with ID ${bookId} borrowed successfully!`);
        } else {
            alert(`Failed to borrow book with ID ${bookId}.`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to borrow book.');
    });
});

// Return Book
document.getElementById('return-book').addEventListener('click', function() {
    const bookId = document.getElementById('book-id').value;

    fetch(`${baseUrl}/books/${bookId}/return`, {
        method: 'POST',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            alert(`Book with ID ${bookId} returned successfully!`);
        } else {
            alert(`Failed to return book with ID ${bookId}.`);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to return book.');
    });
});
