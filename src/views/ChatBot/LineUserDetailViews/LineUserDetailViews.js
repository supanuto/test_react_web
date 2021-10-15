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

class LineUserDetailViews extends Component {
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
      let _btnApproveVisible = '';
      let _btnLockVisible = '';
      let _btnUnLockVisible = '';
      if(_AuthenStatus == 1){
        _btnApproveVisible = '';
        _btnLockVisible = 'd-none';
        _btnUnLockVisible = 'd-none';
      }else if(_AuthenStatus == 2){
        _btnApproveVisible = 'd-none';
        _btnLockVisible = '';
        _btnUnLockVisible = 'd-none';
      }else if(_AuthenStatus == 3){
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

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" sm="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> CHATBOT LINE MEMBER USER VIEW
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
                      <Input type="text" id="Name" name="Name" placeholder="Name" autoComplete="name" value={this.state.dbName} onChange={this.handleChange.bind(this)} disabled="disabled" />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-building"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="Department" name="Department" placeholder="Department" autoComplete="department" value={this.state.dbDepartment} onChange={this.handleChange.bind(this)} disabled="disabled" />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-drivers-license"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" id="Position" name="Position" placeholder="Position" autoComplete="position" value={this.state.dbPosition} onChange={this.handleChange.bind(this)} disabled="disabled" />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText><i className="fa fa-envelope"></i></InputGroupText>
                      </InputGroupAddon>
                      <Input type="email" id="Email" name="Email" placeholder="Email" autoComplete="email" value={this.state.dbEmail} onChange={this.handleChange.bind(this)} disabled="disabled" />
                    </InputGroup>
                  </FormGroup>
                  <div>
                    {/*<span className="mr-1 badge badge-primary badge-pill">รออนุมัติ</span>*/}
                    <li className="list-group-item-action list-group-item-info list-group-item font-weight-bold">Status: {this.state.dbAuthenStatusDesc}</li>
                  </div>
                  <br></br>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LineUserDetailViews;
