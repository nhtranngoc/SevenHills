# Seven Hills Assistive Technology Database

#### Authors: Nam Tran Ngoc, Mike DiMilia
With help from Ivan Melnikov (@ivanempire)

![alt tag](https://raw.githubusercontent.com/nhtranngoc/SevenHills/master/home.png)

This is a web application for Seven Hills foundation's IQP project on developing a database/search engine for searching appropriate Assistive Technology devices. 

#### Installation & Run

    1. Install npm if you don't already have it.
    2. Install bower: npm install bower
    3. Install dependencies: npm install
    4. Install bower dependencies: cd public && bower install
    5. Set up superuser: node setSuperUser.js
    6. Run from main directory: npm start or node server.js

##### Deployment

The server can be deployed using [forever](https://github.com/foreverjs/forever), with an user script that runs `forever` everytime the server boots.

##### Server parameters:

There are currently two parameters to be passed on to the server:
    
    -p: Port, defaults to 80
    -b: Database key in secret.json, defaults to 'local'

`-d` is already taken by Nodemon, so I have opted not to use it.

#### Structure

    * Basic Node app structure
    * Bootstrap used for front-end, with routing and front-end handling with AngularJS
    * Routes stored in the 'routes' folder
        * Main routes
        * Database API routes
        * Upload routes
        * Authentication routes
    * With the exception of frameworks, media resources are stored in public/res
    * Uploaded images are stored in uploaded/files
    * Frameworks stored in public/bower_components file
        * Boostrap, Bootstrap-rating, Bootstrap-select
        * Angular, Angular-resource, Angular-route
        * jQuery and Font-Awesome

#### Secrets

Since database connection requires IP address, username, password and database name, these settings are kept as a JSON file under config folder. To set up config, do:

    mkdir config
    cd config

Create a file called `secrets.json` using your favorite text editor. The secrets.json structure should look like this:

    "local": {
        "host": "$hostName",
        "user": "$userName",
        "password": "$password",
        "database": "$databaseName"
    }

"local" could be replaced with any name you choose, and can then be used by running the server with `-d` flag. Check __Server Parameter__ section for more details.

Replace `$variables` with your own configurations and you're good to go!

#### Authentication

Since we are only expecting a small amount of super-users, or admins, we are currently storing user information in a JSON file. Obviously this is not the best way to do it, but in this context we believe this to be our best approach. Furthermore, the password is hashed and salted before being stored, which lower our security concern.

To set a new username/password, or change existing one, please run the `setSuperUser.js` file.

This is meant for single-user login only. Multiple users login should be stored securely somewhere else, or in a database. [PassportJS](http://passportjs.org/) is a great tool for this.

#### Roadmap:
Due to time constraints, there are things we wish could do but have not been able to do it. These are some of those things:
    
- Use ng-Animate to animate state transition
- Use [Sequelize](http://docs.sequelizejs.com/en/latest/) to perform query in a less messy way, or alternatively, use an ORM, Node-native database, such as MongoDB.
- More throughout testing
- Use a search engine server - since the "search engine" we are currently using is a substring search, which is fine on a small scale, but as the project progress, switching to a better search engine is inevitable. Furthermore, this can make features such as advanced filter and search possible.
- Consistent namespace: Since there are no agreed upon namespace between the database and the rest of the web application, some of the variable names are inconsistent, which makes it confusing to write code for.

#### Folder Structure
    ├── config
    │   ├── multiparty.json
    │   ├── secret.json
    │   └── UserController.js
    ├── coverage
    │   ├── coverage.json
    │   ├── lcov.info
    │   └── lcov-report
    │       ├── base.css
    │       ├── index.html
    │       ├── prettify.css
    │       ├── prettify.js
    │       ├── SevenHills
    │       │   ├── index.html
    │       │   ├── routes
    │       │   │   ├── index.html
    │       │   │   └── main.js.html
    │       │   └── server.js.html
    │       ├── sort-arrow-sprite.png
    │       └── sorter.js
    ├── cov.html
    ├── favicon.ico
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
    │   ├── db.js
    │   ├── main.js
    │   └── upload.js
    ├── server.js
    └── test
        └── test.js

