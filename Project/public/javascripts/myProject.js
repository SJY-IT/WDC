// JS for home.html Starts from here

function load_hotspot_list() {
    var hotspots = [];
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            //alert(this.response);    // Delete After Use
            hotspots =  JSON.parse(this.responseText);
            //alert(hotspots[i].infected_people + "\n" + hotspots[i].venue_name + "\n" + hotspots[i].address);
            for(let i=0; i<hotspots.length; i++) {
                var row = document.createElement("UL");
                row.style.display = "inline";
                var inf_people = document.createElement("LI");
                    inf_people.innerText = "# of Infected People : " + hotspots[i].infected_people;
                var ven_name = document.createElement("LI");
                    ven_name.innerText = "Visited Venue Name: " + hotspots[i].venue_name;
                var ven_address = document.createElement("LI");
                    ven_address.innerText =  "Venue Address: " + hotspots[i].address;
                row.appendChild(inf_people);
                row.appendChild(ven_name);
                row.appendChild(ven_address);
                document.getElementById("hotspot_list").appendChild(row);
            }
        }
    };

    xhttp.open("GET", '/hotspots', true);
    xhttp.send();
}

// JS for home.html Ends from here

// JS for index.html Starts from here
function checkIndexUser() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when user is logged in
            //var App = document.getElementById('App');
            //App.innerHTML = this.responseText;
            location.assign("/main.html");
        }
    };
    xhttp.open("GET", "/checkUser", true);
    // Send request
    xhttp.send();
}

function logIn() {
    var logInDetail = {
        logInId : document.getElementById("logInId").value,
        logInPwd : document.getElementById("logInPwd").value
    };
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when login was successful
            alert("Welcome " + logInDetail.logInId + " !");
            checkIndexUser();
        }
        else if(this.readyState == 4 && this.status != 200) {
            // Execute when login was Not successful
            alert("Log In was unsuccessful !\nReason: " + this.responseText);
        }
    };

    xhttp.open("POST", "/login", true);
    // Set content type to JSON
    xhttp.setRequestHeader("Content-type", "application/json");
    // Send request
    xhttp.send(JSON.stringify(logInDetail));
}

function logInVM() {
    var logInDetail = {
        logInId : document.getElementById("logInId").value,
        logInPwd : document.getElementById("logInPwd").value
    };
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when login was successful
            alert("Welcome " + logInDetail.logInId + " !");
            window.location.href = "mainManagers.html";

        }
        else if(this.readyState == 4 && this.status != 200) {
            // Execute when login was Not successful
            alert("Log In was unsuccessful !\nReason: " + this.responseText);
        }
    };

    xhttp.open("POST", "/login", true);
    // Set content type to JSON
    xhttp.setRequestHeader("Content-type", "application/json");
    // Send request
    xhttp.send(JSON.stringify(logInDetail));
}

function logInHO() {
    var logInDetail = {
        logInId : document.getElementById("logInId").value,
        logInPwd : document.getElementById("logInPwd").value
    };
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when login was successful
            alert("Welcome " + logInDetail.logInId + " !");
            window.location.href = "healthOfficialMain.html";

        }
        else if(this.readyState == 4 && this.status != 200) {
            // Execute when login was Not successful
            alert("Log In was unsuccessful !\nReason: " + this.responseText);
        }
    };

    xhttp.open("POST", "/login", true);
    // Set content type to JSON
    xhttp.setRequestHeader("Content-type", "application/json");
    // Send request
    xhttp.send(JSON.stringify(logInDetail));
}

