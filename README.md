# lista-rango

### Running the project!

To run the project first you need to make sure your PG image is running on docker with this code `docker run --name lista-rango -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres` (in case you use docker toolbox you might need to change the host value to your local machine host on file `ormconfig.json` to make it work). Sadly, due to time constraints the .env file was not implemented :'(

Also make sure you have all the dependencies installed by running `yarn` on your terminal or `npm i` if you're a psychopath, I won't judge but all of the next commands will be listed as if you're using yarn instead of npm.

After everything is installed and the ormconfig.json is configured accordingly create the database with the name `lista-rango` then run the command `yarn typeorm migration:run` on your terminal to finish configuring everything.

Finally just run `yarn dev:server` to start the server.

All routes are available on the insomnia file in the root of this directory, I'll add some updates to make testing easier there, like making dynamic variables for the IDs that are used on some routes.

To use jest just run `yarn test` and check for those results! They still desperately need some refactoring though but they got the job done here I guess. A nice way to see the results is on a file located at `coverage/lcov-report/index.html` just open it in your browser after running the tests and check it out.

To see the files you have uploaded just go to your browser and use the route `localhost:3333/files/filename`, just replace "filename" with the name of the file that you uploaded (could be better aswell).

#### Things to improve

My test suites are not 100% yet, so if I get some time later I'll fix those minor cheeky branches and statements that are not covered.

Restaurants opening and closing hours are not at the best they could be, I chose this format because I was losing a lot of time just thinking about it and I had to start working on it soon, I'll alson think about a better aproach to it later on (the sale time was done much better in comparison to this but it was still not great).

Uploading files might have been better done in another way, the way it's implemented it is only allowed insert the photo to an already existing object which excludes the possibility of adding a photo to a restaurant or product directly on the create request. I think that uploading in a way that sends me back an id so that I'll be able to send this id in the create request would be nice and also to view the file I could have done some better stuff there so that there was a route that I would access with the photo id or something like this. 

Organizing the response. Some responses are really cluttered and I could have organized them better, an example of this would be for listing products, the sale information could have been provided in its own object and the updated_at and create_at could have been omitted.

Obviously a .env file, I wont mention it to much so people won't notice it too much.

I had some difficulty remembering everything about the structure config so I relied quite a bit on my trusty rocketseat guys. But I think it turned out ok, quite scalable and easy to navigate and collaborate.

##### Stuff for Renan of the future

Please use `uuid` instead of `uuidv4` because the latter is now deprecated.

Try to remember to add tests before almost finishing a product, I know it's hard to remember it sometimes but just try.

You can use more migrations, seriously.

Working with dates is still not a fun experience, date-fns is still my bro though.

Work on your testing because it's still not quite there yet (goal is everything 100%).

Honestly this went better than expected with the amount of time that you had so... nice?
