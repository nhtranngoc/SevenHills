# Seven Hills Foundation Mockup

#### Authors: Nam Tran Ngoc, Mike DiMilia

This is a front-end mockup for Seven Hills foundation's IQP project on developing a database/search engine for searching appropriate Assistive Technology devices. 

#### Installation & Run

    1. Install npm if you don't already have it.
    2. Install bower: **npm install bower**
    3. Install dependencies: **npm install**
    4. Install bower dependencies: **cd public && bower install**
    5. Run from main directory: **npm start** or **node server.js**

#### Structure

    * Basic Node app structure
    * Bootstrap used for front-end, with a later addition of AngularJS
    * Routes stored in the 'routes' folder
        * / returns the index file
        * /random returns a random solution page
        * /search returns the search page
        *Further implementation will possibly combine all of these into one page with AngularJS
    * With the exception of frameworks, media resources are stored in public/res
    * Frameworks stored in public/bower_components file
        *Boostrap, jQuery and Font-Awesome
