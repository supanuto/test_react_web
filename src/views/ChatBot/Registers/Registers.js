import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from 'reactstrap';
import {util_RequestApi} from '../../../appUtil.js' //===> Make Config For App
import './style.css'

class Registers extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    let url = this.props.location.search;
    let params = queryString.parse(url);
    console.log(params);
    //alert(window.location.href);
    //alert(params.uid);

  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  componentWillMount(){
    let url = this.props.location.search;
    let params = queryString.parse(url);
    let _pUid = params.uid;
    this.setState({ UserID:_pUid});
  }

  handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit(event) {
    console.log("handleSubmit()");
    console.log(event);
    console.log(window.location.pathname); //yields: "/js" (where snippets run)
    console.log(window.location.href);     //yields: "https://stacksnippets.net/js"

    //const queryString = require('query-string');
     event.preventDefault();
     const data = new FormData(event.target);
     console.log(data);

     this.postDataFetch();
  }

  async postDataFetch(){
    let url = this.props.location.search;
    let params = queryString.parse(url);
    console.log(params);
    console.log(this.state.Name);
    console.log(this.state.Department);
    console.log(this.state.Position);
    console.log(this.state.Email);

    let _pUid = params.uid;
    let _Name = this.state.Name;
    let _Department = this.state.Department;
    let _Position = this.state.Position;
    let _Email = this.state.Email;

    if(_Name === undefined){
      Swal.fire('กรุณาระบุ Name')
    }else if(_Department === undefined){
      Swal.fire('กรุณาระบุ Department')
    }else if(_Position === undefined){
      Swal.fire('กรุณาระบุ Position')
    }else if(_Email === undefined){
      Swal.fire('กรุณาระบุ Email')
    }else{
      this.registerUserMember(_pUid, _Name, _Department, _Position, _Email, '0', 'Register From Web');
      /* const response = await axios.post(util_RequestApi('registerUserPost')
                                          , JSON.stringify({
                                            UserID: _pUid,
                                            Name: _Name,
                                            Department: _Department,
                                            Position: _Position,
                                            Email: _Email,
                                            AuthenStatus: '0',
                                            LogEventMsg: 'Register From Web',
                                          })
                                          , {headers: {'Accept': 'application/json'}})
                                          .then(function (response) {
                                              console.log(response);
                                              Swal.fire(
                                                'Success!',
                                                'Register Success <br> Waiting for Admin Approve!',
                                                'success'
                                              )
                                          })
                                          .catch(function (error) {
                                              console.log(error);
                                          }); */
    }
}

registerUserMember(_pUserID, _pName, _pDepartment, _pPosition, _pEmail, _pAuthenStatus, _pLogEventMsg) {
  console.log("registerUserMember()");
  Swal.fire({
    title: 'Confirm For Register User',
    //input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    showLoaderOnConfirm: true,
    preConfirm: (xx) => {
      return fetch(util_RequestApi('registerUserPost'),
        {
          method: 'post',
          body: JSON.stringify({
            UserID: _pUserID,
            Name: _pName,
            Department: _pDepartment,
            Position: _pPosition,
            Email: _pEmail,
            AuthenStatus: _pAuthenStatus,
            LogEventMsg: _pLogEventMsg,
          }),
          headers: {'Accept': 'application/json'}
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.value) {
      setTimeout(this.fnAlertSuccess('Register Success \r\n Waiting for Admin Approve!', result.value["0"].objectID), 1000);
    }
  }) 
}

fnAlertSuccess(_message, _objectID){
  Swal.fire({title: 'Success!', text: _message, icon:'success' }).then(result => {
    if (result.value) {
      setTimeout(this.fnRedirectDetailPage(_objectID), 2000);
    } else {
      // handle dismissals
      // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
    }
  })
}

fnAlertWarning(_message, _objectID){
  Swal.fire({title: 'Warning!!', text: _message, icon:'warning' }).then(result => {
    if (result.value) {
      //setTimeout(this.fnReloadSelfPage(), 2000);
    } else {
      // handle dismissals
      // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
    }
  })
}

fnRedirectDetailPage(_objectID){
  var url=window.location.href;
  var _UserID = this.state.UserID;
  _UserID = (_UserID == undefined || _UserID == 'undefined') ?'':_UserID;
  window.location.href = url.replace('Registers?uid='+_UserID, 'LineUserDetailViews?oid='+_objectID+'&uid='+_UserID);
}

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
              <i className="fa fa-align-justify"></i> CHATBOT LINE MEMBER REGISTER
              </CardHeader>
              <CardBody>
                {/* <Form action="" method="post"> */}
                <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-cog"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="UserID" name="UserID" placeholder="..." autoComplete="name" value={this.state.UserID} disabled="disabled" />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="Name" name="Name" placeholder="Name" autoComplete="name" value={this.state.Name} onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-building"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="Department" name="Department" placeholder="Department" autoComplete="department" value={this.state.Department} onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-drivers-license"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="Position" name="Position" placeholder="Position" autoComplete="position" value={this.state.Position} onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" id="Email" name="Email" placeholder="Email" autoComplete="email" value={this.state.Email} onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                  </FormGroup>
                  {/* <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-asterisk"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" id="password1" name="password1" placeholder="Password" autoComplete="current-password"/>
                    </InputGroup>
                  </FormGroup> */}
                  <FormGroup className="form-actions">
                    <Button type="submit" size="sm" color="primary">Register</Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Registers;
