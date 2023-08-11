import React from "react";
import { useQuery, gql } from "@apollo/client";
import ReactMarkdown from 'react-markdown';

import NoteFeed from "../components/NoteFeed";

import Button from "../components/Button";

// our GraphQL query, stored as a variable
const GET_NOTES = gql`
  query noteFeed($cursor: String) {
  noteFeed(cursor: $cursor) {
    cursor
    hasNextPage
    notes {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
}
`;

const Home = () => {
  // query hook
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  // if the data is loading, display a loading message
  if (loading) return <p>Loading...</p>;
  // if there is an error fetching the data, display an error message
  if (error) return <p>Error!</p>;
  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes}></NoteFeed>
      {
        data.noteFeed.hasNextPage && (
          <Button onClick={() =>
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    __typename: 'noteFeed'
                  }
                };
              }
            })
          }>Load more</Button>
        )}
    </React.Fragment>
  );
};

export default Home;