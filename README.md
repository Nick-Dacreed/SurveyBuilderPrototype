# Survey Builder Prototype

This is a small prototype demonstrating a survey building component.

The user can add questions which will add objects to a config array. This config array is rendered to the screen in real time, showing how the data will look when being consumed by the user.

In a real-world setting, this config array (when complete) would be sent off to a database where it would be fetched for later use.

## Brief description of code.

The index.html file contains 2 divs which is where all the javascript in app.js is rendering content.

The first div with id = "builder" is rendering all the input elements necessary for building the survey. It has an options object called newQuestion, which is manipulated by the user through interaction with the DOM. When the user is satisfied, they hit the Add Question button which creates a new SurveyQuestion (class defined at line:5 of app.js) by adding all the values in newQuestion to that class model. This SurveyQuestion is then pushed to the config array, where it is read by the function at line:364 and rendered to the second div in index.html with the id = "survey".

This demonstrates how the component would work in an admin context, and also how it would be consumed in a user context.
