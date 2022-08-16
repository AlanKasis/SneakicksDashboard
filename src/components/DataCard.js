import React from 'react'
import { Card } from 'react-bootstrap'

const DataCard = ({cardTitle, displayedNumber}) => {
    return (
        <Card style={{ width: '80%', textAlign: 'center' }}>
            <Card.Body>
                <Card.Title>{displayedNumber}</Card.Title>
                <Card.Text>{cardTitle}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default DataCard