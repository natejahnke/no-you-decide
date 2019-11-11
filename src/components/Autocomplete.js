import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { Query } from "react-apollo";
import Store from "./Store";

export class Autocomplete extends Component {
  static propTypes = {
    suggestions: PropTypes.instanceOf(Array)
  };
  static defaultProperty = {
    suggestions: []
  };
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }

  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;

    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    } else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  // componentDidMount() {
  //   axios({
  //     url: 'https://api.yelp.com/v3/graphql',
  //     method: 'post',
  //     data: {
  //       query: `
  //         query PostsForAuthor {
  //           author(id: 1) {
  //             firstName
  //               posts {
  //                 title
  //                 votes
  //               }
  //             }
  //           }
  //         `
  //     }
  //   }).then((result) => {
  //     console.log(result.data)
  //   });
  // }

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
      if (filteredSuggestions.length) {
        suggestionsListComponent = (
          <ul class="suggestions">
            {filteredSuggestions.map((suggestion, index) => {
              let className;

              if (index === activeSuggestion) {
                className = "";
              }

              return (
                <li key={suggestion} onClick={onClick}>
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        suggestionsListComponent = (
          <div class="no-suggestions">
            <em>No suggestions</em>
          </div>
        );
      }
    }

    return (
      
        // <input
        //   type="search"
        //   onChange={onChange}
        //   onKeyDown={onKeyDown}
        //   value={userInput}
        // />
        // {suggestionsListComponent}
        <Query
          query={gql`
            {
              business(id: "garaje-san-francisco") {
                name
                id
                alias
                rating
                url
              }
            }
            `}
            >
              {({ loading, error, data }) => {
                if (loading) return <p>Good things take time...</p>
                if (error) return <p>Something went wrong....</p>

                return <div>{data.business.map(store => <Store store={store} />)}</div>
              }}
          </Query>
    )
