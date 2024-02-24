//script.js

console.log('script.js loaded')

window.addEventListener('load', function(e) {
	console.log('page loaded');
	loadAllDreams();
	populateTypeDropdown();
    populateEmotionDropdown();

	// Get a reference to the "Create" button
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
			toggleEditForm(); // Toggle the display of the edit form
		});
	}
});

// Your other functions go here...

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
		dataDiv.innerHTML = ''; // Clear existing content
		dataDiv.appendChild(ul); // Append the ul element with list items
	}
}


function displayDreamDetails(dream) {
	console.log('Dream object:', dream);
	let detailsBox = document.getElementById('dreamDetailsBox');
	detailsBox.innerHTML = ''; // Clear existing content


	// Add dream title to the details box
	detailsBox.innerHTML += '<p>Title: ' + dream.title + '</p>';

	// Display username and photo if available
	if (dream.user && dream.user.username) {
		let userContainer = document.createElement('div');

		if (dream.user.avatarURL) {
			let userPhoto = document.createElement('img');
			userPhoto.src = dream.user.avatarURL;
			userPhoto.alt = 'User Photo';
			// Set width and height
			userPhoto.style.width = '100px';
			userPhoto.style.height = '100px';
			userContainer.appendChild(userPhoto);
		}

		let usernameElement = document.createElement('p');
		usernameElement.textContent = 'Username: ' + dream.user.username;
		userContainer.appendChild(usernameElement);

		// Append the user container to the details box
		detailsBox.appendChild(userContainer);
	}

	// Add dream description to the details box
	detailsBox.innerHTML += '<p>Description: ' + dream.description + '</p>';

	// Create a ul element to hold the list items
	let ul = document.createElement('ul');
	ul.style.listStyleType = 'none'; // Remove default bullets

	// Create list items for date, time, type, and emotion
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

	// Append the ul element to the details box
	detailsBox.appendChild(ul);

	// Styling for bullets
	let liItems = ul.querySelectorAll('li');
	liItems.forEach(function(li) {
		li.style.position = 'relative';
		li.style.paddingLeft = '20px'; // Adjust the spacing according to your needs
		li.style.marginBottom = '5px'; // Adjust the margin bottom according to your needs

		let starIcon = document.createElement('i');
		starIcon.className = 'far fa-star'; // Use the outlined star icon
		starIcon.style.position = 'absolute';
		starIcon.style.left = '0';
		li.insertBefore(starIcon, li.firstChild);
	});
	// Create "Edit" button
	let editButton = document.createElement('button');
	editButton.textContent = 'Edit';

	// Add event listener to "Edit" button
	editButton.addEventListener('click', function() {
		console.log('Edit button clicked');
		editDream(dream.id); // Call editDream function with dream ID
	});

	// Append "Edit" button to detailsBox
	detailsBox.appendChild(editButton);

	let deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.addEventListener('click', function() {
		console.log('Delete button clicked');
		deleteDream(dream.id); // Pass dream object to deleteDream function
	});

	detailsBox.appendChild(deleteButton);

	// Display the details box
	detailsBox.style.display = 'block';
}


