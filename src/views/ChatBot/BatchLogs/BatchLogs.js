import React, {Component} from 'react';
import {Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Button} from 'reactstrap';
import classnames from 'classnames';
import nl2br from 'react-newline-to-break'; 
import queryString from 'query-string';
import axios from 'axios';
import Swal from 'sweetalert2'
import './style.css' 
import {util_RequestApi} from '../../../appUtil.js' //===> Make Config For App

class BatchLogs extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: new Array(4).fill('1'),
      batchName:'',
      uID:'',
      resData:'N/A',
      resDataAll:'N/A',
      resDataAllBadge: 0,
    };

    let url = this.props.location.search;
    let params = queryString.parse(url);
    console.log(params);
    this.state.batchName = params.BatchName;
    this.state.uID = params.uid;
    this.handleClickSendMail = this.handleClickSendMail.bind(this);
  }

  componentWillMount(){  
  }

  componentDidMount(){
    this.getMailImapToDB();
  }

  showLoadingText(){
    return 'Loading!!!';
  }

  fnStr1() {   
    console.log("fnStr1()");
    let myString = "Bacth Name: " + this.state.batchName 
                + "\nLog"
                + "\nBatch Start: 03/12/2019 09:00"
                + "\nBatch End: 03/12/2019 09:15"
                + "\nBatch Status: Success!"
                + "\nDownload Log?"
    myString = "Bacth Name: " + this.state.batchName 
                + "\n Last Log Description: \n\n"
    let _data = this.state.resData;
    myString += _data[0].ResultDescView  || this.showLoadingText();
    return myString;
  }

  fnStr2() {
    console.log("fnStr2()");
    let myString = "Bacth Name: " + this.state.batchName 
                    + "\n All Log Description: \n\n"
    let _data = this.state.resDataAll;
    //console.log(_data.length);
    myString += "----------------------------------------" + "\n";
    Object.keys(_data).forEach(key => {
      myString +=( ((_data[key].MsgDate) || this.showLoadingText()) + ": "+ "\n" +((_data[key].ResultDescView)|| this.showLoadingText()) + "\n\n" )  ;
      myString += "----------------------------------------" + "\n";
    });
    return myString;
  }

  fnStr3() {
    console.log("fnStr3()")
    let myString = "Bacth Name: " + this.state.batchName 
                  + "\n Schedule: "
    return myString;
  }

  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice()
    newArray[tabPane] = tab
    this.setState({
      activeTab: newArray,
    });
  }

  async getDataLastBatchLog(){
    let _UserID = this.state.uID;
    let _BatchName = this.state.batchName;
    let _resMsg = "";
    const response = await axios.post(util_RequestApi('requestLastMailByEventMsgPost')
                                          , JSON.stringify({
                                            UserID: _UserID,
                                            EventMsg: _BatchName,
                                          })
                                          , {headers: {'Accept': 'application/json'}})
                                          .then(function (response) {
                                              console.log(response);
                                              console.log(response.data["0"].ResultDescView);
                                              _resMsg = (response.data["0"] === undefined) ? 'API Error!' : response.data["0"].ResultDescView;
                                               this.setState({
                                                 resData: response.data["0"].ResultDescView,
                                               });
                                          })
                                          .catch(error => {
                                            if (error.response) {
                                                console.log(error.responderEnd);
                                            }
                                        });
                                    return _resMsg;
  }

  getMailImapToDB(){
    let _UserID = this.state.uID;
    let _BatchName = this.state.batchName;
    fetch(util_RequestApi('requestMailImapPost'),
    {
      method: 'post',
      body: JSON.stringify({
        UserID: _UserID,
        EventMsg: _BatchName,
      }),
      headers: {'Accept': 'application/json'}
    })
    .then(res => res.json())
    .then((data) => {
      console.log('getMailToDB');
      console.log(data);
      console.log('GetMailImap Success!');
      //this.setState({ resData: data["0"].ResultDescView })
      //this.setState({ resData: data })
      setTimeout(this.getDataLastBatchLogLast(), 1000);
  
    })
    .catch((error) => {
        this.setState({ hasErrors: true });
        console.log(error);
    } )
  }

  getDataLastBatchLogLast(){
    let _UserID = this.state.uID;
    let _BatchName = this.state.batchName;
    fetch(util_RequestApi('requestLastMailByEventMsgPost'),
    {
      method: 'post',
      body: JSON.stringify({
        UserID: _UserID,
        EventMsg: _BatchName,
      }),
      headers: {'Accept': 'application/json'}
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data["0"].ResultDescView);
      //this.setState({ resData: data["0"].ResultDescView })
      this.setState({ resData: data })
      setTimeout(this.getDataLastBatchLogAll(), 1000);
    })
    .catch((error) => {
        this.setState({ hasErrors: true });
        console.log(error);
    } )
  }

  getDataLastBatchLogAll(){
    let _UserID = this.state.uID;
    let _BatchName = this.state.batchName;
    fetch(util_RequestApi('requestAllMailByEventMsgPost'),
    {
      method: 'post',
      body: JSON.stringify({
        UserID: _UserID,
        EventMsg: _BatchName,
      }),
      headers: {'Accept': 'application/json'}
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      this.setState({ resDataAll: data, resDataAllBadge: data.length })
      
    })
    .catch((error) => {
        this.setState({ hasErrors: true });
        console.log(error);
    } )
  }

  handleClickSendMail(event) {
    console.log("handleClickSendMail()");
    console.log(event);
    console.log(window.location.pathname); 
    console.log(window.location.href);     
    let _UserID = this.state.uID;
    let _BatchName = this.state.batchName;
    let _data = this.state.resData;
    let _resultDescView = _data[0].ResultDescView
    Swal.fire({
      title: 'Please Specify Email',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Send Mail',
      showLoaderOnConfirm: true,
      preConfirm: (_email) => {
        return fetch(util_RequestApi('requestBatchLogSendMailPost'),
          {
            method: 'post',
            body: JSON.stringify({
              UserID: _UserID,
              BatchName: _BatchName,
              Description: _resultDescView,
              EmailSend:_email,
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
      console.log(result);
      if (result.value) {
        setTimeout(this.fnAlertSuccess(result.value.ResultMsg), 1000);       
        // Swal.fire({
        //   title: `${result.value.login}'s avatar`,
        //   imageUrl: result.value.avatar_url
        // })
      }
    }) 
  }

  handleClickSendMail2(event) {
    console.log("handleClickSendMail2()");
    console.log(event);
    console.log(window.location.pathname); 
    console.log(window.location.href);     
    let _UserID = this.state.uID;
    let _BatchName = this.state.batchName;
    fetch(util_RequestApi('requestBatchLogSendMailPost'),
    {
      method: 'post',
      body: JSON.stringify({
        UserID: _UserID,
        EventMsg: _BatchName,
      }),
      headers: {'Accept': 'application/json'}
    })
    .then(res => res.json())
    .then((data) => {
      console.log(data);
      setTimeout(this.fnAlertSuccess('Send Mail Success!'), 1000);
    })
    .catch((error) => {
        this.setState({ hasErrors: true });
        console.log(error);
    } ) 
  }

  fnAlertSuccess(message){
    Swal.fire(
      'Success!',
      message,
      'success'
    )
  }

  tabPane() {
    return (
      <>
        <TabPane tabId="1">
           {nl2br(this.fnStr1())}
          {/*{nl2br(this.state.resData)} */}
          <Row>
            <br></br>
          </Row>
          <Row>
            <Col col="6" sm="4" md="2" xl className="mb-3 mb-xl-0">
              <Button block color="info" onClick={this.handleClickSendMail}>Send Log To Mail</Button>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          {/* {`2. ${nl2br(this.lorem())}`} */}
          {nl2br(this.fnStr2())}
        </TabPane>
        <TabPane tabId="3">
          {/* {`3. ${this.lorem()}`} */}
          {nl2br(this.fnStr3())}
        </TabPane>
      </>
    );
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" md="6" className="mb-4">
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[3] === '1'}
                  onClick={() => { this.toggle(3, '1'); }}
                >
                  <i className="icon-calculator"></i>
                  <span className={this.state.activeTab[3] === '1' ? '' : 'd-none'}> BatchLogs</span>
                  {'\u00A0'}<Badge color="success">New</Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[3] === '2'}
                  onClick={() => { this.toggle(3, '2'); }}
                >
                  <i className="icon-basket-loaded"></i>
                  <span className={this.state.activeTab[3] === '2' ? '' : 'd-none'}> BatchName</span>
                  {'\u00A0'}<Badge pill color="danger">{nl2br(this.state.resDataAllBadge)}</Badge>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[3] === '3'}
                  onClick={() => { this.toggle(3, '3'); }} >
                    <i className="icon-pie-chart"></i>
                    <span className={this.state.activeTab[3] === '3' ? '' : 'd-none'}> Schedule</span>
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab[3]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

export default BatchLogs;
