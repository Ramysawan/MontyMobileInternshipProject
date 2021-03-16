# MontyMobile
MontyMobile Project

WELCOME TO MY MONTYMOBILE PROJECT
This project uses:
-Spring boot as backend
-REACT as frontend
-PostgreSQL as database

TO RUN THIS PROJECT, YOU NEED:


-The MontyBack file is the Spring Boot backend file, please open this file in your favourite IDE, open the resources file inside main,
then open application.properties file, and change the sql password to your PostgreSQL machine password.
-Run the MontyBack file
-The MontyFront file is the REACT frontend file, please open this file in your favourite IDE, then open terminal on this file, and type "npm i", then "npm start"
-Now you have the MontyBack Spring boot file running with the MontyFront REACT file , using PostgreSQL database.


VERY IMPORTANT NOTE: IF THE PHONE NUMBER ENTERED IS INVALID, THE BACKEND WILL SIGNAL ERROR AND YOU HAVE TO STOP THE RUNNING BACKEND FILE THEN RE-RUN THE BACKEND FILE AND ENTER A VALID NUMBER.

NOTE: In the MontyBack file, there is a java class called Validate.java , which has an API model that when you run it, it verifies if the number is valid, and then gives all number infos.

NOTE: When the web is open and you choose the phone number, if the phone number is valid you will read on the server terminal : number is valid!