//create new dream
function createNewDream() {
	console.log('Creating new dream...');
	// Clear the existing content in the details box
	let detailsBox = document.getElementById('dreamDetailsBox');
	detailsBox.innerHTML = '';

	// Add a dropdown list for selecting an existing user
	let userSelect = document.createElement('select');
	userSelect.setAttribute('placeholder', 'Select User');

	// Retrieve the list of existing users from your server (assuming it's available)
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

	// Append the user select element to the detailsBox
	detailsBox.appendChild(userSelect);

	// Add input fields for creating a new dream
	let titleInput = document.createElement('input');
	titleInput.setAttribute('type', 'text');
	titleInput.setAttribute('placeholder', 'Enter title');
	detailsBox.appendChild(titleInput);

	let descriptionInput = document.createElement('textarea');
	descriptionInput.setAttribute('placeholder', 'Enter description');
	detailsBox.appendChild(descriptionInput);

	// Add input field for date selection
	let dateInput = document.createElement('input');
	dateInput.setAttribute('type', 'date');
	dateInput.setAttribute('placeholder', 'Select Date');
	detailsBox.appendChild(dateInput);

	// Add input field for time selection
	let timeInput = document.createElement('input');
	timeInput.setAttribute('type', 'time');
	timeInput.setAttribute('placeholder', 'Select Time');
	detailsBox.appendChild(timeInput);

	// Get the enum values
	let types = ["Normal", "Lucid", "Nightmare", "Day", "Epic", "Awakening", "Terror", "Progressive", "Prophetic", "Recurring", "Vivid", "Surreal", "Empowering", "Inspirational", "Mystical", "Transformational", "Enlightening", "Symbolic", "Challenging", "Guiding", "Creative", "Harmonious"];

	// Create a select element for type selection
	let typeSelect = document.createElement('select');
	typeSelect.setAttribute('placeholder', 'Select Type');

	// Create an option element for each type and append it to the select element
	types.forEach(function(type) {
		let option = document.createElement('option');
		option.textContent = type;
		option.value = type; // Set the value attribute of the option
		typeSelect.appendChild(option);
	});

	// Append the select element to the detailsBox
	detailsBox.appendChild(typeSelect);


	// Sample enum values for Emotion
	let emotionValues = ["Joy", "Bliss", "Anger", "Fear", "Dread", "Wonder", "Intrigue", "Fascination", "Happiness", "Amazement", "Relaxation", "Disorientation", "Sadness", "Surprise", "Disgust", "Love", "Amusement", "Adventure", "Guilt", "Hope", "Inspired", "Interested", "Prideful", "Serenity", "Curious", "Hate", "Trust", "Excitement"];

	// Create a select element for emotion selection
	let emotionSelect = document.createElement('select');
	emotionSelect.setAttribute('placeholder', 'Select Emotion');

	// Create an option element for each emotion and append it to the select element
	emotionValues.forEach(function(emotion) {
		let option = document.createElement('option');
		option.textContent = emotion;
		option.value = emotion; // Set the value attribute of the option
		emotionSelect.appendChild(option);
	});

	// Append the select element to the detailsBox
	detailsBox.appendChild(emotionSelect);

	// Create a button to submit the new dream
	let submitButton = document.createElement('button');
	submitButton.textContent = 'Submit';
	submitButton.addEventListener('click', function() {
		// Check if a user is selected
		if (!userSelect.value) {
			alert('Please select a user.');
			return;
		}

		console.log('Selected user ID:', userSelect.value);

		// Check if title and description are filled
		if (!titleInput.value || !descriptionInput.value) {
			alert('Please fill in the title and description.');
			return;
		}
		// Concatenate the date and time strings
		let selectedDate = dateInput.value;
		let selectedTime = timeInput.value;

		// Concatenate the date and time strings with a space between them
		let dateTimeString = selectedDate + 'T' + selectedTime;

		let newDream = {
			user: { id: userSelect.value }, // Set the user field with the selected user ID
			title: titleInput.value,
			description: descriptionInput.value,
			type: typeSelect.value,
			emotion: emotionSelect.value,
			dateTime: dateTimeString, // Set the dateTime field with the concatenated date and time string
			date: selectedDate, // Optionally, you can include the date and time separately if needed
			time: selectedTime
		};
		saveDream(newDream);
		// Display the details of the newly created dream
		displayDreamDetails(newDream);
	});

	detailsBox.appendChild(submitButton);

	// Display the details box
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

	// Check if the editForm exists
	let editForm = document.getElementById('editDreamForm');
	console.log('Edit form:', editForm); // Log the editForm

	// Make the edit form visible
	if (editForm) {
		editForm.style.display = 'block';
		console.log('Edit form is set to display: block');
	} else {
		console.error('Edit form not found!');
	}

	// Populate the form fields with the existing dream details using the dreamId
	// You may need to fetch the dream details from the server based on the dreamId

	// Example: Fetch dream details from the server
	fetch('api/dreams/' + dreamId)
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				throw new Error('Failed to fetch dream details');
			}
		})
		.then(dream => {
			// Populate form fields with dream details
			console.log('Dream details:', dream); // Log the dream details
			document.getElementById('editTitle').value = dream.title;
			document.getElementById('editDescription').value = dream.description;
			document.getElementById('editType').value = dream.type;
			document.getElementById('editEmotion').value = dream.emotion;
			document.getElementById('editDate').value = dream.date;
			document.getElementById('editTime').value = dream.time;
		})
		.catch(error => {
			console.error('Error fetching dream details:', error);
			// Optionally, display an error message or handle the error
		});

	// Assuming you have a submit button in the edit form
	let submitButton = document.getElementById('editSubmitButton');
	console.log('Submit button:', submitButton); // Log the submit button
	submitButton.addEventListener('click', function() {
		// Retrieve updated values from the form fields
		let updatedTitle = document.getElementById('editTitle').value;
		let updatedDescription = document.getElementById('editDescription').value;
		let updatedType = document.getElementById('editType').value;
		let updatedEmotion = document.getElementById('editEmotion').value;
		let updatedDate = document.getElementById('editDate').value;
		let updatedTime = document.getElementById('editTime').value;

		// Construct the updated dream object
		let updatedDream = {
			id: dreamId, // Assuming you need the ID for updating on the server
			title: updatedTitle,
			description: updatedDescription,
			type: updatedType,
			emotion: updatedEmotion,
			dateTime: updatedDate + 'T' + updatedTime, // Combine date and time
			date: updatedDate, // Optionally, include separate date and time fields if needed
			time: updatedTime
		};

		// Send the updated dream object to the server
		saveEditedDream(updatedDream);
	});
}


// Function to send the edited dream to the server
function saveEditedDream(updatedDream) {
	fetch('api/dreams/' + updatedDream.id, {
		method: 'PUT', // Assuming you use PUT method for updating
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(updatedDream)
	})
		.then(response => {
			if (response.ok) {
				console.log('Dream updated successfully');
				// Optionally, update the UI or perform any additional tasks
			} else {
				console.error('Error updating dream:', response.status);
				// Optionally, display an error message or handle the error
			}
		})
		.catch(error => {
			console.error('Error updating dream:', error);
			// Optionally, display an error message or handle the error
		});
}

// Function to toggle the display of the edit form
function toggleEditForm() {
    let editForm = document.getElementById('editDreamForm');
    if (editForm.style.display === 'none') {
        editForm.style.display = 'block';
    } else {
        editForm.style.display = 'none';
    }
}

// Get a reference to the "Edit" button
let editButton = document.getElementById('editButton');

// Check if the "Edit" button exists before adding the event listener
if (editButton) {
    editButton.addEventListener('click', function() {
        console.log('Edit button clicked');
        toggleEditForm(); // Toggle the display of the edit form
    });
} else {
    console.error('Error: "Edit" button not found.');
}
// Function to populate the type dropdown with enum values
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

// Function to populate the emotion dropdown with enum values
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