var chalk = require('chalk');
var mongoose = require( 'mongoose' );

var dbURI = ''; //'mongodb://localhost:27017/test';

//Overriding MongoDB URL
dbURI = 'mongodb://ashwini:ashwini13@ds147723.mlab.com:47723/employeeappdirectory';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log(chalk.yellow('Mongoose connected to ' + dbURI));
});

mongoose.connection.on('error',function (err) {
    console.log(chalk.red('Mongoose connection error: ' + err));
});

mongoose.connection.on('disconnected', function () {
    console.log(chalk.red('Mongoose disconnected'));
});

var employeeSchema = new mongoose.Schema(
    {
        //{ name: 'Mr. Nice', email: 'nice@g.com', dateOfBirth: '12/12/1987', : 'testing', gender : 'Male', age : 23},
        name: {type: String, required: true}, //, unique : true
        email: {type: String, required: true},
        dateOfBirth: {type: String, required: true},
        gender: {type: String, required: true},
        department: {type: String, required: true},
        age : Number
    }
)

mongoose.model( 'Employee', employeeSchema );
