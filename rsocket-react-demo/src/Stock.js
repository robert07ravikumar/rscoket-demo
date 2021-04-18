import React, {Component} from 'react';
import { Card, InputGroup, FormControl, Button, Container
    ,Row,
    Col} from 'react-bootstrap';

class Stock extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.myRef = React.createRef();
      }

      render(){
        return (
        <>
        {this.props.data != null ? <Card style={{ width: '18rem'}} className="stock-card">
        <Card.Body>
        <Card.Title>{this.props.data.ticker} - {this.props.data.id}</Card.Title>
            <Card.Text>
                Stock - {this.props.data.name} <br/>
                Price - {this.props.data.price} SGD
            </Card.Text>
        </Card.Body>
        </Card>
        :
        null
      }
        </>
        )
      }

}

export default Stock;