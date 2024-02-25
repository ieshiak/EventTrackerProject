//script.js

console.log('script.js loaded')

window.addEventListener('load', function(e) {
	console.log('page loaded');
	loadAllDreams();
	populateTypeDropdown();
	populateEmotionDropdown();

	let createButton = document.getElementById('createButton');

	// Check if the "Create" button exists before adding the event listener
	if (createButton) {
		createButton.addEventListener('click', createNewDream);
	} else {
		console.error('Error: "Create" button not found.');
	}

	// Get a reference to the "Edit" button
	let editButton = document.getElementById('editButton');

	if (editButton) {
		editButton.addEventListener('click', function() {
			console.log('Edit button clicked');
			toggleEditForm();
		});
	}
});

function loadAllDreams() {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/dreams');
	xhr.onreadystatechange = function() {
		if (xhr.readyState === xhr.DONE) {
			if (xhr.status === 200) {
				let dreamList = JSON.parse(xhr.responseText);
				displayDreamList(dreamList);
			}
			else {

			}
		}
	};
	xhr.send();
}

function displayDreamList(dreams) {
	if (dreams && Array.isArray(dreams) && dreams.length > 0) {
		let dataDiv = document.getElementById('dreamListDiv');
		let ul = document.createElement('ul');
		ul.id = 'dreamList';

		for (let dream of dreams) {
			let li = document.createElement('li');
			let starIcon = document.createElement('i');
			starIcon.className = 'fas fa-star';
			li.appendChild(starIcon);
			li.innerHTML += ' ' + dream.title;
			li.addEventListener('click', function() {
				displayDreamDetails(dream);
			});
			ul.appendChild(li);
		}
		dataDiv.innerHTML = '';
		dataDiv.appendChild(ul);
	}
}

function displayDreamDetails(dream) {
	console.log('Dream object:', dream);
	let detailsBox = document.getElementById('dreamDetailsBox');
	detailsBox.innerHTML = '';
	detailsBox.innerHTML += '<p>Title: ' + dream.title + '</p>';
	if (dream.user && dream.user.username) {
		let userContainer = document.createElement('div');
		if (dream.user.avatarURL) {
			let userPhoto = document.createElement('img');
			userPhoto.src = dream.user.avatarURL;
			userPhoto.alt = 'User Photo';
			userPhoto.style.width = '100px';
			userPhoto.style.height = '100px';
			userContainer.appendChild(userPhoto);
		}
		let usernameElement = document.createElement('p');
		usernameElement.textContent = 'Username: ' + dream.user.username;
		userContainer.appendChild(usernameElement);
		detailsBox.appendChild(userContainer);
	}

	detailsBox.innerHTML += '<p>Description: ' + dream.description + '</p>';
	let ul = document.createElement('ul');
	ul.style.listStyleType = 'none';
	if (dream.dateTime) {
		let dateObj = new Date(dream.dateTime);
		let formattedDate = dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
		let formattedTime = dateObj.toLocaleTimeString('en-US');
		let liDate = document.createElement('li');
		liDate.textContent = 'Date: ' + formattedDate;
		ul.appendChild(liDate);
		let liTime = document.createElement('li');
		liTime.textContent = 'Time: ' + formattedTime;
		ul.appendChild(liTime);
	}
	let liType = document.createElement('li');
	liType.textContent = 'Type: ' + dream.type;
	ul.appendChild(liType);
	let liEmotion = document.createElement('li');
	liEmotion.textContent = 'Emotion: ' + dream.emotion;
	ul.appendChild(liEmotion);
	detailsBox.appendChild(ul);
	// Styling for bullets
	let liItems = ul.querySelectorAll('li');
	liItems.forEach(function(li) {
		li.style.position = 'relative';
		li.style.paddingLeft = '20px';
		li.style.marginBottom = '5px';
		let starIcon = document.createElement('i');
		starIcon.className = 'far fa-star';
		starIcon.style.position = 'absolute';
		starIcon.style.left = '0';
		li.insertBefore(starIcon, li.firstChild);
	});
	let editButton = document.createElement('button');
	editButton.textContent = 'Edit';
	editButton.addEventListener('click', function() {
		console.log('Edit button clicked');
		editDream(dream.id);
	});

	detailsBox.appendChild(editButton);
	let deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.addEventListener('click', function() {
		console.log('Delete button clicked');
		deleteDream(dream.id);
	});

	detailsBox.appendChild(deleteButton);
	detailsBox.style.display = 'block';
}

