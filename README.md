# Gym Frontend
## Highlights
- React.js PWA App
- SCSS styling pages
- Cross platform support (website/phone app)

## Local setup
- Upon cloning the code, and with npm downloaded, the script npm run start must be run in the command prompt.

<img width="3834" height="2084" alt="image" src="https://github.com/user-attachments/assets/37563b14-9981-4bfe-ae34-4d7854df9e71" />


- The backend must also be running locally as the frontend relies on endpoint calls to function.

<img width="835" height="134" alt="image" src="https://github.com/user-attachments/assets/edbe2b13-e69d-4316-8fa8-dba9eaa27c89" />


## App core functionality
### Login page
- To access the core functionality of the app, the user must first login.
<img width="1193" height="1647" alt="image" src="https://github.com/user-attachments/assets/b77af572-5ecf-46c3-9fd5-549661676340" />

### Home page
- The homepage provides the user with a brief glimpse into their latest stats, as well as what other users have been up to
<img width="1196" height="1642" alt="image" src="https://github.com/user-attachments/assets/5155eea5-a818-4fab-8f6e-e115d42b6d8f" />

### Workouts page
- The workouts page is the first page users should go to when creating their current workout
- The user is able to search/filter exercises, and then select them to add them to their current workout
- Once a user has selected all their workouts and select submit, they will be taken to their routine page

<img width="1195" height="1648" alt="image" src="https://github.com/user-attachments/assets/18087bd8-ffc4-480d-a106-2cfabe113947" />

### Routine page
- The routine page is used to fill out information for each exercise
- Previous data relating to each exercise is pulled through and displayed as a placeholder to remind the user what they did last
- Multiple different sets per exercise are able to be added
- The user is able to drop and drop workouts in the order they did them
- There's template functionality to pre-fill exercises
- Once the user submits, the data is added to the database via the backend, and the user is automatically taken to the history page
<img width="1254" height="1642" alt="image" src="https://github.com/user-attachments/assets/ee2eac7b-7da1-4e75-a8b3-da67a80e0c7d" />

### History page
- The history page contains all workouts for the user, colour coded by exercise group and ordered by date
- When going into a date, it shows all data regarding the workout from that date
<img width="1293" height="1392" alt="image" src="https://github.com/user-attachments/assets/35334b24-fbc2-456c-a447-312899231a2e" />

### Leaderboard page
- All exercises have a viewable leaderboard that shows all users hierachy for each exercise
- The top 3 users will be displayed medal-like colour coding to encourage competition
<img width="1243" height="1641" alt="image" src="https://github.com/user-attachments/assets/490b5123-efce-41d2-87ad-ed72403f1c9a" />

## Live setup
- To enable interconnectivity, the live version of this backend is setup and hosted on Microsoft Azure as a Static Web App
- I've setup the YAML files of this repository to automatically redeploy latest code to the web app when a pull request is completed to Main
<img width="3839" height="1538" alt="image" src="https://github.com/user-attachments/assets/1e3a9ce3-49b1-43bb-8415-7926408ff5d7" />
