const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./server/schema/schema");
const mongoose = require("mongoose");

// I know this is a big security no-no, but this is how I pass the info to hook up MongoDB
// you'd probably do best to just paste in your URI and remove it before sharing
const mongoUserName = "user123";
const mongoUserPassword = "ZkzAQEfUp33mwqUE";
const mongoDatabase = "upwork1";

const app = express();
const port = process.env.PORT || 4000;

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);

// using varibales from above to populate URI
mongoose
  .connect(
    `mongodb+srv://${mongoUserName}:${mongoUserPassword}@cluster0.qmze0od.mongodb.net/${mongoDatabase}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen({ port: port }, () => {
      console.log("Listening for requests on my awesome port " + port);
    });
  })
  .catch((e) => console.log("Error" + e));
