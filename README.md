# coding-assesment

Undergoing this process was done by first setting up both the frontend and the backend of the project.

this was then followed by the creation and initialisation of the backend, starting simply with a health endpoint.

This was followed up by the initialisation and termination functions for the database. `connectDB()` initialises the MongoDB connection (or starts an in-memory MongoDB instance when no connection string is provided), and `disconnectDB()`, which closes the database connection and stops the in-memory database server when applicable.

Then, the database was filled with AI generated seed data by the code in the seeder `seedDatabase.js`.

Afterwards, API routes were created using `Router` from Express.

## Setup Instructions

## Data Model Decisions

While designing the offer schema, I noticed that a business may have provide multiple offers. Storing the business details directly inside each offer would lead to duplicated and redundant data. To avoid this, I created a separate [Business Schema](#business-schema), which is referenced by the Offer schema.

This approach keeps the data model more normalised and avoids repeating the same business information across multiple offers. It also means that if a business updates its details, such as its logo, phone number, website, or locations, those changes can automatically be reflected across all offers linked to that business.

### Offer Schema

The Offer schema stores information about each individual offer, including:
`title`, `description`, `amountOfUses`, `businessID`, `category`, `discount`, `redeemableDays`, `locations`, `offerImages`, `expiryDate`, `status`, and `termsAndConditions`.

The `business` field references the Business schema, allowing each offer to be linked to the business that created it.

### Business Schema

The Business schema stores information about each business, including:
`name`, `description`, `locations`, `email`, `phone`, `logo`, `website`, and `images`.

This separates business-related information from offer-related information and reduces data duplication.

## AI Tool Usage

ChatGPT basic was used for the generation of the seed data for the Mongoose Offer schema since in-memory data does not persist across restarts. This was done using the following prompt:

Link to chat: [Chat Link](https://chatgpt.com/share/6a500ed3-18d4-83ed-887d-4e0d01a286f9)
