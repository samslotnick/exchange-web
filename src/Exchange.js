import React, { Component } from "react";
import axios from 'axios';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';
import Select from 'react-select';

class Exchange extends Component {
  constructor(props){
    super(props);
    const getUTC = () => {
      
    }
   
    this.state = {
      options: [],
      numerator: {label: "USD", value: 1},
      denominator: {label: "USD", value: 1},
      baseValue: null,
      secondValue: null
    }
  }

  componentDidMount(){
    this.fetchResource()
  }
  fetchResource(params = {}){
    axios.get('/api/v1/exchange', {
      params :{
        date: "2021-02-10"
        // ======== generate date dynamically =====
      }
    })
    .then(response => {
      this.setState({options: response.data.options})
    console.log(this.state);
    })
}
handleNumeratorChange(e){
  const {secondValue, baseValue } = this.state;
  this.setState({numerator: e});
}
handleDenominatorChange(e){
  const {baseValue, secondValue} = this.state;
  this.setState({denominator: e});
}
handleBaseValueChange(e){
  const {numerator, denominator} = this.state;
  this.setState({baseValue: e.target.value})
}
handleSecondValueChange(e){
  const {numerator, denominator} = this.state;
  this.setState({secondValue: e.target.value})
  const val = this.state.numerator * e.target.value
  this.setState({baseValue: val})
}
handleFormSubmit(e){
  const { numerator, denominator, baseValue} = this.state
  axios.get('/api/v1/exchange_value', {
    params :{
      date: "2021-02-08",
      fromCurrency: numerator.value,
      amount: baseValue,
      toCurrency: denominator.value,
    }
  }).then(response => {
    console.log(response);
    this.setState({secondValue:response.data.toFixed(2)})
  
  })

}
  render (){

    const {
      options,
      defaultValue,
      baseValue,
      secondValue
    } = this.state;
    return(
      <Container fluid="md">      
       <Form >
        <Form.Row>
          <Col>
          {
            options ? 
            <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={options[0]}
            value={this.state.numerator}
            isSearchable
            onChange={this.handleNumeratorChange.bind(this)}
            name="color"
            options={options}
            /> : null
          }
          </Col>
          <Col>
            <Form.Control
            onChange={this.handleBaseValueChange.bind(this)}
            className="mb-2 mr-sm-2"
            value={baseValue}
            />
          </Col>
          <h2 className="Equals">
          &nbsp; = &nbsp;
          </h2>
          <Col>
          {
            options ? 
            <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={options[0]}
            value={this.state.denominator}
            isSearchable
            onChange={this.handleDenominatorChange.bind(this)}
            name="currency"
            options={options}
            /> : null
          }
          </Col>
          <Col>
          <Form.Control
            className="mb-2 mr-sm-2 basic-single"
            value={secondValue}
            readOnly
            />
          </Col>
        </Form.Row>
        <Button onClick={this.handleFormSubmit.bind(this) }variant="primary">
          Get Value
        </Button>
      </Form>
    
    {/* </Row> */}
          </Container>
    )
  }
}
export default Exchange;