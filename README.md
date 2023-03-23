<h2>DWAD19 Project Two</h2><br>
<h2><b>Project Name : SGxProperty</h2></b>

SGxProperty is a web app listing management system that is made for small real estate agencies or small agency teams to keep track of their property listings. It allows storing of property and listing information and also displaying them in a map view. Besides creating and storing information, there are other simple features available, such using ChatGPT to generate property description, editing and deleting property/listing information.

As data has become more and more valuable, the objective of SGxProperty it to assist real estate agents to quickly and easily manage their property listing information at work.


<h3>FEATURES</h3>

Major features of the application includes:

- A map-view displaying locations of property information

- An off-canvas that displays menu items

- Segregation of property and listing informations into 3 levels - 
    1st - Overview of property & listing locations in Singapore
    2nd - A display of the available listings in the property and their information, such as price and size etc.
    3rd - A detail property factsheet of the selected listing

- Automatically detects an existing property in the database when a user attempts to create a new listing. The user does not have to key in the same information of the property again.

- Autofills listing description based on the provided property and listing information.

- Conveniently retrieves full address from OneMap and MongoDB when typing a few key words of the property address

- Synchronized property information (property subtype )that will adjust accordingly when another information (property type) is selected

- Warning modal pop-ups when creating, updating and deleting data.

- Mobile Responsive (Bootstrap)


<h3>DATABASE STRUCTURE</h3>

There are 2 collections - Property Details and Listing Details.
The relationship between Property Details and Listing Details is one to many.
One property can have many different types of listings, for sale, for rent of different units in a property.
A Listing Details document is always referenced to a Property Details Document in MongoDB.


<h3>TECHNOLOGIES USED</h3>

The project is created using Vue(front-end), Express(server) and MongoDB(back-end) and written in HTML, CSS, and Javascript languages. 
The following libraries were used:
Bootstrap - https://getbootstrap.com/
Bootstrap-vue - https://bootstrap-vue.org/ 
Leaflet - https://leafletjs.com/ 
Axios - https://axios-http.com/docs/intro 

Data Sources consumed:

ChatGPT
https://api.openai.com/v1/completions

One Map
https://www.onemap.gov.sg/docs/#onemap-rest-apis


<h3>TESTING</h3>

CRUD operations were tested and worked.
ChatGPT features worked but the API key needs to be updated constantly and it is a paid feature.


<h3>LIMITATIONS & IMPROVEMENTS</h3>

1. There wasn't enough time to create a login feature to identify users, who are in charge of the different property listings.

2. The editing UI/UX could be improved further.


<h3>CREDITS AND ACKNOWLEDGMENT</h3>

Reference codes:

https://learnvue.co/tutorials/v-model-guide#using-vue-v-model-in-custom-components
https://www.youtube.com/watch?v=xtmZVV9QpaA
https://vuejs.org/guide/essentials/watchers.html#basic-example
https://stackoverflow.com/questions/68992586/how-to-search-through-the-keys-of-an-object-and-get-the-values-of-matching-keys
https://www.w3schools.com/
https://www.w3schools.com/jsref/jsref_substring.asp
https://vue2-leaflet.netlify.app/quickstart/#hello-map
https://stackoverflow.com/questions/41518609/clearing-input-in-vuejs-form


Special thanks to Billy, Yong Sheng, Shun and ChatGPT for helping me during the project
Special thanks to Flat Icon as the icons used in the web application were retreive from here https://www.flaticon.com/free-icons/park"