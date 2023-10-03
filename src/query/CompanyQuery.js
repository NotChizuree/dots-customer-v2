import {gql} from '@apollo/client';

export const FindAllOffices = gql`
query {
    findAllOffices {
      id
      name
      address
      latitude
      longitude
    }
  }
`;