var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hotspots', function(req, res) {
    // Connect to the database
    req.pool.getConnection(function(err, connection) {
        if(err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT hotspot.infected_people, venue.venue_name, venue.address FROM hotspot INNER JOIN venue ON venue.venue_id = hotspot.venue_id ORDER BY hotspot.infected_people DESC LIMIT 5;";

        connection.query(query, function(err, rows, field) {
            connection.release(); // release connection
            if(err) {
                res.sendStatus(500);
                return;
            }
            else {
                res.json(rows);
            }
            res.end(); // end response
        });
    });
});


router.post('/login', function(req, res) {
    //console.log(req.body.logInId);  // Delete After Use
    //console.log(req.body.logInPwd); // Delete After Use
    // Connect to the database
    req.pool.getConnection(function(err, connection) {
        if(err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT COUNT(user_id) AS matchFound FROM user_profile WHERE username = '" + req.body.logInId + "' AND password = '" + req.body.logInPwd + "';";

        connection.query(query, function(err, rows, field) {
            connection.release(); // release connection
            var userIdentified = rows[0].matchFound;    // if userIdentified is 0, login detail is invalid. if its 1, then login detail is valid.
            //console.log(userIdentified);    // Delete After Use
            if(err) {
                res.sendStatus(500);
                return;
            }
            else if(userIdentified == 0) {
                res.sendStatus(401);
                return;
            }
            else if(userIdentified >= 1) {
                req.session.user = req.body;
                res.sendStatus(200);
                return;
            }
            res.end(); // end response
        });
    });
});


router.post('/signup', function(req, res) {
    // Connect to the database
    //console.log(req.body.signUpId);   // Delete After Use
    //console.log(req.body.signUpPwd);  // Delete After Use
    if(req.body.signUpFName == '' || req.body.signUpLName == '' || req.body.signUpId == '' || req.body.signUpPwd == '' || req.body.signUpAddress == '' || req.body.signUpContactNumber == '' || req.body.signUpEmailAddress == '') {
        res.sendStatus(401);
        return;
    }
    req.pool.getConnection(function(err, connection) {
        if(err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT COUNT(user_id) AS matchFound FROM user_profile WHERE username = '" + req.body.signUpId + "';";

        connection.query(query, function(err, rows, field) {
            var userIdentified = rows[0].matchFound;    // if userIdentified is 0, sign up id is available to use. if its 1, the requested sign up id already exists.

            if(err) {
                res.sendStatus(500);
                return;
            }
            else if(userIdentified == 0) {
                var query2 = "INSERT INTO user_profile (firstname, lastname, username, password, address, contact_number, email_address) VALUES ('" + req.body.signUpFName + "', '" + req.body.signUpLName + "', '"+ req.body.signUpId + "', '" + req.body.signUpPwd + "', '" + req.body.signUpAddress + "', '" + req.body.signUpContactNumber + "', '" + req.body.signUpEmailAddress + "');";
                connection.query(query2, function(err, rows, field) {
                    connection.release(); // release connection
                    if(err) {
                        res.sendStatus(500);
                        return;
                    }
                        res.end(); // end response
                });
                return;
            }
            else if(userIdentified == 1) {
                res.sendStatus(401);
                return;
            }
            res.end(); // end response
        });
    });
});

router.get('/logout', function(req, res){
    delete req.session.user;
    res.send();
});


router.get('/checkUser', function(req,res) {
    if('user' in req.session) {
      //res.redirect('main.html');
      res.send();
      } else {
        res.sendStatus(401);
      }
});

router.get('/gotoAccount', function(req,res) {
    if('user' in req.session) {
      res.redirect('account.html');
      } else {
        res.sendStatus(401);
      }
});

router.get('/getAccountDetail', function(req, res) {
        // Connect to the database
        req.pool.getConnection(function(err, connection) {

        if(err) {
            res.sendStatus(500);
            return;
        }

        var query = "SELECT firstname, lastname, username, address, contact_number, email_address FROM user_profile WHERE username='" + req.session.user.logInId + "' LIMIT 1;";
        connection.query(query, function(err, rows, field) {
            connection.release(); // release connection
            if(err) {
                res.sendStatus(500);
                return;
            } else {
                res.json(rows);
            }

            res.end(); // end response
        });
    });
});

router.post('/editAccountDetail', function(req, res) {
    if('user' in req.session) {

        // Connect to the database
        req.pool.getConnection(function(err, connection) {

        if(err) {
            res.sendStatus(500);
            return;
        }
        var query;
        if(req.body.editWhich == "password") {
            // edit password
            query = "UPDATE user_profile SET password = '" + req.body.editPassword + "' WHERE username = '" + req.session.user.logInId + "';";
        } else if(req.body.editWhich == "address") {
            // edit address
            query = "UPDATE user_profile SET address = '" + req.body.editAddress + "' WHERE username = '" + req.session.user.logInId+ "';";
        } else if(req.body.editWhich == "contactnumber") {
            // edit contactnumber
            query = "UPDATE user_profile SET contact_number = '" + req.body.editContactNumber+ "' WHERE username = '" + req.session.user.logInId+ "';";
        } else if(req.body.editWhich == "emailaddress") {
            // edit emailaddress
            query = "UPDATE user_profile SET email_address = '" + req.body.editEmailAddress + "' WHERE username = '" + req.session.user.logInId+ "';";
        } else {
            res.sendStatus(500);
            return;
        }
            connection.query(query, function(err, rows, field) {
            connection.release(); // release connection
            if(err) {
                res.sendStatus(500);
                return;
            } else {
                res.end();
            }

            res.end(); // end response
            });
        });
    } else {
        res.sendStatus(401);
        return;
    }

});


router.get('/getCheckInHistory', function(req, res) {
        // Connect to the database
        req.pool.getConnection(function(err, connection) {

        if(err) {
            res.sendStatus(500);
            return;
        }

        var query = "SELECT venue.venue_name, venue.venue_id, venue_visits.visit_date FROM venue INNER JOIN venue_visits ON venue.venue_id = venue_visits.venue_id INNER JOIN user_profile ON user_profile.user_id = venue_visits.user_id WHERE user_profile.username = '" + req.session.user.logInId +"' ORDER BY venue_visits.visit_date DESC LIMIT 10;";
        connection.query(query, function(err, rows, field) {
            connection.release(); // release connection
            if(err) {
                res.sendStatus(500);
                return;
            } else {
                res.json(rows);

            }

            res.end(); // end response
        });
    });
});

router.get('/getCheckInHistoryFull', function(req, res) {
        // Connect to the database
        req.pool.getConnection(function(err, connection) {

        if(err) {
            res.sendStatus(500);
            return;
        }

        var query = "SELECT venue.venue_name, venue.venue_id, venue_visits.visit_date FROM venue INNER JOIN venue_visits ON venue.venue_id = venue_visits.venue_id INNER JOIN user_profile ON user_profile.user_id = venue_visits.user_id WHERE user_profile.username = '" + req.session.user.logInId +"' ORDER BY venue_visits.visit_date DESC;";
        connection.query(query, function(err, rows, field) {
            connection.release(); // release connection
            if(err) {
                res.sendStatus(500);
                return;
            } else {
                res.json(rows);

            }

            res.end(); // end response
        });
    });
});



router.post('/checkIn', function(req, res) {
    // Connect to the database
            console.log("INSERT INTO venue_visits (user_id, visit_date, venue_id) VALUES ("+userCode+", NOW(), "+venueCode+");");
            req.pool.getConnection(function(err, connection) {
            if(err) {
                res.sendStatus(500);
                return;
            }
            var query = "INSERT INTO venue_visits (user_id, visit_date, venue_id) VALUES ("+userCode+", NOW(), "+venueCode+");";

                connection.query(query, function(err, rows, field) {
                connection.release(); // release connection

                if(err) {
                    res.sendStatus(500);
                    return;
                }
                res.end(); // end response
            });
        });
});

router.post('/checkVenuePresence', function(req, res) {
    // Connect to the database
    req.pool.getConnection(function(err, connection) {
        if(err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT COUNT(address) AS matchFound FROM venue WHERE address = '" + req.body.checkinaddress + "';";

        connection.query(query, function(err, rows, field) {
            connection.release(); // release connection
            var userIdentified = rows[0].matchFound;    // if userIdentified is 0, login detail is invalid. if its 1, then login detail is valid.
            //console.log(userIdentified);    // Delete After Use
            if(err) {
                res.sendStatus(500);
                return;
            }
            else if(userIdentified == 0) {
                res.sendStatus(401);
                return;
            }
            else if(userIdentified >= 1) {
                // Check in User
                res.sendStatus(200);
                return;
            }
            res.end(); // end response
        });
    });
});
var venueCode;
router.post('/getVenueCode', function(req, res) {
    // Connect to the database

    req.pool.getConnection(function(err, connection) {
        if(err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT venue_id FROM venue WHERE address = '" + req.body.checkinaddress + "' LIMIT 1;";

        connection.query(query, function(err, rows, field) {
            connection.release(); // release connection
            if(err) {
                res.sendStatus(500);
                return;
            }
            else {
                // Check in User
                venueCode = rows[0].venue_id;
                res.json(rows);
                return;
            }

        });
    });
});
var userCode;
router.get('/getUserCode', function(req, res) {
    // Connect to the database

    req.pool.getConnection(function(err, connection) {
        if(err) {
            res.sendStatus(500);
            return;
        }
        var query = "SELECT user_id FROM user_profile WHERE username = '" + req.session.user.logInId + "' LIMIT 1;";

        connection.query(query, function(err, rows, field) {
            connection.release(); // release connection
            if(err) {
                res.sendStatus(500);
                return;
            }
            else {
                // Check in User
                userCode = rows[0].user_id;
                res.json(rows);
                return;
            }

        });
    });
});

router.post('/addVenueLocation', function(req, res) {
    if(req.body.venueName == '' || req.body.venueAddress == '' || req.body.venueCapacity == '') {
        res.sendStatus(401);
        return;
    }

        req.pool.getConnection(function(err, connection) {
            if(err) {
                res.sendStatus(500);
                return;
            }

            var query = "INSERT INTO venue (venue_name, address, capacity) VALUES ('"+req.body.venueName+"', '"+req.body.venueAddress+"', "+req.body.venueCapacity+");";

            connection.query(query, function(err, rows, field) {
            connection.release(); // release connection

            if(err) {
                res.sendStatus(500);
                return;
            }

            res.end(); // end response
        });
    });
});



module.exports = router;
