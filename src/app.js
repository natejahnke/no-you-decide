import React from "react";
// import Autocomplete from "./components/Autocomplete";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
// import { setContext } from "apollo-link-context";
// import { InMemoryCache } from "apollo-cache-inmemory";

import Stores from "./components/Stores";
// import { get } from "http";
// import { createHttpLink } from "apollo-link-http";

const client = new ApolloClient({
  uri: "https://api.yelp.com/v3/graphql",
  // fetchOptions: {
  //   mode: "no-cors"
  // },
  request: operation => {
    operation.setContext({
      headers: {
        Authorization:
          "Bearer rpbJR_5oQtX2nznabKUk01y6bRq4mZ_v7k7Os9vWjYRukdSC--nrSYTzeHXFfd4ojloryKxoKK5MiJv2aBeADWq_LMnU_nQJDrx-fTaBM5KkeCGGV75nZl_D98bJXXYx",
        "Content-Type": "application/graphql",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
});

// const httpLink = createHttpLink({
//   uri: "https://api.yelp.com/v3/graphql",
//   fetchOptions: {
//     mode: "no-cors"
//   }
// });

// const authLink = setContext((_, { headers }) => {
//   const token = "rpbJR_5oQtX2nznabKUk01y6bRq4mZ_v7k7Os9vWjYRukdSC--nrSYTzeHXFfd4ojloryKxoKK5MiJv2aBeADWq_LMnU_nQJDrx-fTaBM5KkeCGGV75nZl_D98bJXXYx";
//   return {
//     headers: {
//       ...headers,
//       Authorization: token ? `Bearer ${token}` : "",
//       'Content-Type': "application/graphql",
//       'Access-Control-Allow-Origin': "GET, POST, HEAD, OPTIONS, PUT, DELETE, PATCH",
//     }
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache()
// });

const App = () => (
  <ApolloProvider client={client}>
    {/* <Autocomplete
        suggestions={["White", "Black", "Green", "Blue", "Yellow", "Red"]}
      /> */}
    <Stores />
  </ApolloProvider>
);

export default App;
