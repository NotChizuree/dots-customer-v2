import React from 'react';
import {gql} from '@apollo/client';

export const FindAllUsers = gql`
  query {
    findAllUsers {
      id
      username
      firstName
      lastName
    }
  }
`;
