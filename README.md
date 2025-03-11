# Optomify

![TinyMCE](https://img.shields.io/badge/API-TinyMCE-Blue)
![Ant Design](https://img.shields.io/badge/CSS-AntDesign-green)
![GraphQL](https://img.shields.io/badge/node-GraphQL-orange)
![Apollo](https://img.shields.io/badge/node-Apollo-orange)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Optomify is a booking system web application built for use in optometry practices. Unlike other generic booking systems, Optomify is optimised to include features and workflows that tailor specifically towards the day to day book and patient management one would undertake, and in effect will improve efficiency and overall user satisfaction when running their clinic. 

![image](https://github.com/wilgru/Optomify/blob/main/img_1.png)

## Table of Contents

[Functionality](#functionality)  
[Technologies Used](#technologies-used)  
[Installation and Usage](#installation-and-usage)  
[Testing](#testing)  

## Functionality
Here are some of Optomify's key features:

### Dashboard
THe dashboard is a place where you can find general information about your clinic. 

### Bookings
Here is where you can see all the bookings for a given date range. You can hover over each booking to see the patient's details, booking notes, as well as some actions for that booking. The sidebar provides some useful tools, like a date range picker to see past/future weeks, a quick view of the next patients details, and the ability to add new booking setups. You can book a patient simply by clicking an empty slot, and selecting either new patient or existing patient. 

### Patients
From here you can get a view fo all the patients in your system. Get some instant information, like their name and contact details, or use the search bar to find the patient you are looking for. By clicking on a patient form the list, you can see their file where you can view, add or update their details, prescriptions or notes. You can also view their past and upcoming bookings from this page too 

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

TinyMCE - https://www.tiny.cloud/

## Installation and Usage

### Prerequisites

To be able to run the back-end server you will need to have MongoDB installed on your computer for this app to connect to.  

You can pull the source code for this project by cloning this repo using the following command: 
 
```
git clone
```

### Development

To run ant react scripts or start any servers, first change directory to the Optomify folder and run 'npm install'. This will install all dependencies for the server and client in one command:
 
```
cd Optomify && npm install
```

From there you can run and build the app. To build the app run:

```
npm run build
```

To run the back-end server only:

```
npm run start
```

React development server:

```
cd client && npm run start
```

Run the app in development (both backend server and React development server):

```
npm run develop
```

## Testing

You can use the following data to test the web app, especially if you may not know certain optical terminology or processes.

Users 
```
username: wilgru@testmail.com
pass: password123
```

Medicare Details
```
Medicare number: 1234 1234 1234 5
medicare ref: 1
medicare expiry: (any date in the future)
```

Prescriptions
```
-1.25/-0.75x82
-0.50/-1.00x105
+2.00/-0.00x000
```

inter adds/ near adds
```
+0.75
+1.00
```

medicare item codes
```
10190
10191
```