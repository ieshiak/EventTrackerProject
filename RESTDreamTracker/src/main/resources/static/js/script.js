//script.js

console.log('script.js loaded')

window.addEventListener('load', function(e) {
	console.log('page loaded');
	loadAllDreams();

	// Get a reference to the "Create" button
	let createButton = document.getElementById('createButton');

	// Check if the "Create" button exists before adding the event listener
	if (createButton) {
		createButton.addEventListener('click', createNewDream);
	} else {
		console.error('Error: "Create" button not found.');
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

	let editButton = document.createElement('button');
	editButton.textContent = 'Edit';
	editButton.className = 'edit-button'; // Apply CSS class for styling
	editButton.addEventListener('click', function() {
		// Handle edit button click event
		// Implement your edit functionality here
	});
	detailsBox.appendChild(editButton);

	let deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete';
	deleteButton.className = 'delete-button'; // Apply CSS class for styling
	deleteButton.addEventListener('click', function() {
		// Handle delete button click event
		// Implement your delete functionality here
	});
	detailsBox.appendChild(deleteButton);

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
