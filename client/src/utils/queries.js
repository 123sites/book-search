import { gql } from '@apollo/client';

export const QUERY_TECH = gql`
  query me {
    savedBooks {
      bookId
      title
    }
  }
`;

// export const QUERY_MATCHUPS = gql`
//   query matchups($_id: String) {
//     matchups(_id: $_id) {
//       _id
//       tech1
//       tech2
//       tech1_votes
//       tech2_votes
//     }
//   }
// `;
