# Coding-assesment

This project is a full-stack offers management application developed as part of a technical assessment. The backend exposes a REST API built with Express and MongoDB, while the frontend is implemented in Angular.
Undergoing this process involved first setting up both the frontend and the backend of the project, within the same directory.

## Frontend Architecture

Development of the frontend began with creating the TypeScript interfaces (models), followed by the application services responsible for communicating with the backend. Once the service layer was complete, the `offersPage` component (page) was developed to display the list of available offers. This was then followed by the implementation of the `offerCard` reusable component, to have all offers within the same card layout and be reused per offer. The GET endpoint would be called by the parent `offersPage` which would then call the component `offerCard`, which accepts an offer via the `@Input` property. Finally, the implementation of `addOfferPage` took place, which provides users with a form to create new offers.

One notable difference from React that I have noticed is Angular's component structure. Each component consists of three separate files which are:

- `.ts` files hold the logic
- `.html` files hold the template
- `.css` files hold the styling

It is worth noting that ChatGPT Plus was used to help get the flow going for my first time in angular, asking it questions and exploring Angular functions.

Then once again with the aid of Artificial Intelligence (AI), I created the form needed to create new offers and a navigation bar. The navigation bar was created as a standalone reusable component, and was routed to be on top of the `main` parts of the application, so that only the routed pages underneath change.

Finally, a few hours were dedicated in improving the overall stability of the frontend, as well as making it look professional and nice for the eye.

## Backend & API Integration

To make sure that the backend server runs, a simple health endpoint was created and tested, proving that the initialisation of the backend was successful.

This was followed up by the initialisation and termination functions for the database. `connectDB()` initialises the MongoDB connection (or starts an in-memory MongoDB instance when no connection string is provided), and `disconnectDB()`, which closes the database connection and stops the in-memory database server when applicable.

Then, the database was filled with AI-generated seed data (found in: `seed/business.js` and `seed/offers.js`) by the code in the seeder `seedDatabase.js`.

Once the database layer was completed, the REST API was implemented using Express. Each endpoint was separated into route, controller, and validation layers (where applicable) to ensure each file had a single responsibility. This makes the project easier to maintain and extend as new endpoints are added.

Request validation is performed using `express-validator` before requests reach the controllers. This ensures invalid requests are rejected early, keeping the controller logic focused solely on processing valid business operations.

Then an extra Business API endpoint was created to return all businesses. Later on, this also became handy in the User Interface (UI), where the list of businesses was needed.

## Setup Instructions

### Requirements

- Node.js 22+
- npm
- MongoDB (optional)

### Installation

1. Clone the GitHub repository
2. Install backend dependencies

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

This classifies the offer into predefined categories. This is not needed to be shown to the user when seeing the offer. This is only there for filtering and searching purposes.

#### `discount`

This stores the percentage discount applied by the offer.

#### `plan`

Stores the membership plans on which the offer is available. The field is an array because I assumed that an offer may belong to multiple plans simultaneously. This is valid for users who are not premium members, who would be able to see the offers without being able to redeem them, enticing them to buy the premium subscription to benefit from those offers.

#### `redeemableDays`

This column defines on which weekdays the offer may be redeemed. This was also created as an array.

#### `locations`

