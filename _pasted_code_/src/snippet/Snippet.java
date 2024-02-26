<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Dream Tracker</title>
<link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<link rel="stylesheet" type="text/css" href="css/styles.css">
</head>
<body>
    <div class="container">
        <div class="dream-list-container">
            <div id="dreamCount"></div>
            <h1>Welcome to Dream Tracker</h1>
            <h3>Dream List</h3>
            <div id="dreamListDiv"></div>
            <button id="createButton">Create New Dream</button>
        </div>
        <div class="edit-create-container">
            <div id="dreamDetailsBox" style="display: none;"></div>
            <form id="editDreamForm" style="display: none;">
                <input type="hidden" id="editUserId" name="editUserId"> <label
                    for="editTitle">Title:</label> <input type="text" id="editTitle"
                    name="editTitle"><br> <label for="editDescription">Description:</label>
                <textarea id="editDescription" name="editDescription"></textarea>
                <br> <label for="editType">Type:</label> <select id="editType"
                    name="editType">
                    <!-- Options for different dream types -->
                </select><br> <label for="editEmotion">Emotion:</label> <select
                    id="editEmotion" name="editEmotion">
                    <!-- Options for different emotions -->
                </select><br> <label for="editDate">Date:</label> <input type="date"
                    id="editDate" name="editDate"><br> <label
                    for="editTime">Time:</label> <input type="time" id="editTime"
                    name="editTime"><br> <label for="editUser">User:</label>
                <select id="editUser" name="editUser">
                    <!-- Options for different users -->
                </select><br>
                <button type="button" id="editSubmitButton">Submit</button>
            </form>
        </div>
    </div>
    <script>
    function fetchDreamCount() {
        fetch('api/dreams/count')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok, status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Update the dreamCount element with the count
                document.getElementById('dreamCount').innerText = `Total Dreams: ${data}`;
            })
            .catch(error => {
                console.error('Error fetching dream count:', error);
            });
    }

    // Call the function when the page loads
    window.addEventListener('load', fetchDreamCount);
    </script>
    <script src="js/script.js"></script>
</body>
</html>
