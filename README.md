# Seven Hills Foundation

#### Authors: Nam Tran Ngoc, Mike DiMilia
With help from Ivan Melnikov (@ivanempire)

This is a web application for Seven Hills foundation's IQP project on developing a database/search engine for searching appropriate Assistive Technology devices. 

#### Installation & Run

    1. Install npm if you don't already have it.
    2. Install bower: npm install bower
    3. Install dependencies: npm install
    4. Install bower dependencies: cd public && bower install
    5. Run from main directory: npm start or node server.js

#### Structure

    * Basic Node app structure
    * Bootstrap used for front-end, with routing and front-end handling with AngularJS
    * Routes stored in the 'routes' folder
        * / returns the index file
        * /random returns a random solution page
        * /search returns the search page
        *Further implementation will possibly combine all of these into one page with AngularJS
    * With the exception of frameworks, media resources are stored in public/res
    * Frameworks stored in public/bower_components file
        * Boostrap, Bootstrap-rating, Bootstrap-select
        * Angular, Angular-resource, Angular-route
        * jQuery and Font-Awesome

#### Secrets

Since database connection requires IP address, username, password and database name, these settings are kept as a JSON file under config folder. To set up config, do:

    mkdir config
    cd config

Create a file called `secrets.json` using your favorite text editor. The secrets.json structure should look like this:

    {
    "host": "$database_address",
    "user": "$username",
    "password": "$password",
    "database": "$database_to_use"
    }

Replace `$variables` with your own configurations and you're good to go!

#### Deployment

(Nothing here yet)

#### To do List:

- Fix callback hell
- Query tags and material lists
- Form validation
- Add upload images/gallery feature
- View/edit solution
- Figure out deployment methods
- Testing (unit, regression...)
- Database indexing
- Browsers/Platform compatibility testing

#### Folder Structure

    ├── config
    ├── err.log
    ├── favicon.ico
    ├── log
    ├── npm-debug.log
    ├── out.log
    ├── package.json
    ├── public
    │   ├── app.js
    │   ├── bower.json
    │   ├── controllers
    │   │   ├── addController.js
    │   │   ├── mainController.js
    │   │   ├── randomController.js
    │   │   ├── searchController.js
    │   │   └── solutionController.js
    │   ├── favicon.ico
    │   ├── index.html
    │   ├── res
    │   │   ├── category.json
    │   │   ├── css
    │   │   │   └── stylesheet.css
    │   │   ├── img
    │   │   └── js
    │   │       ├── add.js
    │   │       └── main.js
    │   └── views
    │       ├── add.html
    │       ├── main.html
    │       ├── random.html
    │       ├── search.html
    │       └── solution.html
    ├── README.md
    ├── routes
    │   └── main.js
    ├── server.js
    ├── tests