Stores the locations where the offer is valid. Check [Future Work - Locations](#locations-links-for-businesses).

#### offerImages

This stores URLs of optional images that are specific to an individual offer.

#### `expiryDate`

Specifies when the offer expires. This was done for offers which would be periodic, such as weekly and monthly.

#### `status`

This indicates whetherthe offer is active or inactive. This does not and should not be shown to the user. If an offer is active, it is shown to the user, whilst if its not, it does not come up on the users application.

#### `termsAndConditions`

Stores additional restrictions and redemptions conditions that the users must follow.

### Business Schema

The Business schema stores information about each business, including:
`name`, `description`, `category`, `locations`, `email`, `phone`, `logoUrl`, `website`, and `images`.

This separates business-related information from offer-related information and reduces data duplication.

#### `name`

The name of the business.

#### `description`

A short description about the business, what it does and what it is about.

#### `category`

The categories the business forms part of.

#### `locations`

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

An offer may belong to more than one membership plan, therefore the `plan` field is stored as an array. This was done so that it reduces the duplication of similar or same offers.

### Business Images vs Offer Images

From the assesment brief and time taken to look around the app, it appeared that businesses share the same branding across multiple offers. To support this, each business stores default branding and gallery images. Then, individual offers can optionally define additional promotional images.

### Business Locations

Locations belong to businesses rather than offers. Each offer inherits the locations of the business that owns it. This currently introudes a limitation when offers are specified to certain locations.

### Toggle within OfferCard instead of OffersPage

Each `OfferCard` represents a single offer and already receives that offer through an `@Input()`. Since toggling the status only affects that specific offer, I considered it appropriate for the card to handle the action itself. After calling the API, it updates its local `offer` with the response, allowing Angular's change detection to refresh the UI without reloading the entire list. This keeps the parent component focused on managing the collection of offers while the child component manages interactions for its own item.

## Future Work

### Location/s Links for Businesses

Locations would allow for links which would redirect the user to the location via navigation applications.
Locations could also be a new Schema on its own, which would then be shared amongst the different offers. This would require more work as some offers might be closed off for certain locations only.

### Linking Offer Categories with Business Categories

When a business is adding a new category, only categories which the business has added beforehand are shown as an option, if they would like to add one, they would need to edit business settings.

### Expiry Date allowance

The expiry date would allow the business to not add an expiry date so that the offer would be there until edited again by the business.

### Search, Filtering and Pagination for Offers

As the number of offer grows, the frontend should support searching, filtering by category or business, and pagination. These features would improve usability and reduce the amount of data transferred in each reaquest.

## AI Tool Usage

### Seed Generation

ChatGPT Plus was used for the generation of the seed data for the Mongoose Offer schema since in-memory data does not persist across restarts. This was done using the following prompt:

> I am creating an offers application in Node.js, and I have created a schema for businesses and offers offered by those businesses using Mongoose. I would like you to generate seed data for the schemas. Invent 3 businesses and 7 offers.
> OfferSchema:....
> BusinessSchema....

Insert 2 screenshots here:

Link to chat: [Chat Link](https://chatgpt.com/share/6a500ed3-18d4-83ed-887d-4e0d01a286f9)

### Plan - Server & Schema Validation Question

After going over the validation of the offers, looking side by side at the offer schema and the server side validation, I noticed that the `plan` attribute was not matching but I was not sure why. The code I had done on the server side validation accepted either a string, or an array of strings, whilst the database only accepted an array of strings. After countless manual tests, this was still not breaking, and therefore I turned to ChatGPT Plus with the below prompt.

I understood that `body("plan")` and the newly learned `body("plan.*")` were used for different reasons. It allows the user to enforce validation rules on every element within an array, in this case for the `plan` array. However, if an array is empty, `plan.*` has nothing to validate, which is why the separate `.isArray({ min: 1 })` check is necessary. This was then used also for `category`, inorder to make sure that all elements within the array are `string` and are one of the predefined categories. Without the wildcard `.*`, one would be able to insert numbers within the array, and any other type of string which would not be accepted by the backend's enum. This is because standard `body()` checks only make sure that the value is an array, and does not check what is inside.

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

Insert 2 screenshots here:

Link to chat: [Chat Link](https://chatgpt.com/share/6a524ca1-38e8-83ed-9ab4-b1346181405e)

### Angular Help

Since it was my first time using Angular, when getting to start the frontend, I used ChatGPT to help explain the differences between React and Angular, and also explain the way that angular works.

ChatGPT was also used to debug why after pressing the change status button on the UI, the UI was not changing. After multiple attempts,`finalize` and `ChangeDetectorRef` were recommended and implemented. After the implementation of `finalize`, the problem still persisted, however it was later fixed with the introduction of `ChangeDetectorRef`, which lead to the page responding as intended. It is worth nothing that before these implementations, the backend was returning the updated offer correctly, however it was just the UI which wasn't reflecting the changes immediately and required a manual refresh. This is why calling markForCheck() explicitly notified Angular that the component's state has changed and that it should be checked during the next change detection cycle.

Due to time constraints, ChatGPT was also used to create the `offerCard.html`, `offerCard.css`, `navbar.css`, `addOfferPage.ts`, `addOfferPage.html`, `addOfferPage.css`, and `offersPage.css`. Although these were mostly copy pasted, then debugging of bugs, more work on them was done on my own, to make it look as professional as possible.

It is worth noting that it is my first time working with plain HTML and CSS, as we usually used to use libraries for assignments within React. I did not opt for a library as I thought this would be simpler, instead of looking and researching for a library, but I was heavily mistaken.
