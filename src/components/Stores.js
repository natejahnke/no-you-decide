import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Store from './Store';

const Stores = () => (
    <Query
          query={gql`
            {
              business(id: "garaje-san-francisco") {
                name
                id
                rating
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

export default Stores;