# opengash for Google Analytics
If you have multiple websites using Google Analytics, you might wish to have a single screen where you could see how all of your websites are performing over several different periods of time.

That's what opengash is for. See this clickable screenshot:

![opengash screenshot](docs/screenshot.png?raw=true)

This image shows the main screen of the app, which is a bunch of tables that have the websites on the vertical axis and the periods of time on the horizontal axis. Each period (except "Today") is compared to the past.

* "Yesterday" is compared to the same day of last week.
* "Week" (i.e. last 7 days) is compared to the 7 before it.
* "Month" (i.e. last 30 days) is compared to the 30 days before it.
* "Year" (i.e. last 365 days) is compared to the 365 days before it.

The current number is the top most. The comparison number is below it. The difference between the two in percentage is next to them.

---

opengash is still a very immature project. I'm developing it mainly to learn software engineering and deployment.

---

## Try it
You can try the live, barely working, service on [opengash.com](http://opengash.com).

Or you can try it on your own machine. opengash is built with the MEAN stack (MongoDB, Express, AngularJS, Node.js). If you know how to run MEAN apps and wanna try this one:

1. download it
2. `cd` into `server`
3. `npm install` to install the dependencies.
4. configure `server/config.js` 
5. `node server` while in `server`
6. Make sure a MongoDB server is running
7. Load the app in your browser.