//create new dream
function createNewDream() {
	console.log('Creating new dream...');
	let detailsBox = document.getElementById('dreamDetailsBox');
	detailsBox.innerHTML = '';

	// Add a dropdown list for selecting an existing user
	let userSelect = document.createElement('select');
	userSelect.setAttribute('placeholder', 'Select User');

	fetch('api/users')
		.then(response => response.json())
		.then(users => {
			// Create an option for each user and append it to the select element
			users.forEach(user => {
				let option = document.createElement('option');
				option.textContent = user.username;
				option.value = user.id; // Set the value attribute to the user ID
				userSelect.appendChild(option);
			});
		})
		.catch(error => {
			console.error('Error fetching users:', error);
			alert('Error fetching users. Please try again later.');
		});

	detailsBox.appendChild(userSelect);

	// Add input fields for creating a new dream
	let titleInput = document.createElement('input');
	titleInput.setAttribute('type', 'text');
	titleInput.setAttribute('placeholder', 'Enter title');
	detailsBox.appendChild(titleInput);

	let descriptionInput = document.createElement('textarea');
	descriptionInput.setAttribute('placeholder', 'Enter description');
	detailsBox.appendChild(descriptionInput);

	let dateInput = document.createElement('input');
	dateInput.setAttribute('type', 'date');
	dateInput.setAttribute('placeholder', 'Select Date');
	detailsBox.appendChild(dateInput);

	let timeInput = document.createElement('input');
	timeInput.setAttribute('type', 'time');
	timeInput.setAttribute('placeholder', 'Select Time');
	detailsBox.appendChild(timeInput);

	let types = ["Normal", "Lucid", "Nightmare", "Day", "Epic", "Awakening", "Terror", "Progressive", "Prophetic", "Recurring", "Vivid", "Surreal", "Empowering", "Inspirational", "Mystical", "Transformational", "Enlightening", "Symbolic", "Challenging", "Guiding", "Creative", "Harmonious"];

	let typeSelect = document.createElement('select');
	typeSelect.setAttribute('placeholder', 'Select Type');

	types.forEach(function(type) {
		let option = document.createElement('option');
		option.textContent = type;
		option.value = type;
		typeSelect.appendChild(option);
	});

	detailsBox.appendChild(typeSelect);

	let emotionValues = ["Joy", "Bliss", "Anger", "Fear", "Dread", "Wonder", "Intrigue", "Fascination", "Happiness", "Amazement", "Relaxation", "Disorientation", "Sadness", "Surprise", "Disgust", "Love", "Amusement", "Adventure", "Guilt", "Hope", "Inspired", "Interested", "Prideful", "Serenity", "Curious", "Hate", "Trust", "Excitement"];

	// Create a select element for emotion selection
	let emotionSelect = document.createElement('select');
	emotionSelect.setAttribute('placeholder', 'Select Emotion');
	emotionValues.forEach(function(emotion) {
		let option = document.createElement('option');
		option.textContent = emotion;
		option.value = emotion;
		emotionSelect.appendChild(option);
	});
	detailsBox.appendChild(emotionSelect);

	let submitButton = document.createElement('button');
	submitButton.textContent = 'Submit';
	submitButton.addEventListener('click', function() {
		if (!userSelect.value) {
			alert('Please select a user.');
			return;
		}
		console.log('Selected user ID:', userSelect.value);
		if (!titleInput.value || !descriptionInput.value) {
			alert('Please fill in the title and description.');
			return;
		}
		let selectedDate = dateInput.value;
		let selectedTime = timeInput.value;
		let dateTimeString = selectedDate + 'T' + selectedTime;
		let newDream = {
			user: { id: userSelect.value },
			title: titleInput.value,
			description: descriptionInput.value,
			type: typeSelect.value,
			emotion: emotionSelect.value,
			dateTime: dateTimeString,
			date: selectedDate,
			time: selectedTime
		};
		saveDream(newDream);
		displayDreamDetails(newDream);
	});

	detailsBox.appendChild(submitButton);

	detailsBox.style.display = 'block';
}


function saveDream(newDream) {
	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/dreams');

	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) { // Check if the response status is 201 (Created)
				let createdDream = JSON.parse(xhr.responseText);
				displayDreamDetails(createdDream); // Optionally, display the details of the newly created dream
				console.log('Dream saved successfully:', createdDream);
			} else {
				displayError("Error creating new dream: " + xhr.status);
			}
		}
	};

	xhr.setRequestHeader('Content-type', 'application/json'); // Set request header
	let newDreamJson = JSON.stringify(newDream);
	xhr.send(newDreamJson); // Send the JSON stringified newDream object to the server
}

// Function to handle dream deletion
function deleteDream(dreamId) {
	// Implement your delete functionality here
	console.log('Deleting dream with ID:', dreamId);
	// Example: Send a delete request to the server
	fetch('api/dreams/' + dreamId, {
		method: 'DELETE'
	})
		.then(response => {
			if (response.ok) {
				console.log('Dream deleted successfully');
				// Optionally, update the UI or perform any additional tasks
			} else {
				console.error('Error deleting dream:', response.status);
				// Optionally, display an error message or handle the error
			}
		})
		.catch(error => {
			console.error('Error deleting dream:', error);
			// Optionally, display an error message or handle the error
		});
}