function SignUp() {
    var signUpDetail = {
        signUpFName : document.getElementById("signUpFName").value,
        signUpLName : document.getElementById("signUpLName").value,
        signUpId : document.getElementById("signUpId").value,
        signUpPwd : document.getElementById("signUpPwd").value,
        signUpAddress : document.getElementById("signUpAddress").value,
        signUpContactNumber : document.getElementById("signUpContactNumber").value,
        signUpEmailAddress : document.getElementById("signUpEmailAddress").value
    };
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when sign up was successful
            alert("Congrats !\n" + this.response );
            show_logInBox();
        }
        else if(this.readyState == 4 && this.status != 200) {
            // Execute when sign up was Not successful
            alert("Sign Up was unsuccessful !\nReason: " + this.responseText);
        }
    };

    xhttp.open("POST", "/signup", true);
    // Set content type to JSON
    xhttp.setRequestHeader("Content-type", "application/json");
    // Send request
    xhttp.send(JSON.stringify(signUpDetail));
}

function logout() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when login was successful
            alert('You have been Logged Out');

        }
        else if(this.readyState == 4 && this.status != 200) {
            // Execute when login was Not successful
            alert('Log Out Fail');
        }
    };

    xhttp.open("GET", "/logout", true);
    // Send request
    xhttp.send();
}

var logInBox = document.getElementById('logInBox');
var signUpBox = document.getElementById('signUpBox');
function show_logInBox() {
    if (logInBox.style.display === "none") {
        signUpBox.style.display = "none";
        logInBox.style.display = "block";
    }
}
function show_signUpBox() {
    if (signUpBox.style.display === "none") {
        logInBox.style.display = "none";
        signUpBox.style.display = "block";
    }
}

// JS for index.html Ends from here

// JS for main.html starts

function gotoAccount() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when user is logged in
            //var App = document.getElementById('App');
            //App.innerHTML = this.responseText;
            location.assign("/account.html");
        }
    };
    xhttp.open("GET", "/gotoAccount", true);
    // Send request
    xhttp.send();
}

function checkUser() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status != 200) {
            // Execute when user is logged in
            //var App = document.getElementById('App');
            //App.innerHTML = this.responseText;
            location.assign("/index.html");
        }
    };
    xhttp.open("GET", "/checkUser", true);
    // Send request
    xhttp.send();
}

// JS for main.html ends

// JS for account.html starts

function loadAccountDetail() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when user is logged in
            var accountDetail = [];
            accountDetail = JSON.parse(this.responseText);
            var table = document.getElementById('accountDetail');
            table.innerHTML =
            `
            <tr>
                <th>Name</th>
                <td>${accountDetail[0].firstname + " " + accountDetail[0].lastname}</td>
            </tr>
            <tr>
                <th>User ID</th>
                <td>${accountDetail[0].username}</td>
            </tr>
            <tr>
                <th>Password</th>
                <td>********</td>
                <td><button onclick="show_editPassword()">Edit</button></td>
            </tr>
            <tr>
                <th>Address</th>
                <td id="accountAddress">${accountDetail[0].address}</td>
                <td><button onclick="show_editAddress()">Edit</button></td>
            </tr>
            <tr>
                <th>contact_number</th>
                <td id="accountContactNumber">${accountDetail[0].contact_number}</td>
                <td><button onclick="show_editContactNumber()">Edit</button></td>
            </tr>
            <tr>
                <th>email_address</th>
                <td id="accountEmailAddress">${accountDetail[0].email_address}</td>
                <td><button onclick="show_editEmailAddress()">Edit</button></td>
            </tr>
          `;
        }
    };
    xhttp.open("GET", "/getAccountDetail", true);
    // Send request
    xhttp.send();
}


