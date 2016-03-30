# Seven Hills Foundation Mockup

#### Authors: Nam Tran Ngoc, Mike DiMilia
With help from Ivan Melnikov (@ivanempire)

This is a front-end mockup for Seven Hills foundation's IQP project on developing a database/search engine for searching appropriate Assistive Technology devices. 

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

#### Folder Structure

    ├── config
    ├── data
    ├── err.log
    ├── favicon.ico
    ├── log
    │   ├── access-20160329.log
    │   └── access-20160330.log
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
    │   │   │   ├── 10.jpg
    │   │   │   ├── 1.jpg
    │   │   │   ├── 2.jpg
    │   │   │   ├── 3.jpg
    │   │   │   ├── 4jIot.jpg
    │   │   │   ├── 4.jpg
    │   │   │   ├── 5.jpg
    │   │   │   ├── 6.jpg
    │   │   │   ├── 7.jpg
    │   │   │   ├── 8.jpg
    │   │   │   └── 9.jpg
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
    ├── testDtb.js
    ├── tests
