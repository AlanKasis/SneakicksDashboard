import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';

const LastCreatedCard = ({ cardCategory, cardContent, cardImage }) => {
    return (
        <Card style={{ width: '100%', textAlign: 'center' }}>
            <Card.Body>
                <Card.Title>Ultimo {cardCategory} creado</Card.Title>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <Card.Img className="last_created_image" variant="top" src={cardImage} />
                    <Card style={{ width: '18rem' }}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{cardContent?.row1}</ListGroup.Item>
                            <ListGroup.Item>{cardContent?.row2}</ListGroup.Item>
                            <ListGroup.Item>{cardContent?.row3}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>{cardContent?.row4}</ListGroup.Item>
                            <ListGroup.Item>{cardContent?.row5}</ListGroup.Item>
                            <ListGroup.Item>{cardContent?.row6}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                </div>
                {/* <Card.Text>{cardText}</Card.Text> */}
            </Card.Body>
        </Card>
    )
}

export default LastCreatedCard