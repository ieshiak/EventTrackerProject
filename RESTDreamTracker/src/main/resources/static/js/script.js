//script.js

console.log('script.js loaded')

window.addEventListener('load', function(e) {
	console.log('page loaded');
	loadAllDreams();

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
    // Create an img element for the dreamer image
    let dreamerImage = document.createElement('img');
    dreamerImage.src = '/api/images/' + dream.imgUrl;
    dreamerImage.alt = 'Dreamer Image'; // Set alt text for accessibility
    dreamerImage.style.width = '100px'; // Set width (adjust as needed)
    dreamerImage.style.height = '100px'; // Set height (adjust as needed)

    // Append the dreamer image to the details box
    detailsBox.appendChild(dreamerImage);
    
    detailsBox.innerHTML += '<p>Date: ' + dream.date + ' Time: ' + dream.time + '</p>';
    detailsBox.innerHTML += '<p>Title: ' + dream.title + '</p>';
    detailsBox.innerHTML += '<p>Dreamer: ' + dream.dreamer + '</p>';


    // Display other dream details
    detailsBox.innerHTML += '<p>Description: ' + dream.description + '</p>';
    
    // Create ul element
    let ul = document.createElement('ul');
    ul.style.listStyleType = 'none';
    
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

//create dream
function createNewDream() {
    console.log('Creating new dream...');
    let detailsBox = document.getElementById('dreamDetailsBox');
    detailsBox.innerHTML = '';
    
    Promise.all([
        populatePhotoOptions(detailsBox),
        populateTypeOptions(detailsBox),
        populateEmotionOptions(detailsBox)
    ]).then(() => {

        // Dropdown menu for selecting a photo
        let photoSelect = document.createElement('select');
        photoSelect.setAttribute('placeholder', 'Select Photo');

        // Input for dreamer's name
        let dreamerInput = document.createElement('input');
        dreamerInput.setAttribute('type', 'text');
        dreamerInput.setAttribute('placeholder', "Dreamer's name");
        detailsBox.appendChild(dreamerInput);

        // Input for dream title
        let titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('placeholder', 'Enter title');
        detailsBox.appendChild(titleInput);

        // Textarea for dream description
        let descriptionInput = document.createElement('textarea');
        descriptionInput.setAttribute('placeholder', 'Enter description');
        detailsBox.appendChild(descriptionInput);

        // Input for selecting dream date
        let dateInput = document.createElement('input');
        dateInput.setAttribute('type', 'date');
        dateInput.setAttribute('placeholder', 'Select Date');
        detailsBox.appendChild(dateInput);

        // Input for selecting dream time
        let timeInput = document.createElement('input');
        timeInput.setAttribute('type', 'time');
        timeInput.setAttribute('placeholder', 'Select Time');
        detailsBox.appendChild(timeInput);

        // Dropdown menu for selecting a type
        let typeSelect = document.createElement('select');
        typeSelect.setAttribute('placeholder', 'Select Type');
        
        // Dropdown menu for selecting an emotion
        let emotionSelect = document.createElement('select');
        emotionSelect.setAttribute('placeholder', 'Select Emotion');

        // Submit button
        let submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', function() {
            let newDream = {
                dreamer: dreamerInput.value,
                title: titleInput.value,
                description: descriptionInput.value,
                type: typeSelect.value,
                emotion: emotionSelect.value,
                date: dateInput.value,
                time: timeInput.value,
                imgUrl: photoSelect.value
            }
            saveDream(newDream);
            displayDreamDetails(newDream);
        });
        detailsBox.appendChild(submitButton);

        detailsBox.style.display = 'block';
    });
}

function populatePhotoOptions(detailsBox) {
    let photoSelect = document.createElement('select');
    photoSelect.setAttribute('placeholder', 'Select Photo');

    // Fetch photo options from backend
    fetch('/api/images') // Adjust the URL according to your backend endpoint
        .then(response => response.json())
        .then(photoOptions => {
            photoOptions.forEach(option => {
                let optionElement = document.createElement('option');
                optionElement.textContent = option;
                optionElement.value = option;
                photoSelect.appendChild(optionElement);
            });
        })
        .catch(error => console.error('Error fetching photo options:', error));

    // Append the photoSelect dropdown to the detailsBox
    detailsBox.appendChild(photoSelect);
}


