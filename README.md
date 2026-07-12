# Coding-assesment

This project is a full-stack offers management application developed as part of a technical assessment. The backend exposes a REST API built with Express and MongoDB, while the frontend is implemented in Angular.
Undergoing this process involved first setting up both the frontend and the backend of the project, within the same directory.

## Frontend Development

Development of the frontend began with creating the TypeScript interfaces (models), followed by the application services responsible for communicating with the backend. Once the service layer was complete, the `offersPage` component (page) was developed to display the list of available offers. This was then followed by the implementation of the `offerCard` reusable component to have all offers within the same card layout and be reused per offer. The `offersPage` calls the GET endpoint through the offers service and stores the returned offers. Its template then renders one reusable `offerCard` component for each offer, passing the corresponding offer through the component's `@Input` property. Finally, the implementation of `addOfferPage` took place, which provides users with a form to create new offers.

One notable difference from React that I have noticed is Angular's component structure. Each component consists of three separate files, which are:

- `.ts` files hold the logic
- `.html` files hold the template
- `.css` files hold the styling

It is worth noting that ChatGPT Plus was used to help get the flow going for my first time in Angular, asking it questions and exploring Angular functions. More at [Angular Help](#learning-angular-concepts).

Then, once again with the aid of Artificial Intelligence (AI), I created the form needed to create new offers and a navigation bar. The navigation bar was created as a standalone reusable component and was routed to be on top of the `main` parts of the application, so that only the routed pages underneath changed with updates. More at [Frontend Component and Styling Generation](#frontend-component-and-styling-generation).

Finally, a few hours were dedicated to improving the overall stability of the frontend, as well as making it look professional and nice for the eye.

## Frontend Architecture

The frontend follows Angular's component-based architecture. Application-specific files are organised inside the `src/app` directory, where responsibilities are separated between pages, reusable components, services and models. The remaining files inside `src` manage application startup, global styling, routing configuration, testing, and server-side rendering.

```
src/
├── app/
│   ├── components/
│   ├── models/
│   ├── pages/
│   ├── services/
│   ├── app.config.server.ts
│   ├── app.config.ts
│   ├── app.css
│   ├── app.html
│   ├── app.routes.server.ts
│   ├── app.routes.ts
│   ├── app.spec.ts
│   └── app.ts
├── index.html
├── main.server.ts
├── main.ts
├── server.ts
└── styles.css
```

### Pages

Pages represent complete screens within the application and are responsible for orchestrating data and user interactions.

- `offersPage` retrieves and displays all available offers.
- `addOfferPage` provides the interface to create new offers.

### Components

Components are reusable UI elements shared across the whole application.
In this case, the `offerCard` component displays a single offer and is reused for every offer returned by the API. It also handles the toggling of the status without requiring the parent page to manage individual offer interactions.

The navigation bar is also implemented as a reusable standalone component, allowing every routed page to share a consistent layout.

### Services

Angular services encapsulate communication with the backend REST API. This keeps HTTP logic separate from presentation logic and allows multiple components to reuse the same functionality.

### Models

TypeScript interfaces define the structure of the application's data, providing strong typing and ensuring consistency between the frontend and backend.

## Backend & API Integration

To make sure that the backend server runs, a simple health endpoint was created and tested, proving that the initialisation of the backend was successful.

This was followed up by the initialisation and termination functions for the database. `connectDB()` initialises the MongoDB connection (or starts an in-memory MongoDB instance when no connection string is provided), and `disconnectDB()`, which closes the database connection and stops the in-memory database server when applicable.

Then, the database was filled with AI-generated seed data (found in: `seed/business.js` and `seed/offers.js`) by the code in the seeder `seedDatabase.js`.

Once the database layer was completed, the REST API was implemented using Express. Each endpoint was separated into route, controller, and validation layers (where applicable) to ensure each file had a single responsibility. This makes the project easier to maintain and extend as new endpoints are added.

Request validation is performed using `express-validator` before requests reach the controllers. This ensures invalid requests are rejected early, keeping the controller logic focused solely on processing valid business operations.

Then an extra Business API endpoint was created to return all businesses. Later on, this also became handy in the User Interface (UI), where the list of businesses was needed.

## Backend Architecture

The backend follows a layered architecture in which each file has a single responsibility.

```
src/
│
├── config/
├── controllers/
├── models/
├── routes/
├── seed/
├── validators/
├── app.js
└── server.js
```

### Controllers

Controllers contain the application's business logic. They receive validated requests from the routes, interact with the database through the Mongoose models, and return the appropriate HTTP responses.

### Routes

Routes define the available API endpoints and map incoming requests to their respective controller methods. They remain lightweight by delegating validation and business logic elsewhere.

### Validation

Request validation is performed using `express-validator`. Incoming requests are validated before reaching the controllers, ensuring only valid data is processed while providing meaningful error messages for invalid input.

### Models

The models define the MongoDB collections through Mongoose schemas. They also contain field constraints, default values and relationships between documents.

### Database

The database utilities are responsible for establishing and closing the MongoDB connection. If a `MONGODB_URI` is provided, the application connects to that database; otherwise, an in-memory MongoDB instance is automatically created.

### Seed (AI)

The seeding utilities populate the database with example businesses and offers whenever the database starts empty, ensuring the application is immediately usable without manual setup.

## Setup Instructions

### Requirements

- Node.js 22+
- npm
- MongoDB (optional)

### Installation

1. Clone the GitHub repository
2. Install backend dependencies
   - From root, cd backend
   - npm install
3. Install frontend dependencies
   - From root, cd frontend
   - npm install
4. Start the backend
   - npm run dev
5. Start the frontend
   - npm start

## Data Model Decisions

While designing the offer schema, I noticed that a business may provide multiple offers. Storing the business details directly inside each offer would lead to duplicated and redundant data. To avoid this, I created a separate [Business Schema](#business-schema), which is referenced by the Offer schema.

This approach keeps the data model more normalised and avoids repeating the same business information across multiple offers. It also means that if a business updates its details, such as its logo, phone number, website, or locations, those changes can automatically be reflected across all offers linked to that business.

### Offer Schema

The Offer schema stores information about each offer, including:
`title`, `description`, `amountOfUses`, `business`, `category`, `discount`, `plan`, `redeemableDays`, `locations`, `offerImages`, `expiryDate`, `status`, and `termsAndConditions`.

#### `title`

The public name of the offer shown throughout the application.

#### `description`

This would consist of a detailed explanation of the offer. It is limited to 500 characters to keep descriptions concise.

#### `amountOfUses`

This specifies how many times the offer can be redeemed. Defaults to one use.

#### `business`

The `business` field references the Business schema, using its ObjectId. This allows each offer to be linked to the business that created it.

#### `category`

This classifies the offer into predefined categories. This does not need to be shown to the user when seeing the offer. This is only there for filtering and searching purposes.

#### `discount`

This stores the percentage discount applied by the offer.

The consumer application prominently displays the value of the discount on each offer; therefore, a dedicated discount field was included rather than just embedding the information inside the description.

#### `plan`

Stores the membership plans on which the offer is available. The field is an array because I assumed that an offer may belong to multiple plans simultaneously. This is valid for users who are not premium members, who would be able to see the offers without being able to redeem them, enticing them to buy the premium subscription to benefit from those offers.

#### `redeemableDays`

This column defines on which weekdays the offer may be redeemed. This was also created as an array.

#### `locations`

Stores the locations where the offer is valid. Check [Future Work - Locations](#locations-links-for-businesses).

#### offerImages

This stores URLs of optional images that are specific to an individual offer.

#### `expiryDate`

Specifies when an offer expires. Although not every offer displayed within the consumer application appeared to expire, I inferred that businesses should be able to create time-limited promotions (for example: weekend, monthly or seasonal campaigns). Therefore, the expiry date was made optional.

#### `status`

This indicates whether the offer is active or inactive. Consumers should never see inactive offers. If an offer is active, it is shown to the user, whilst if it's not, it does not come up on the user's application. This can be used to temporarily hide offers without permanently deleting them.

#### `termsAndConditions`

Stores additional restrictions and redemption conditions that the users must follow.

### Business Schema

The Business schema stores information about each business, including:
`name`, `description`, `category`, `locations`, `email`, `phone`, `logoUrl`, `website`, and `images`.

This separates business-related information from offer-related information and reduces data duplication when a business creates multiple offers.

### REST API

#### Offers

- GET /api/offers
  Returns all offers.

- POST /api/offers
  Creates a new offer.

- PATCH /api/offers/:id/status
  Toggles an offer between Active and Inactive.

#### Businesses

- GET /api/businesses
  Returns all businesses.

## Assumptions and Trade-offs

### An offer for multiple subscription plans

An offer may belong to more than one membership plan; therefore, the `plan` field is stored as an array. This was done so that it reduces the duplication of similar or same offers.

### Business Images vs Offer Images

From the assessment brief and time taken to look around the app, it appeared that businesses share the same branding across multiple offers. To support this, each business stores default branding and gallery images. Then, individual offers can optionally define additional promotional images.

### Business Locations

Locations belong to businesses rather than offers. Each offer inherits the locations of the business that owns it. This currently includes a limitation when offers are specified to certain locations.

### Toggle within OfferCard instead of OffersPage

Each `OfferCard` represents a single offer and already receives that offer through an `@Input()`. Since toggling the status only affects that specific offer, I considered it appropriate for the card to handle the action itself. After calling the API, it updates its local `offer` with the response, allowing Angular's change detection to refresh the UI without reloading the entire list. This keeps the parent component focused on managing the collection of offers while the child component manages interactions for its own item.

## Future Work

### Location/s Links for Businesses

Locations would allow for links which would redirect the user to the location via navigation applications.
Locations could also be a new Schema on its own, which would then be shared amongst the different offers. This would require more work as some offers might be closed off for certain locations only.

### Linking Offer Categories with Business Categories

When a business is adding a new category, only categories which the business has added beforehand are shown as an option; if they would like to add one, they would need to edit business settings.

### Expiry Date allowance

The expiry date would allow the business to not add an expiry date so that the offer would be there until edited again by the business.

### Search, Filtering and Pagination for Offers

As the number of offers grows, the frontend should support searching, filtering by category or business, and pagination. These features would improve usability and reduce the amount of data transferred in each request.

## AI Tool Usage

Several generated snippets were discarded or significantly rewritten when they did not align with the existing project structure or coding style. AI suggestions were treated as a starting point rather than copied directly into the project.

### Seed Generation

ChatGPT Plus was used for the generation of the seed data for the Mongoose Offer schema since in-memory data does not persist across restarts. This was done using the prompt below. As requested, three businesses and 7 offers matching the structure of the Mongoose schemas were created. The generated data was manually reviewed and modified to ensure consistency with the schema, realistic descriptions, valid categories, and relationships between businesses and offers. This significantly reduced the time required to produce realistic test data, which allowed me to focus on the implementation of the backend.

> I am creating an offers application in Node.js, and I have created a schema for businesses and offers offered by those businesses using Mongoose. I would like you to generate seed data for the schemas. Invent 3 businesses and 7 offers.
> OfferSchema:....
> BusinessSchema....

<img width="1920" height="2467" alt="Business Seed" src="https://github.com/user-attachments/assets/82bcd886-5420-439c-b45b-707b71bd0389" />
<img width="1920" height="1774" alt="Offers Seed" src="https://github.com/user-attachments/assets/2ac01ff4-645f-4e37-a044-1842067e80db" />

Link to chat: [Chat Link](https://chatgpt.com/share/6a500ed3-18d4-83ed-887d-4e0d01a286f9)

### Plan - Server & Schema Validation Question

After going over the validation of the offers, looking side by side at the offer schema and the server-side validation, I noticed that the `plan` attribute was not matching, but I was not sure why. The code I had done on the server-side validation accepted either a string or an array of strings, whilst the database only accepted an array of strings. After countless manual tests, this was still not breaking, and therefore I turned to ChatGPT Plus with the below prompt.

I understood that `body("plan")` and the newly learned `body("plan.*")` were used for different reasons. It allows the user to enforce validation rules on every element within an array, in this case for the `plan` array. However, if an array is empty, `plan.*` has nothing to validate, which is why the separate `.isArray({ min: 1 })` check is necessary. This was then also used for `category`, in order to make sure that all elements within the array are `string` and are one of the predefined categories. Without the wildcard `.*`, one would be able to insert numbers within the array, and any other type of string, which would not be accepted by the backend's enum. This is because standard `body()` checks only make sure that the value is an array, and does not check what is inside.

This highlighted the difference between validating an array and validating each individual element of an array. This resulted in stronger server-side validation and prevented invalid values from reaching the database.

> I have the schema for my offers application for the different plans an offer can be on. I assume that an offer can be available on different plans. Is there something that I am missing between the schema and the server-side validation? Schema:
> plan:
> {
> type: [String],
> required: [true, "Offer plan is required"],
> enum: ["basic", "premium", "enterprise"],
> },

Validation:
body("plan")
.notEmpty()
.withMessage("Offer plan is required")
.bail()
.custom((value) => {
if (typeof value === 'string' || Array.isArray(value))
{ return true; }
throw new Error("Invalid offer plan");
}),

<img width="1920" height="1257" alt="Plan Server Validation" src="https://github.com/user-attachments/assets/d7a7abe2-10f3-428a-aa54-2c32cf2eb66a" />
<img width="1920" height="1257" alt="Plan DB Validation" src="https://github.com/user-attachments/assets/e3597a55-c25a-4949-8232-b5722a205e84" />

Link to chat: [Chat Link](https://chatgpt.com/share/6a524ca1-38e8-83ed-9ab4-b1346181405e)

This method was later also used for the `category` validation.

### Learning Angular Concepts

This was my first project developed using Angular, and when getting started with the frontend, I used ChatGPT to help explain Angular concepts, component communication, routing, dependency injection and the framework's overall architecture. I also asked for the differences between React and Angular.

### Debugging Angular Change Detection

ChatGPT was also used to debug why, after pressing the change status button in the UI, it was not updating automatically. After multiple attempts,`finalize` and `ChangeDetectorRef` were recommended and implemented. After the implementation of `finalize`, the problem persisted; however, it was later fixed with the introduction of `ChangeDetectorRef`, which led to the page responding as intended.

It is worth noting that before these implementations, the backend was returning the updated offer correctly; however, it was just the UI which wasn't reflecting the changes immediately and required a manual refresh. This is why calling markForCheck() explicitly notified Angular that the component's state had changed and that it should be checked during the next change detection cycle.

### Frontend Component and Styling Generation

Due to time constraints, ChatGPT was also used to create the `offerCard.html`, `offerCard.css`, `navbar.css`, `addOfferPage.ts`, `addOfferPage.html`, `addOfferPage.css`, and `offersPage.css`. Although these were mostly copy-pasted and then debugging bugs, more work on them was done on my own to make it look as professional as possible.

It is worth noting that it is my first time working with plain HTML and CSS, as we usually used to use libraries for assignments within React. I did not opt for a library as I thought this would be simpler; instead of looking and researching for a library, I was heavily mistaken.
