# Optomify

![TinyMCE](https://img.shields.io/badge/API-TinyMCE-Blue)
![googleMaps](https://img.shields.io/badge/API-DomainAPI-Blue)
![lodash](https://img.shields.io/badge/node-lodash-orange)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<!-- ## Deployed web address -->

You can visit a deployed demo web application [here](https://projecthub-crm.herokuapp.com/)
<br>

## Project Description

Optomify is a booking system web application built for use in optometry practices. Unlike other generic booking systems, Optomify is optimised to include features and workflows that tailor specifically towards the day to day book and patient management one would undertake, and in effect will improve efficiency and overall user satisfaction when running their clinic. 
<br>

## Table of Contents

[Technologies Used](#Technologies)  
[Functionality](#Functionality)  
[Installation and Usage](#Installation)   
[Future Development](#Future)  
[Gallery](#Gallery)  
[Resources](#Resources) 

<a name="Functionality"></a>

## Functionality
Here are some of Optomify's key features:

### Dashboard
THe dashboard is a place where you can find general information about your clinic. 

### Bookings
Here is where you can see all the bookings for a given date range. You can hover over each booking to see the patient's details, booking notes, as well as some actions for that booking. The sider provides some useful tools, loike a date range picker to see past/future weeks, a quick view of the next patients details, and the ability to add new booking setups. You can book a patinet simply by clicking an empty slot, and selecting either new patient or existing patient. 

### Patients
From here you can get a view fo all the patients in your system. Get some instant information, like their name and contact details, or use the search bar to find the patient you are looking for. By clicking on a patient form the list, you can see their file where you can view, add or update their details, prescriptions or notes. You can also view their past and upcoming bookings from this page too 
<br>

<a name="Technologies"></a>

## Technologies Used

Optomify is built using the MERNG framework, allowing for a faster, more responsive experience, with minimal reloads and quick data loading from the database. 

Optomify uses TinyMCE for markdown text editing in notes and clinical files, which allows for a more organised and feature full experience. 

### Stack:
MongoDB - https://www.mongodb.com/docs/

Express.js - https://expressjs.com/

React - https://reactjs.org/

Node.js - https://nodejs.org/en/docs/

GraphQL - https://graphql.org/

Apollo - https://www.apollographql.com/

### APIs:

TinyMCE -https://www.tiny.cloud/
<br>

<a name="Installation"></a>

## Installation and Usage

### Prerequisites

To be able to run the back-end server you will need to have MongoDB installed on your computer for this app to connect to.  

You can pull the source code for this project by cloning this repo using the following command: 

bash 
```
git clone
```

### Development

To run ant react scripts or start any servers, first change directory to the Optomify folder and run 'npm install'. This will install all depenancies for the server and client in one command:

bash 
```
cd Optomify && npm install
```

From there you can run and build the app. To buid the app run:

bash
```
npm run build
```

To run the back-end server only:

bash
```
npm run start
```

React development server:

bash
```
cd client && npm run start
```

Run the app in developemnt (both backend server and React development server):

bash
```
npm run develop
```
<br>

<a name="Future"></a>

## Future Development

- <strong>Edit/Delete Records:</strong> giving the website full CRUD like features, which in turn makes the website more useful.

- <strong>Pagination:</strong> pages displaying lists of records could be paginated so that the webpage can load faster and so that the user is not overwhelmed with information.

- <strong>Export CSV data:</strong> Abitliy to export clients and projects database as an CSV file to be able to load into a spreadsheet and do calculations with
  <br>

- <strong>Editing Clients:</strong> Option for a user to edit a client's personal details in the individual client page.
  <br>

<a name="Gallery"></a>

## Gallery

![image](https://github.com/wilgru/)
![image](https://github.com/wilgru/)
![image](https://github.com/wilgru/)
![image](https://github.com/wilgru/)
<br>

<a name="Resources"></a>

## Resources


