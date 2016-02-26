# Splendor Application
#### A MEAN stack implementation of the Splendor board game for networked play

##### The directory structure for the application is as follows:
main_dir  
|--app  
&nbsp;&nbsp;&nbsp;|--controllers  
&nbsp;&nbsp;&nbsp;|--models  
&nbsp;&nbsp;&nbsp;|--routes  
&nbsp;&nbsp;&nbsp;|--tests  
&nbsp;&nbsp;&nbsp;|--views  
|--config  
&nbsp;&nbsp;&nbsp;|--env  
|--data  
|--node_modules  
|--public  
&nbsp;&nbsp;&nbsp;|--To be filled in later with angular things  
.gitignore  
package.json  
server.js
 
### Running the scripts
You can run the npm scripts by typing `npm run [script-name]' in the terminal.
*   You will need to have mocha.js installed to run the tests which you can get by
    running `npm install -g mocha` in the terminal.
*   In order to run the watch script you will need to install nodemon which can
    be installed the same way as mocha. The watch script will watch for any file
    changes and restart the server if changes have occurred. This keeps you from
    having to Ctrl+C the server and restart it manually every time.
*   In order to debug, you can run the debug script. You will need to have node-inspector
    installed, which can be installed just like mocha. When run, node-inspector will open
    a browser (chrome) window with the dev-tools opened. This will allow you to set break
    points and do anything that you can normally do with the dev-tools.
    
### MongoDB
The last thing I can think of to say is that you need to have MongoDB installed on your system
in order for the code to work. Once you have it installed, you can start it up by using the mongod
command in the terminal. For example: `mongod --port 27017 --dbpath=[path to db file]` where you
replace [path to db file] with the location of your db file such as:
`/home/kevin/code/nodejs/v5_projects/splendor_app/data`.
