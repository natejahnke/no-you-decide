import React from "react";
import Autocomplete from "./components/Autocomplete";

export default class App extends React.Component {
  state = {};

  render() {
    return (
      <Autocomplete
        suggestions={["White", "Black", "Green", "Blue", "Yellow", "Red"]}
      />
    );
  }
}
