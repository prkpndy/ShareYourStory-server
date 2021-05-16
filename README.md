# How to Run

Make a directory in the root folder named `uploads`.
Inside `uploads` make two directories `images` and `story`.

Set up a local MySQL database and make a database named `ShareYourStory` containing two tables, `userDetails` and `userStory`. The schema of the tables can be found in `./models` directory.

Update the `.env` file containing the MySQL credentials and the PORT to run the server on.

Initialize the `userDetails` table with some dummy data. You can use the `addUser` mutation for that.
Copy the user ID (under the `id` column of the `userDetails` table), which is generated automatically, to the `constants.js` file on the client side.

Now you can use the app to update your Profile Picture and add a new Story.