var editWhich = "";
function show_editPassword() {
    editWhich = "password";
    document.getElementById("accountEditDiv").style.display = "block";
    document.getElementById("editPassword").style.display = "block";
    document.getElementById("editSubmit").style.display = "block";
    document.getElementById("editCancel").style.display = "block";

    document.getElementById("editAddress").style.display = "none";
    document.getElementById("editContactNumber").style.display = "none";
    document.getElementById("editEmailAddress").style.display = "none";
}
function show_editAddress() {
    editWhich = "address";
    document.getElementById("accountEditDiv").style.display = "block";
    document.getElementById("editAddress").style.display = "block";
    document.getElementById("editSubmit").style.display = "block";
    document.getElementById("editCancel").style.display = "block";

    document.getElementById("editPassword").style.display = "none";
    document.getElementById("editContactNumber").style.display = "none";
    document.getElementById("editEmailAddress").style.display = "none";
}
function show_editContactNumber() {
    editWhich = "contactnumber";
    document.getElementById("accountEditDiv").style.display = "block";
    document.getElementById("editContactNumber").style.display = "block";
    document.getElementById("editSubmit").style.display = "block";
    document.getElementById("editCancel").style.display = "block";

    document.getElementById("editPassword").style.display = "none";
    document.getElementById("editAddress").style.display = "none";
    document.getElementById("editEmailAddress").style.display = "none";
}
function show_editEmailAddress() {
    editWhich = "emailaddress";
    document.getElementById("accountEditDiv").style.display = "block";
    document.getElementById("editEmailAddress").style.display = "block";
    document.getElementById("editSubmit").style.display = "block";
    document.getElementById("editCancel").style.display = "block";

    document.getElementById("editPassword").style.display = "none";
    document.getElementById("editAddress").style.display = "none";
    document.getElementById("editContactNumber").style.display = "none";
}
function editCancel() {
    editWhich = "";
    document.getElementById("editPassword").value = "";
    document.getElementById("editAddress").value = "";
    document.getElementById("editContactNumber").value = "";
    document.getElementById("editEmailAddress").value = "";
    document.getElementById("accountEditDiv").style.display = "none";
}
function editAccountDetail() {
    var editAccountDetail = {};

    if(editWhich == "") {
        return;
    } else if(editWhich == "password") {
        editAccountDetail =
        {
            editWhich : "password",
            editPassword : document.getElementById("editPassword").value
        };
    } else if(editWhich == "address") {
        editAccountDetail =
        {
            editWhich : "address",
            editAddress : document.getElementById("editAddress").value
        };
    } else if(editWhich == "contactnumber") {
        editAccountDetail =
        {
            editWhich : "contactnumber",
            editContactNumber : document.getElementById("editContactNumber").value
        };
    } else if(editWhich == "emailaddress") {
        editAccountDetail =
        {
            editWhich : "emailaddress",
            editEmailAddress : document.getElementById("editEmailAddress").value
        };
    } else {
        return;
    }

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when sign up was successful
            var editedDetail = [];
            loadAccountDetail();
            editCancel();
        }
        else if(this.readyState == 4 && this.status != 200) {
            // Execute when sign up was Not successful
            editCancel();
        }
    };

    xhttp.open("POST", "/editAccountDetail", true);
    // Set content type to JSON
    xhttp.setRequestHeader("Content-type", "application/json");
    // Send request
    xhttp.send(JSON.stringify(editAccountDetail));
}
// JS for account.html ends

// JS for check-in-history.html starts

function loadcheckinhistory() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when user is logged in
            var checkinhistory = [];
            checkinhistory = JSON.parse(this.responseText);
            var table = document.getElementById('checkinhistory');
            table.innerHTML =
            `
            <tr>
              <th>Name of Venue</th>
              <th>Venue Code</th>
              <th>Date-Time of Visit</th>
            </tr>
            `;
            for(let i=0; i<checkinhistory.length; i++) {
                var row = document.createElement("tr");
                row.innerHTML =
                `
                  <td>${checkinhistory[i].venue_name}</td>
                  <td>${checkinhistory[i].venue_id}</td>
                  <td>${checkinhistory[i].visit_date}</td>
                `;
                table.appendChild(row);
            }
        }
    };
    xhttp.open("GET", "/getCheckInHistory", true);
    // Send request
    xhttp.send();
}

