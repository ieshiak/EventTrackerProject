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
