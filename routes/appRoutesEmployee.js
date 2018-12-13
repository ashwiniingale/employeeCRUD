var express = require('express');
const appRoutes = express.Router();
const mongoose = require('mongoose');
var Employee = mongoose.model( 'Employee' );

//GET ALL EMPLYEES
appRoutes.route('/api/employees').get((req, res) => {
    console.log('Route Server /api/employee GET');

    Employee.find({}, function(error, resultSet){
        //console.log(error);
        if(error){
            console.log('Error Occured !! DB cannot GET employee records' + error);
            res.status(500)
        }else{
            console.log("ALL Employees : " + resultSet);
            res.send(200, resultSet);
        }
    })
});

//GET SPECIFIC EMPLOYEE
appRoutes.route('/api/employees/:name').get((req, res) => {
    const requestedEmployeeName = req.params['name'];

    Employee.findOne({name: requestedEmployeeName}, function(error, resultSet){
        if(error){
            console.log('Error Geeting Record from DB for id ' + requestedEmployeeName);
            res.status(500);
        }else{
            res.send( 200, resultSet);
        }
        
    })
});

//ADD NEW EMPLOYEE

appRoutes.route('/api/employees').post((req, res) => {
    //res.send(201, req.body);
    console.log('Route Server /api/employees POST');
    
    var emp = new Employee(); //collection : emp and Model : Employee
    
    var name = req.body.name;
    var email = req.body.email;
    var dateOfBirth = req.body.dateOfBirth;
    var gender = req.body.gender;
    var age = req.body.age;
    var dept = req.body.department;

    emp.name = name;
    emp.email = email;
    emp.dateOfBirth = dateOfBirth;
    emp.gender = gender;
    emp.age = age;
    emp.department = dept;
        
    emp.save(function(error, resultSetSaved){
        if(error){
            console.log('Error Saving data to DB' + error);
            res.status(500);
        }else{
            console.log('Success : employee saved');
            res.send(201, 
                resultSetSaved
            )
        }
    });


});

//EDIT/UPDATE SPECIFIC EMPLOYEE
appRoutes.route('/api/employees/:id').put((req, res) => {
   // res.send(200, req.body);
   var nameReq = req.body.name;
   var emailReq = req.body.email;
   var dateOfBirthReq = req.body.dateOfBirth;
   var genderReq = req.body.gender;
   var ageReq = req.body.age;
   var deptReq = req.body.department;

   var nameOfEmp = req.params.id;

   var emp = new Employee(); //collection : emp and Mode : Employee
    
    if(typeof nameOfEmp !== 'undefined'){
        Employee.findOne({_id: req.params.id}, function(err, empDetails) {
            if (!empDetails){
              console.log('Could not load Document');
              res.status(500);
            }
            else {
                empDetails.name = req.body.name;
                empDetails.age =  req.body.age;
                empDetails.dateOfBirth = req.body.dateOfBirth;
                empDetails.department = req.body.department;
                empDetails.gender = req.body.gender;
                empDetails.email = req.body.email;
        
                empDetails.save().then(empDetails => {
                  res.send(201, empDetails);
                })
              .catch(err => {
                    res.status(400).send("unable to update the database");
              });
            }
          });
    }else{
        res.staus(400).send('IVALID REQUEST');
    } 
   
});

//DELETE SPECIFIC EMPLOYEE
appRoutes.route('/api/employees/:id').delete((req, res) => {
    //res.sendStatus(204);
      
    Employee.findOneAndRemove({_id: req.params.id}, function(err, employeeDetails){
        if(err) res.staus(500).send('Error while deleting document..');
        else res.status(204).send(employeeDetails)
    });

});

module.exports = appRoutes;