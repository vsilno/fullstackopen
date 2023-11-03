import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query allBooks($genre: String) {
        allBooks(genre: $genre) {
            title
            author {
                name
            }
            published
            genres
        }
    }
`

export const GENRES = gql`
    query {
        allBooks {
            genres
        }
    }
`

export const CURRENT_USER = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $genres: [String!]!, $published: Int!) {
        addBook(
            title: $title, 
            author: $author, 
            genres: $genres, 
            published: $published
        ) {
            title,
            published, 
            genres,
            author {
                name
            }
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $year: Int!) {
        editAuthor(name: $name, year: $year) {
            name
            born
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`
export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            author {
                name
            }
            title
        }
    }
`