function editDream(dreamId) {
    console.log('Editing dream with ID:', dreamId);
    let editForm = document.getElementById('editDreamForm');
    if (editForm) {
        editForm.style.display = 'block';
    } else {
        console.error('Edit form not found!');
    }
    let dream;
    let userSelect; // Declare userSelect variable here

    fetch('api/dreams/' + dreamId)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch dream details');
            }
        })
        .then(dreamData => {
            dream = dreamData;
            console.log('Dream details:', dream);
            document.getElementById('editTitle').value = dream.title;
            document.getElementById('editDescription').value = dream.description;
            document.getElementById('editType').value = dream.type;
            document.getElementById('editEmotion').value = dream.emotion;
            document.getElementById('editDate').value = dream.date;
            document.getElementById('editTime').value = dream.time;
            
            let userIdInput = document.createElement('input');
            userIdInput.setAttribute('type', 'hidden');
            userIdInput.setAttribute('id', 'editUserId');
            userIdInput.setAttribute('name', 'editUserId');
            userIdInput.value = dream.user ? dream.user.id : '';
            document.getElementById('editDreamForm').appendChild(userIdInput);

            return fetch('api/users'); // Return the promise chain
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch users');
            }
        })
        .then(users => {
            userSelect = document.getElementById('editUser'); // Assign userSelect value here
            userSelect.innerHTML = '';
            users.forEach(user => {
                let option = document.createElement('option');
                option.textContent = user.username;
                option.value = user.id;
                userSelect.appendChild(option);
            });
            
            // Set the user ID after populating the user select element
            document.getElementById('editUserId').value = dream.user ? dream.user.id : '';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    let submitButton = document.getElementById('editSubmitButton');
    console.log('Submit button:', submitButton);
    submitButton.addEventListener('click', function() {
        let updatedTitle = document.getElementById('editTitle').value;
        let updatedDescription = document.getElementById('editDescription').value;
        let updatedType = document.getElementById('editType').value;
        let updatedEmotion = document.getElementById('editEmotion').value;
        let updatedDate = document.getElementById('editDate').value;
        let updatedTime = document.getElementById('editTime').value;
        let updatedUserId = document.getElementById('editUserId').value;
        
        // Combine date and time into a single string
        let dateTimeString = updatedDate + 'T' + updatedTime;

        let updatedDream = {
            id: dreamId,
            user: { id: userSelect.value },
            title: updatedTitle,
            description: updatedDescription,
            type: updatedType,
            emotion: updatedEmotion,
            dateTime: dateTimeString // Assign the combined dateTime string
        };
        saveEditedDream(updatedDream);
    });
}


function saveEditedDream(updatedDream) {
	fetch('api/dreams/' + updatedDream.id, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(updatedDream)
	})
		.then(response => {
			if (response.ok) {
				console.log('Dream updated successfully');
			} else {
				console.error('Error updating dream:', response.status);
			}
		})
		.catch(error => {
			console.error('Error updating dream:', error);
		});
}
function toggleEditForm() {
	let editForm = document.getElementById('editDreamForm');
	if (editForm.style.display === 'none') {
		editForm.style.display = 'block';
	} else {
		editForm.style.display = 'none';
	}
}
let editButton = document.getElementById('editButton');
if (editButton) {
	editButton.addEventListener('click', function() {
		console.log('Edit button clicked');
		toggleEditForm();
	});
} else {
	console.error('Error: "Edit" button not found.');
}

function populateTypeDropdown() {
	let typeSelect = document.getElementById('editType');
	let types = ["Normal", "Lucid", "Nightmare", "Day", "Epic", "Awakening", "Terror", "Progressive", "Prophetic", "Recurring", "Vivid", "Surreal", "Empowering", "Inspirational", "Mystical", "Transformational", "Enlightening", "Symbolic", "Challenging", "Guiding", "Creative", "Harmonious"];
	types.forEach(function(type) {
		let option = document.createElement('option');
		option.textContent = type;
		option.value = type;
		typeSelect.appendChild(option);
	});
}

function populateEmotionDropdown() {
	let emotionSelect = document.getElementById('editEmotion');
	let emotionValues = ["Joy", "Bliss", "Anger", "Fear", "Dread", "Wonder", "Intrigue", "Fascination", "Happiness", "Amazement", "Relaxation", "Disorientation", "Sadness", "Surprise", "Disgust", "Love", "Amusement", "Adventure", "Guilt", "Hope", "Inspired", "Interested", "Prideful", "Serenity", "Curious", "Hate", "Trust", "Excitement"];
	emotionValues.forEach(function(emotion) {
		let option = document.createElement('option');
		option.textContent = emotion;
		option.value = emotion;
		emotionSelect.appendChild(option);
	});
}