function loadcheckinhistoryfull() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when user is logged in
            var checkinhistory = [];
            checkinhistory = JSON.parse(this.responseText);
            var table = document.getElementById('checkinhistory');
            table.innerHTML =
            `
            <tr>
              <th>Name of Venue</th>
              <th>Venue Code</th>
              <th>Date-Time of Visit</th>
            </tr>
            `;
            for(let i=0; i<checkinhistory.length; i++) {
                var row = document.createElement("tr");
                row.innerHTML =
                `
                  <td>${checkinhistory[i].venue_name}</td>
                  <td>${checkinhistory[i].venue_id}</td>
                  <td>${checkinhistory[i].visit_date}</td>
                `;
                table.appendChild(row);
            }
        }
    };
    xhttp.open("GET", "/getCheckInHistoryFull", true);
    // Send request
    xhttp.send();
}

// JS for check-in-history.html ends

// JS for check.html

var x = document.getElementById("location");
var longitude;
var latitude;
var checkinaddress;
var venueCode;
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
}

function convertLocation() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when user is logged in
            var locationDetail = JSON.parse(this.responseText);
            checkinaddress = locationDetail.features[0].place_name;
            x.innerText = checkinaddress;
        }
    };
    xhttp.open("GET", "https://api.mapbox.com/geocoding/v5/mapbox.places/" + longitude + "," + latitude + ".json?access_token=pk.eyJ1Ijoic2xhY2tvMDMyMCIsImEiOiJja3BzN2Z0MTAwNHBuMnZzNDh2NGkxZzhjIn0.P7VslKjVKdUJI5F5Z1Yobw", true);
    // Send request
    xhttp.send();
}

function checkinlocation() {
    var addressDetail =
    {
        checkinaddress : checkinaddress,
        venueCode : venueCode
    };
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when user is logged in
            alert("You are successfully checked in");
        } else if (this.readyState == 4 && this.status != 200) {
            alert("Check In Failed");
        }
    };
    xhttp.open("POST", "/checkIn", true);
    // Send request
    xhttp.setRequestHeader("Content-type", "application/json");
    // Send request
    xhttp.send(JSON.stringify(addressDetail));
}

function checkVenuePresence() {
    var addressDetail =
    {
        checkinaddress : checkinaddress
    };
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when user is logged in
            alert("The Venue Exist in our Database");
            getVenueCode();
        } else if (this.readyState == 4 && this.status != 200) {
            alert("Venue does not exist with corresponding Address\nPlease add a new Venue.");
            document.getElementById("addVenueLocation").style.display = "block";
        }
    };
    xhttp.open("POST", "/checkVenuePresence", true);
    // Send request
    xhttp.setRequestHeader("Content-type", "application/json");
    // Send request
    xhttp.send(JSON.stringify(addressDetail));
}

function getVenueCode() {
    var addressDetail =
    {
        checkinaddress : checkinaddress
    };
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when user is logged in
            var venueCodeJson = [];
            venueCodeJson = JSON.parse(this.responseText);
            venueCode = venueCodeJson[0].venue_id;
            getUserCode();
            alert("The Venue Code is : " + venueCode);
            checkinlocation();
        } else if (this.readyState == 4 && this.status != 200) {
            alert("Venue Code retrieve Failed");
        }
    };
    xhttp.open("POST", "/getVenueCode", true);
    // Send request
    xhttp.setRequestHeader("Content-type", "application/json");
    // Send request
    xhttp.send(JSON.stringify(addressDetail));
}

function getUserCode() {
     var xhttp = new XMLHttpRequest();
     xhttp.open("GET", "/getUserCode", true);
     xhttp.send();
}

function addVenueLocation() {
    var venueDetail = {
        venueName : document.getElementById("venueName").value,
        venueAddress : document.getElementById("venueAddress").value,
        venueCapacity : document.getElementById("venueCapacity").value
    };

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            // Execute when sign up was successful
            alert("Venue has been added. Try Check In again.");
        }
        else if(this.readyState == 4 && this.status != 200) {
            // Execute when sign up was Not successful
            alert("Adding Venue was unsuccessful");
        }
    };

    xhttp.open("POST", "/addVenueLocation", true);
    // Set content type to JSON
    xhttp.setRequestHeader("Content-type", "application/json");
    // Send request
    xhttp.send(JSON.stringify(venueDetail));
}

// JS for check.html