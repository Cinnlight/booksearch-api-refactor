import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query Me {
    me {
            username
            email
            _id
            bookCount
            savedBooks {
            authors
            bookId
            description
            image
            link
            title
            }
        }
    }
`;