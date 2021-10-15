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

class LineUserUnLocks extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      loaded: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    let url = this.props.location.search;
    let params = queryString.parse(url);
    console.log(params);
    //alert(window.location.href);
    //alert(params.uid);
    this.state.Uid = params.uid;
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleSubmit(event) {
    console.log("handleSubmit()");
    console.log(event);
    console.log(window.location.pathname);
    console.log(window.location.href);

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
    console.log(params.uid);
    console.log(this.state.Uid);
    console.log(this.state.Reason);
    
    let _UserID = this.state.Uid;
    let _Reason = this.state.Reason;

    //_UserID = undefined; //===> TEST
    if(_UserID === undefined){
      Swal.fire('กรุณาระบุ UserID')
    }else if(_Reason === undefined || _Reason == ""){
      Swal.fire('กรุณาระบุ Reason')
    }else{
      this.requestUserUnlock(_UserID, _Reason);

      /* const response = await axios.post(util_RequestApi('requestUserUnLockPost')
                                          , JSON.stringify({
                                            UserID: _UserID,
                                            Reason: _Reason,
                                          })
                                          , {headers: {'Accept': 'application/json'}})
                                          .then(function (response) {
                                              console.log(response);
                                              console.log(response.data["0"].ResultMsg);
                                              let _resMsg = (response.data["0"] === undefined) ? 'Request Unlock Success <br> Waiting for Admin Approve!' : response.data["0"].ResultMsg;
                                              Swal.fire(
                                                'Success!',
                                                _resMsg,
                                                //'Request Unlock Success <br> Waiting for Admin Approve!',
                                                'success'
                                              )

                                              this.setState({
                                                appData: response.data,
                                                isLoading: false
                                              });
                                          })
                                          .catch(error => {
                                            if (error.response) {
                                                console.log(error.responderEnd);
                                            }
                                        }); */
    }
}


requestUserUnlock(_pUserID, _pReason) {
  console.log("requestUserUnlock()");
  Swal.fire({
    title: 'Confirm For Request Unlock',
    //input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    showLoaderOnConfirm: true,
    preConfirm: (xx) => {
      return fetch(util_RequestApi('requestUserUnLockPost'),
        {
          method: 'post',
          body: JSON.stringify({
            UserID: _pUserID,
            Reason: _pReason,
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
      setTimeout(this.fnAlertSuccess(result.value["0"].ResultMsg, result.value["0"].ObjectID), 1000);
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
  window.location.href = url.replace('LineUserUnLocks?uid='+_UserID, 'LineUserDetailViews?oid='+_objectID+'&uid='+_UserID);
}

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                Form Request Unlock
              </CardHeader>
              <CardBody>
                {/* <Form action="" method="post"> */}
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="Uid" name="Uid" placeholder="Uid" autoComplete="Uid" disabled value={this.state.Uid} onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="Reason">Reason</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input type="textarea" name="Reason" id="Reason" rows="3" placeholder="Reason..." value={this.state.Reason} onChange={this.handleChange.bind(this)}/>
                    </Col>
                  </FormGroup>
                  <FormGroup className="form-actions">
                    <Button type="submit" size="sm" color="primary">Request Unlock</Button>
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

export default LineUserUnLocks;
