# Capture

Capture all the tasks

## Installation

 - `composer install --no-dev --optimize-autoloader`
 - `npm install`
 - `npm build:prod`
 - import the content of `data/struct.sql` to the database

## Configuration

The app expects a config.ini file at the topmost level:

<pre>
host = localhost
port = 3306
charset = utf8
dbname = dbname
user = user
passwd = passwd
</pre>

## Running the app

Then serve the content of /public.
