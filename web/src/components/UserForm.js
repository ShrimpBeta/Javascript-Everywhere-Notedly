import React, { useState } from "react";
import styled from 'styled-components';

import Button from "./Button";

const Wrapper = styled.div`
border: 1px solid #f5f4f0;
max-width: 500px;
padding: 1em;
margin: 0 auto;
`;

const Form = styled.form`
label,
input {
  display: block;
  line-height: 2em;
}

input {
  width: 100%;
  margin-bottom: 1em;
}
`;

const UserForm = props => {
   const [values, setValues] = useState();

   const onChange = event => {
      setValues({
         ...values,
         [event.target.name]: event.target.value
      });
   };

   return (
      <Wrapper>
         <Form onSubmit={e => {
            e.preventDefault();
            props.action({
               variables: {
                  ...values
               }
            });
         }}>
            {props.formType === 'signup' && (
               <React.Fragment>
                  <label htmlFor="username">Username:</label>
                  <input
                     type="text" name="username" id="username"
                     required placeholder="username" onChange={onChange} />
               </React.Fragment>
            )}
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email"
               required placeholder="email" onChange={onChange} />
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password"
               required placeholder="password" onChange={onChange} />
            <Button type="submit">Submit</Button>
         </Form>
      </Wrapper>
   );
};

export default UserForm;