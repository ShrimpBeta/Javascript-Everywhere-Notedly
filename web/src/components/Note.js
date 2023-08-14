import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { format } from 'date-fns';
import styled from 'styled-components';

const StyledNote = styled.article`
max-width: 800px;
margin: 0 auto;
`;

const MetaData = styled.div`
@media (min-width: 500px) {
    display: flex;
    align-items: top;
}
`;

const MetaInfo = styled.div`
padding-right: 1em;
`;

const UserActions = styled.div`
margin-left: auto;
`;

const Note = ({ note }) => {
   return (
      <StyledNote>
         <MetaData>
            <MetaInfo>
               <img
                  src={note.author.avatar}
                  alt={`${note.author.username} avatar`}
                  height="50px" />
            </MetaInfo>
            <MetaInfo>
               <em>by</em> {note.author.username} <br />
               {format(note.createdAt, 'MMM Do YYYY')}
            </MetaInfo>
            <UserActions>
               <em>Favorites:</em> {note.favoriteCount}
            </UserActions>
         </MetaData>
         <ReactMarkdown source={note.content} remarkPlugins={[remarkGfm]}></ReactMarkdown>
      </StyledNote>
   );
};

export default Note;