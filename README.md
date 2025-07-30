# the-freetown-sound

<img width="1905" height="1206" alt="Homepage" src="https://github.com/user-attachments/assets/d5b912df-160a-4a94-9907-10eb8e90be56" />

## Description
The Freetown Sound is a website that is based on a fictional concert that requires a new website. This project aims to create a user experience that is responsive by utilsing tools such as Vue and Bootstrap. This project originated as a university project and was then expanded upon after the submission of the project. 

The key features of the website include: 
- Ability to log in to get extra features such as editing comments. 
- Able to create, read, update and delete comments of an event.
- Usage of an API such as Discogs API to get information. 
- Storage of items within a JSON backend.
- Single Page Application.
- Responsive Design.

This website was implemented using these tools: 
- VueJS Paginate Next
- JSON Server
- Discogs API
- Vue Router 
- Bootstrap
- Axios
- Vuex
- Vue

## Project Setup
Before setting up the project, you would need these things:
- Node.js
- Discogs API Connection

### Connection to the Discogs API
For the artists page of the application, the Discogs API is required to show a list of artists. To integrate the connection, you would need to follow these steps
- Create a Discogs API Account and become a Developer in it. 
- Create an application and get the Consumer Key and Consumer Secret from it.
- Open the sample.env file and put your consumer key and consumer secret into the corrosponding variables.
- Save the sample.env file and rename the file to .env

### Wesbite Setup
In order to run the project, you would first navigate to the project directory such as 'the-freetown-sound' in Powershell and then install the required packages.
```bash
cd the-freetown-sound
npm install
```

Once the packages are installed, the website can be run using these commands, This will run both the JSON Server and the website on your local host. 
```
cd the-freetown-sound
npm run serve
```

## Website Photos 
<img width="1905" height="2270" alt="Events Page" src="https://github.com/user-attachments/assets/2e67d439-440d-4da2-b489-8cf7ae3e3862" />
<img width="1920" height="911" alt="Log In Page" src="https://github.com/user-attachments/assets/4afd12c5-6699-40e1-849f-ac41f8a33557" />
