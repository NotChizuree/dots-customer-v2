import React from 'react';
import {gql} from '@apollo/client';
import RestClient from './RestClient';

export const FindSavingsByCustomerID = async () => {
  // gql`
  //   query {
  //     findSavingsByCustomerID {
  //       id
  //       customerID
  //       createdAt
  //       currentBalance
  //       availableBalance
  //       productType {
  //         id
  //         name
  //       }
  //     }
  //   }
  // `

  const result = await RestClient('/', {
    method: "GET",
  })
}

export const FindLoansByCustomerID = gql`
  query {
    findLoansByCustomerID{
      id
      customerID
      outstandingBalance
      productType {
        id
        name
      }
    }
  }
`;

export const FindSavingByID = gql`
  query($id: ID!) {
    findSavingByID(id: $id) {
      id
      customerID
      createdAt
      currentBalance
      availableBalance
      productType {
        id
        name
      }
    }
  }
`;

export const FindLoanByID = gql`
query($id: ID!) {
  findLoanByID(id: $id) {
    id
    customerID
    outstandingBalance
    productType {
      id
      name
    }
  }
}
`;

export const FindLoanRepaymentScheduleByLoanID = gql `
query($id:ID!) {
  findLoanRepaymentScheduleByLoanID(id: $id, filter: UPCOMING) {
    term
    amount
    loanID
    principalAmount
    interestAmount
    penaltyAmount
    repaymentDate
  }
}
`;