# Capture

Capture all the tasks

## Installation

 - `npm install`
 - `npm build:prod`
 - `node bin/automigrate.js` (this might hang after the job, terminating it seems ok)

## Configuration

Configure mysql/mariadb database credentials in environment variables. This will not work otherwise.

<pre>
DS_HOST = localhost
DS_PORT = 3306
DS_DBNAME = dbname
DS_USER = user
DS_PASSWD = passwd
</pre>

## Running the app

`node .`
