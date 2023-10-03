import {gql} from '@apollo/client';

export const FindSavingTransactionsBySavingID = gql`
query($id: ID!) {
    findSavingTransactionsBySavingID(id: $id) {
        id
        title
        transactionType
        amount
        createdAt
    }
  }
`;