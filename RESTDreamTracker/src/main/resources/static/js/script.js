//script.js

console.log('script.js loaded')

window.addEventListener('load', function(evt) {
	console.log('page loaded');
	loadAllDreams();
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
        dataDiv.innerHTML = ''; // Clear existing content
        dataDiv.appendChild(ul); // Append the ul element with list items
    }
}

function displayDreamDetails(dream) {
    let detailsBox = document.getElementById('dreamDetailsBox');
    detailsBox.innerHTML = ''; // Clear existing content
    detailsBox.innerHTML += '<p>Title: ' + dream.title + '</p>';
    detailsBox.innerHTML += '<p>Description: ' + dream.description + '</p>';
    detailsBox.innerHTML += '<p>Date: ' + dream.date + '</p>';
    
    detailsBox.style.display = 'block'; // Display the details box
}
