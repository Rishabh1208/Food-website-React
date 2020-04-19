If you want to run this project locally in your system, first git clone or download it.
Inside the project, you will find Json-Server folder move that folder outside of the main folder and put it somewhere else.
I used json-server as a backend. JSON Server is used to simulate a backend server and a REST API
with a simple JSON file. JSON Server is an npm package that you can create a REST JSON webservice. 
All we need is a JSON file(here it is db.json) and that will be used as our backend REST.
Steps to execute the project
1) Open Json-Server in cmd.
2) run, npm install
3) then run, json-server --watch db.json -p 3001 -d 2000 ( it will open on port 3001 with a delay of 2sec). Keep it running on localhost 3001.
4) Open the main project that is (Food-Website) in any editor you like. I recommend VS STUIDO.
5) Again run, npm install ( to install all the dependencies inside the project)
6) Finally run, npm start ( By default, it will run on local host 3000)

NOTE: If you don't run json-server, you won't be able to run the project.
If you find difficulty in running the project, feel free to raise an issue.
