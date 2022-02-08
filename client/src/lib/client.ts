import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient("http://localhost:4000");

// Set a single header
client.setHeader("authorization", "Bearer MY_TOKEN");

// Override all existing headers
client.setHeaders({
  authorization: "Bearer MY_TOKEN",
  anotherheader: "header_value",
});

export default client;
