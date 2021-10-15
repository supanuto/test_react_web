import React, { Component } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import './style.css'
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

class LineUserDetails extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      ObjectID:'0',
      UserID:'0',
      dbObjectID:'',
      dbLineID:'',
      dbLineName:'',
      dbUserID:'',
      dbGroupID:'',
      dbRoomID:'',
      dbName:'',
      dbDepartment:'',
      dbPosition:'',
      dbEmail:'',
      dbEventMsg:'',
      dbLogEventMsg:'',
      dbAuthenStatus:'',
      dbAuthenStatusDesc:'',
      btnApproveVisible:'d-none',
      btnLockVisible:'d-none',
      btnUnLockVisible:'d-none',
    };
    
    let url = this.props.location.search;
    let params = queryString.parse(url);
    console.log(params);
    //alert(window.location.href);
    this.state.ObjectID = params.oid;
    this.state.UserID = params.uid;

    this.handleClickApprove = this.handleClickApprove.bind(this);
    this.handleClickLock = this.handleClickLock.bind(this);
    this.handleClickUnLock = this.handleClickUnLock.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

  //===>>> ON LOAD

  componentWillMount(){
    this.getLineMemberUserByID();
  }

  componentDidMount() {
    
  }

  getLineMemberUserByID(){
    let _UserID = this.state.UserID;
    let _ObjectID = this.state.ObjectID;
    fetch(util_RequestApi('getUserAuthenByIdPost'),
    {
      method: 'post',
      body: JSON.stringify({
        UserID: _UserID,
        ObjectID: _ObjectID
      }),
      headers: {'Accept': 'application/json'}
    })
    .then(res => res.json())
    .then((data) => {
      console.log('getUserAuthenByIdPost');
      console.log(data);
      console.log('getUserAuthenByIdPost Success!');

      let _AuthenStatus = data["0"].AuthenStatus;
      let _btnApproveVisible = 'd-none';
      let _btnLockVisible = 'd-none';
      let _btnUnLockVisible = 'd-none';
      if(_AuthenStatus == 1){
        _btnApproveVisible = '';
        _btnLockVisible = 'd-none';
        _btnUnLockVisible = 'd-none';
      }else if(_AuthenStatus == 2){
        _btnApproveVisible = 'd-none';
        _btnLockVisible = '';
        _btnUnLockVisible = 'd-none';
      }else if(_AuthenStatus == 3 || _AuthenStatus == 4){
        _btnApproveVisible = 'd-none';
        _btnLockVisible = 'd-none';
        _btnUnLockVisible = '';
      }
      
      this.setState({ dbObjectID:data["0"].ObjectID,
                      dbLineID:data["0"].LineID,
                      dbLineName:data["0"].LineName,
                      dbUserID:data["0"].UserID,
                      dbGroupID:data["0"].GroupID,
                      dbRoomID:data["0"].RoomID,
                      dbName:data["0"].Name,
                      dbDepartment:data["0"].Department,
                      dbPosition:data["0"].Position,
                      dbEmail:data["0"].Email,
                      dbEventMsg:data["0"].EventMsg,
                      dbLogEventMsg:data["0"].LogEventMsg,
                      dbAuthenStatus:data["0"].AuthenStatus,
                      dbAuthenStatusDesc:data["0"].AuthenStatusDesc,
                      btnApproveVisible:_btnApproveVisible,
                      btnLockVisible:_btnLockVisible,
                      btnUnLockVisible:_btnUnLockVisible,
                      })
    })
    .catch((error) => {
        this.setState({ hasErrors: true });
        console.log(error);
    } )
  }

  handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      })
  }

  handleClickApprove(event) {
    console.log("log-handleClickApprove");
    console.log(event);
    event.preventDefault();
    let _UserID = this.state.UserID;
    let _ObjectID = this.state.ObjectID;
    this.updateUserStatus(_UserID, _ObjectID, '1', 'Approve');
  }

  handleClickLock(event) {
    console.log("log-handleClickLock");
    console.log(event);
    event.preventDefault();
    let _UserID = this.state.UserID;
    let _ObjectID = this.state.ObjectID;
    this.updateUserStatus(_UserID, _ObjectID, '2', 'Lock');
  }

  handleClickUnLock(event) {
    console.log("log-handleClickUnLock");
    console.log(event);
    event.preventDefault();
    let _UserID = this.state.UserID;
    let _ObjectID = this.state.ObjectID;
    this.updateUserStatus(_UserID, _ObjectID, '3', 'UnLock');
  }


  updateUserStatus(userID, objectID, statusType, statusText) {
    console.log("updateUserStatus()");
    Swal.fire({
      title: 'Confirm For ' + statusText,
      //input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      showLoaderOnConfirm: true,
      preConfirm: (xx) => {
        return fetch(util_RequestApi('updateUserProfileStatusPost'),
          {
            method: 'post',
            body: JSON.stringify({
              UserID: userID,
              ObjectID: objectID,
              StatusType: statusType,
              StatusText: statusText,
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
        if(result.value["0"].ResultCode == 0){
          setTimeout(this.fnAlertSuccess(result.value["0"].ResultMsg), 1000);
        }else{
          setTimeout(this.fnAlertWarning(result.value["0"].ResultMsg), 1000);  
        } 
      }
    }) 
  }

  fnAlertSuccess(_message){
    Swal.fire({title: 'Success!', text: _message, icon:'success' }).then(result => {
      if (result.value) {
        setTimeout(this.fnReloadSelfPage(), 2000);
      } else {
        // handle dismissals
        // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
      }
    })
  }

  fnAlertWarning(_message){
    Swal.fire({title: 'Warning!!', text: _message, icon:'warning' }).then(result => {
      if (result.value) {
        //setTimeout(this.fnReloadSelfPage(), 2000);
      } else {
        // handle dismissals
        // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
      }
    })
  }

  fnReloadSelfPage(){
    window.location.reload(false);
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> CHATBOT LINE MEMBER USER DETAIL
              </CardHeader>
              <CardBody>
                {/* <Form action="" method="post"> */}
                <Form>
                <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-cog"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="UserID" name="UserID" placeholder="..." autoComplete="name" value={this.state.dbUserID} onChange={this.handleChange.bind(this)} disabled="disabled" />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-user"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="Name" name="Name" placeholder="Name" autoComplete="name" value={this.state.dbName} onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-building"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="Department" name="Department" placeholder="Department" autoComplete="department" value={this.state.dbDepartment} onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-drivers-license"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="Position" name="Position" placeholder="Position" autoComplete="position" value={this.state.dbPosition} onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" id="Email" name="Email" placeholder="Email" autoComplete="email" value={this.state.dbEmail} onChange={this.handleChange.bind(this)} />
                    </InputGroup>
                  </FormGroup>
                  <div>
                    <li className="list-group-item-action list-group-item-info list-group-item font-weight-bold">Status: {this.state.dbAuthenStatusDesc}</li>
                  </div>
                  <br></br>
                  <FormGroup className="form-actions">
                   <div col="12">
                      <div col="3" className="mb-3 mb-xl-0 col-sm-3 col-md-3 col-xl">
                        <button className={'btn-pill btn btn-success btn-block ' + this.state.btnApproveVisible} onClick={this.handleClickApprove}>Approve</button>
                      </div>
                      <div col="1"></div>
                      <div col="3" className="mb-3 mb-xl-0 col-sm-3 col-md-3 col-xl">
                        <button className={'btn-pill btn btn-danger btn-block ' + this.state.btnLockVisible} onClick={this.handleClickLock}>Lock</button>
                      </div>
                      <div col="1"></div>
                      <div col="3" className="mb-3 mb-xl-0 col-sm-3 col-md-3 col-xl">
                        <button className={'btn-pill btn btn-warning btn-block ' + this.state.btnUnLockVisible} onClick={this.handleClickUnLock}>UnLock</button>
                      </div>
                    </div>
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

export default LineUserDetails;
