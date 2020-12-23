import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const SearchForm = (props) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [error, setError] = useState('')

    const onInput = e => {
        setSearchTerm(e.target.value)
    }

    const onSearch = e => {
        e.preventDefault()
        if(searchTerm.trim() !== '')
        {
            setError('')
            props.handleSearch(searchTerm)
        } else {
            setError('Please enter a search term.')
        }
    }

    return (
        <div>
            <Form onSubmit={onSearch}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Enter search term</Form.Label>
                    <Form.Control 
                        type="search"
                        name="searchTerm"
                        value={searchTerm}
                        placeholder="Search for album, artist, or playlist"
                        onChange={onInput}
                        autoComplete="off" />
                </Form.Group>
                <Button variant="info" type="submit">
                    Search
                </Button>
            </Form>
        </div>
    )
}
 
export default SearchForm;