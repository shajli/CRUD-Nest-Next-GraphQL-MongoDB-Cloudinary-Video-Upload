## CRUD-Nest-Next-GraphQL-MongoDB-Cloudinary-Video-Upload

### Description
This project is consists of a api server which is developed on top of Nest.js, Apollo GraphQL, MongoDB and a client with react Next.js, Apollo Client. When doing this project, I follow the best practice for production ready solution. Originaly this project has four different server. One for serving the API, one for client, one for Database that is MongoDB cloud Atlas and one for Media files storage that is Cloudinary. All servers are doing their job efficiently, so there is no performence related issue and Seperation of concern maintained very well. 

### How to Run
To run the project please nevigate to the project root folder and run with terminal/command prompt

```bash
yarn
```
to install server dependencies

then create a .env file in server root folder and copy the content form .env.example and update with your secrect

then start api server with 

```bash
yarn start:dev
```
a development server will starts at http://localhost:4000, if you want to goto GraphQL API endpoint then goto http://localhost:4000/graphql

Now goto the client folder and run with terminal/command prompt

```bash
yarn
```
to install client dependencies

After that run

```bash
yarn dev
```

a Next.js development server will start at http://localhost:3000 

Now goto http://localhost:3000 with your browser



