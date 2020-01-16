# Database Setup

Included with the starterkit is backup of the Postgres starterkit database. This database contains all of the required schemas, tables, views, and trigger functions required to use the starterkit. To use this database, simply create a new database with the name `starterkit` and create the following:

* a group called `web_controls`
* a group called `web_controls_super`
* a user called `web_user` with a password of `webuser` that belongs to the `web_controls` group
* a user called `web_user_super` that belongs to the `web_controls_super` group

After creating the users and database, restore the backup to your new database. You should now be ready to start the application!