function populateEmotionOptions(detailsBox) {
    fetch('api/dreams/emotions')
        .then(response => response.json())
        .then(emotionOptions => {
            let emotionSelect = document.createElement('select');
            emotionSelect.setAttribute('id', 'emotionSelect'); // Add ID to the select element
            emotionOptions.forEach(option => {
                let optionElement = document.createElement('option');
                optionElement.textContent = option;
                optionElement.value = option;
                emotionSelect.appendChild(optionElement);
            });
            // Append emotionSelect to the detailsBox
            detailsBox.appendChild(emotionSelect);
        })
        .catch(error => console.error('Error fetching emotion options:', error));
}

function populateTypeOptions(detailsBox) {
    fetch('/api/dreams/types')
        .then(response => response.json())
        .then(typeOptions => {
            let typeSelect = document.createElement('select');
            typeSelect.setAttribute('id', 'typeSelect'); // Add ID to the select element
            typeOptions.forEach(option => {
                let optionElement = document.createElement('option');
                optionElement.textContent = option;
                optionElement.value = option;
                typeSelect.appendChild(optionElement);
            });
            // Append typeSelect to the detailsBox
            detailsBox.appendChild(typeSelect);
        })
        .catch(error => console.error('Error fetching type options:', error));
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

    // Show the edit form
    let editForm = document.getElementById('editDreamForm');
    if (editForm) {
        editForm.style.display = 'block';
    } else {
        console.error('Edit form not found!');
        return; // Exit function if edit form not found
    }

    // Function to populate dropdown options
    function populateDropdown(selectElement, options) {
        options.forEach(option => {
            let optionElement = document.createElement('option');
            optionElement.textContent = option;
            optionElement.value = option; // Set value same as text for simplicity
            selectElement.appendChild(optionElement);
        });
    }

    // Assuming these functions are defined to populate dropdown options
    Promise.all([
        populateTypeOptions(document.getElementById('editType')), // Populate type dropdown
        populateEmotionOptions(document.getElementById('editEmotion')) // Populate emotion dropdown
    ]).then(() => {
        // Fetch dream details and populate form fields
        fetch('api/dreams/' + dreamId)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch dream details');
                }
            })
            .then(dreamData => {
                console.log('Dream details:', dreamData);

                // Populate form fields with dream details
                document.getElementById('editPhoto').value = '/api/images/' + dreamData.imgUrl;
                document.getElementById('editDreamer').value = dreamData.dreamer;
                document.getElementById('editTitle').value = dreamData.title;
                document.getElementById('editDescription').value = dreamData.description;
                document.getElementById('editType').value = dreamData.type;
                document.getElementById('editEmotion').value = dreamData.emotion;
                document.getElementById('editDate').value = dreamData.date;
                document.getElementById('editTime').value = dreamData.time;

                // Add event listener to submit button
                let submitButton = document.getElementById('editSubmitButton');
                submitButton.addEventListener('click', function () {
                    let updatedPhoto = document.getElementById('editPhoto').value;
                    let updatedDreamer = document.getElementById('editDreamer').value;
                    let updatedTitle = document.getElementById('editTitle').value;
                    let updatedDescription = document.getElementById('editDescription').value;
                    let updatedType = document.getElementById('editType').value;
                    let updatedEmotion = document.getElementById('editEmotion').value;
                    let updatedDate = document.getElementById('editDate').value;
                    let updatedTime = document.getElementById('editTime').value;

                    let updatedDream = {
                        id: dreamId,
                        imgUrl: updatedPhoto,
                        dreamer: updatedDreamer,
                        title: updatedTitle,
                        description: updatedDescription,
                        type: updatedType,
                        emotion: updatedEmotion,
                        date: updatedDate,
                        time: updatedTime
                    };
                    saveEditedDream(updatedDream);
                });
            })
            .catch(error => {
                console.error('Error fetching dream details:', error.message);
            });
    });
}
function saveEditedDream(updatedDream) {
    console.log('Updated Dream:', updatedDream); // Log the updatedDream object
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
                return response.json(); // Assuming you want to do something with the updated dream data
            } else {
                console.error('Error updating dream:', response.status);
            }
        })
        .then(updatedDreamData => {
            // Do something with the updated dream data if needed
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
        toggleEditForm(); // Call toggleEditForm function when the edit button is clicked
    });
}
