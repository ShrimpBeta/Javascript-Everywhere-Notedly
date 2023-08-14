import React from 'react';
import { useQuery, gql } from '@apollo/client';

import Note from '../components/Note';

const GET_NOTE = gql`
   query note($id: ID!) {
      note(id: $id) {
         id
         createdAt
         content
         favoriteCount
         author {
            username
            id
            avatar
         }
      }Z
   }
`;

const NotePage = props => {
  const id = props.match.params.id;

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  if (loading) return <p>loading...</p>;

  if (error) return <p>Error! Note Not Found</p>;

  return <Note note={data.note}></Note>;
};

export default NotePage;
