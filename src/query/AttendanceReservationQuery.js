import {gql} from '@apollo/client';

export const CreateAttendanceReservation = gql`
mutation($branchID: ID!,
    $destinationService: OfficeService!
    $reason: String!
    $attendAtStart: String!
    $attendAtEnd: String!
  ) {
    createAttendanceReservation(req: {
      branchID: $branchID,
      destinationService: $destinationService,
      reason: $reason,
      attendAtStart: $attendAtStart,
      attendAtEnd: $attendAtEnd
    }) {
      id
      branchID
      attendAtStart
      destinationService
      createdAt
    }
  }
`;