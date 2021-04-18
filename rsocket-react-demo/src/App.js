import React, {Component} from 'react';
import './App.css';
import {  InputGroup, FormControl, Button
} from 'react-bootstrap';
import _ from 'lodash';

import {
    RSocketClient
} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import Stock from './Stock';

class RSocketComponent extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.myRefSub = React.createRef();
      }


    state = {
        nick: 'Jackie',
        findStockResponse : null,
        findSubscritionResponse : null,
        findStockDetails: (event) => {
            let that = this;
            let index = this.myRef.valueOf().current.value;
                console.log(event)
                this.socket && this.socket.requestResponse({
                    data: '' + (index),
                    metadata: String.fromCharCode('org.mvnsearch.account.AccountService.findById'.length) +'org.mvnsearch.account.AccountService.findById'
                }).subscribe({
                    onComplete(payload) {
                        let account = JSON.parse(payload.data);
                        that.setState({
                            findStockResponse: account
                        })
                    },
                    onError: (e) => {
                        console.log('onError', e)
                    }
                });
        }
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className = "header">
                            Aris
                    </div>
                    <table>
                    <tr >
                        <td xs={6}>
                        <b>Search for a stock</b>
                            <InputGroup className="mb-3" id="stock-input">
                                <FormControl
                                    ref={this.myRef}
                                        id="stock-input-field"
                                        placeholder="Stock ID"
                                        aria-label="Stock ID"
                                        aria-describedby="basic-addon2"
                                        />
                                
                            </InputGroup>
                                
                            <Button id="stock-ids"
                                onClick={this.state.findStockDetails}>
                                Primary</Button>{' '}
                        </td>
                        <td  xs={6} ><>
                            <b>Subscribed Stocks(Enter comma separated values)</b>
                        <InputGroup className="mb-3" id="stock-input">
                                <FormControl
                                    ref={this.myRefSub}
                                        id="stock-input-field"
                                        placeholder="Stock ID in comma separated values"
                                        aria-label="Stock ID  in comma separated values"
                                        aria-describedby="basic-addon2"
                                        />
                                </InputGroup>
                            </>
                        </td>
                    </tr>
                    <tr className="stock-data">
                        <td  xs={6}>
                            <Stock data={this.state.findStockResponse}/>
                        </td>
                        <td  xs={6}>

                            {this.state.findSubscritionResponse != null &&
                             this.state.findSubscritionResponse.map(function(name, index){
                                return  <Stock data={name} />
                              })}
                        
                        </td>

                    </tr>

                    </table>
                        <div className = "footer">
                            Footer
                        </div>
                    </header>
            </div>
        );
    }

    componentDidMount() {
        this.initRsocketWebSocket();
        this.initSub();
    }

    //use websocket wrapped by rsocket
    initRsocketWebSocket() {
        // Create an instance of a client
        const client = new RSocketClient({
            //serializers: JsonSerializers,
            setup: {
                // ms btw sending keepalive to server
                keepAlive: 60000,
                // ms timeout if no keepalive response
                lifetime: 180000,
                // // format of `data`
                dataMimeType: 'application/json',
               metadataMimeType: 'message/x.rsocket.routing.v0',
            },
            transport: new RSocketWebSocketClient({url: 'ws://127.0.0.1:8088/rsocket'}),
        });

        // Open the connection
        client.connect().subscribe({
            onComplete: socket => {
                console.log('oncomplete ')
                this.socket = socket;
            },
            onError: error => console.error(error),
            onSubscribe: cancel => {/* call cancel() to abort */
            }
        });
       
    }

    initSub() {
        // Create an instance of a client
        const client1 = new RSocketClient({
            //serializers: JsonSerializers,
            setup: {
                // ms btw sending keepalive to server
                keepAlive: 60000,
                // ms timeout if no keepalive response
                lifetime: 180000,
                // // format of `data`
                dataMimeType: 'application/json',
               metadataMimeType: 'message/x.rsocket.routing.v0',
            },
            transport: new RSocketWebSocketClient({url: 'ws://127.0.0.1:8088/rsocket'}),
        });

        // Open the connection
        client1.connect().subscribe({
            onComplete: socket => {
                console.log('oncomplete ')
                this.socket = socket;
            },
            onError: error => console.error(error),
            onSubscribe: cancel => {/* call cancel() to abort */
            }
        });

        setInterval(() => {
            let that = this;
            let index = this.myRefSub.valueOf().current.value;
            this.socket && this.socket.requestResponse({
                data: '' + (index),
                metadata: String.fromCharCode('org.mvnsearch.account.AccountService.findSub'.length) +'org.mvnsearch.account.AccountService.findSub'
            }).subscribe({
                onComplete(payload) {
                    let response = JSON.parse(payload.data);
                    console.log(response)
                    that.setState({
                        findSubscritionResponse: response
                    })
                },
                onError: (e) => {
                    console.log('onError', e)
                }
            });
        }, 2000)
       
    }
}

export default RSocketComponent;

