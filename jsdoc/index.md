# opengash documentation

These docs should help you better understand how opengash functions in the background.

You are not expected to read this document in one go. You are expected to go back and forth between this document, the project's source code, a running opengash app, and Google.

## Initial setup

The steps for the initial setup are described on [GitHub README](https://github.com/msafi/opengash) file.

## Technical overview

Assuming you have everything setup and ready, here's a technical rundown of how things flow in opengash.

### When a user requests the homepage, `/`

At the time of this writing, the only user-facing URL that opengash has is the root, `/`, URL. When a user requests that URL, the first thing opengash does is put this request through a series of middleware found in {@link server}.

#### CSRF

One of these middleware is {@link ogUtil.csrf}, which sets cookie with a unique identifier in the user's browser. Every subsequent requests the user make to opengash get checked against this unique identifier. This prevents cross-site request forgeries.

#### Routes

After that, {@link url.index} determines which URL handler handles the request. Since users only make requests to `/`, the handler is always {@link request.handlers.home}.

In most cases, this handler will simply serve the request with the `index.ejs` template. Effectively handing over control of the application to the front-end, where AngularJS reigns supreme. 

Now the server just waits for JSON API requests from Angular.

### On the front-side

Once `index.ejs` gets loaded on the front-end, the AngularJS opengash app gets bootstrapped and started using [app.js]{@link ng.opengash}. It configures AngularJS's `$stateProvider` and `$locationProvider`.

After that {@link ng.controller.mainCtrl} gets fired.

`mainCtrl`, seeing that this is a new user, loads the `connect.html` template. This template, in turn, is controlled by {@link ng.controller.connectCtrl}.

`connectCtrl` contacts the server to request a Google OAuth 2.0 login URL. `connect.html` links to this URL in a big red button that says *Connect to Google*.

### The user goes to Google

When the user clicks on the red button, they get sent to Google where they should click *Accept* to give opengash permission to use their Google Analytics data.

When the user clicks *Accept*, Google redirects them to the `redirectUrl` that you specified in your `config.js`. The user doesn't see anything specific to this URL when they get redirected to it. It does it's work in the background.

The `redirectUrl` is handled by {@link request.handlers.authenticate}. This function first verifies that the user has a valid CSRF using {@link ogUtil.verifyCsrf}. Then, it finishes up the authentication process with Google using {@link ogGaApi.requestAccessToken}. Once the user has been fully authenticated, the handler sends an API request, using {@link ogGaApi.call}, in order to retrieve the user's basic info: name, email, profile image, etc.

With that information, the handler uses {@link ogAccount.saveUser} to save the user in the database.

Finally, the handler sets a cookie marking this user as *logged in*, sets another cookie with Google API access token, and silently redirects the user to the homepage. 

All of this happens in the background without the user's involvement.

### After authentication, the user comes back to the homepage

So, having been fully authenticated, the user is redirected back to the homepage from `redirectUrl`. 

{@link ng.controller.mainCtrl} sees the user again, but this time it sees that the user has a login cookie and a fresh access token from Google. That means AngularJS can use this token to retrieve user information directly from Google. But since the user hasn't yet selected which Google Analytics profiles they would like to see on opengash dashboard, they will be presented with a screen that prompts them to select those profiles. That screen is the template `add-views.html`.

### User selects Google Analytics profiles to add to opengash

*Note: Google Analytics has recently switched from the term `profile` to `views`. So, these two terms are used interchangeably on opengash.*

Once this template is loaded, its controller [`addViewsCtrl`]{@link ng.controller.addViewsCtrl} kicks in. Using {@link ng.service.ogAccount}, this controller retrieves a list of all the profiles that the user has under their Google Analytics account. These profiles are then displayed using `add-views.html`. The user checks the ones they like to add and click submit. Using {@link ng.service.ogAccount} again, the *Submit* button sends the profiles to the server where they get saved and now the `dashboard.html` template gets loaded.

### The dashboard

The dashboard is where the fruits of all of this labor get consumed. The user now has a log in cookie, an access token cookie, and a saved list of Google Analytics profiles.

The dashboard is displayed using `dashboard.html` template, which is controlled by {@link ng.controller.dashboardCtrl}. `dashboardCtrl` uses several AngularJS services: {@link ng.service.gaApi}, {@link ng.service.ogAccount}, and {@link ng.service.periods} to construct parsed JSON objects, which the template uses to make the opengash tables.

---

If you need more clarifications about anything, submit an issue at [opengash's GitHub](https://github.com/msafi/opengash) page.



 