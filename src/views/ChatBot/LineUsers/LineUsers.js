import React, { Component } from 'react';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import ReactHtmlParser from 'react-html-parser'; 
import queryString from 'query-string';
import axios from 'axios';
import Swal from 'sweetalert2'
import './style.css'
import {util_RequestApi} from '../../../appUtil.js' //===> Make Config For App
import { Redirect } from 'react-router';

class LineUsers extends Component {

  constructor(props) {
    super(props);

    //this.toggle = this.toggle.bind(this);
    this.state = {
      UserID:'',
      htmlTable:'',
    };

    let url = this.props.location.search;
    let params = queryString.parse(url);
    console.log(params);
    this.state.uID = params.uid;
  }

  componentWillMount(){
    this.getLineMemberUserAll();
  }

  componentDidMount() {
  }

  eventBindClick(){
      let _UserID = this.state.uID;
      var elms = document.getElementsByName("tdObj");
      for(var i = 0; i < elms.length; i++) {
        console.log(elms[i]);
        elms[i].onclick = function(e) {
              console.log('clicked');
              console.log(e);
              console.log(this.getAttribute('data-objectid'));
              let _oid = this.getAttribute('data-objectid');
              var url=window.location.href;
              _UserID = (_UserID == undefined || _UserID == 'undefined') ?'':_UserID;
              window.location.href = url.replace('LineUsers', 'LineUserDetails?oid='+_oid+'&uid='+_UserID);
          }
      }
  }

  getLineMemberUserAll(){
    let _UserID = this.state.uID;
    fetch(util_RequestApi('getUserAuthenAllPost'),
    {
      method: 'post',
      body: JSON.stringify({
        UserID: _UserID,
      }),
      headers: {'Accept': 'application/json'}
    })
    .then(res => res.json())
    .then((data) => {
      console.log('getLineUserAll');
      console.log(data);
      console.log('getLineUserAll Success!');

      var _html = "";
      Object.keys(data).forEach(key => {
        //myString +=( ((_data[key].MsgDate) || this.showLoadingText()) + ": "+ "\n" +((_data[key].ResultDescView)|| this.showLoadingText()) + "\n\n" )  ;
        //myString += "----------------------------------------" + "\n";
        _html += "<tr>";
       //html += "<td><a href=\"Registers?id="+data[key].ObjectID+"\">"+data[key].Name+"</a></td>";
        _html += "<td><a role=\"button\" tabindex=\"0\" name=\"tdObj\" id=\"tdObj_"+data[key].ObjectID+"\" data-objectid=\""+data[key].ObjectID+"\">"+data[key].Name+"</a></td>";
        _html += "<td>"+data[key].Position+"</td>";
        _html += "<td>"+data[key].UserID+"</td>";
        _html += "<td>";

        if(data[key].AuthenStatus == 1){
          _html += "  <span class=\"mr-1 badge badge-primary badge-pill\">รออนุมัติ</span>";  
        }else if(data[key].AuthenStatus == 2){
          _html += "  <span class=\"mr-1 badge badge-success badge-pill\">Active</span>";  
        }else if(data[key].AuthenStatus == 3){
          _html += "  <span class=\"mr-1 badge badge-warning badge-pill\">ล็อค</span>";  
        }else if(data[key].AuthenStatus == 4){
          _html += "  <span class=\"mr-1 badge badge-primary badge-pill\">รอปลดล็อค</span>";  
        }else{
          _html += "  <span class=\"mr-1 badge badge-primary badge-pill\">N/A</span>";  
        }
        _html += "</td>";
        //_html += "<td>";
        //_html += "  <label class=\"mx-1 switch switch-pill switch-success form-check-label\"><input type=\"checkbox\" class=\"switch-input form-check-input\" value=\"\" checked=\"\"><span class=\"switch-slider\" data-checked=\"On\" data-unchecked=\"Off\"></span></label> ";
        //_html += "</td>";
        _html += "</tr>";
      });
      this.setState({ htmlTable: _html })
      this.eventBindClick();
    })
    .catch((error) => {
        this.setState({ hasErrors: true });
        console.log(error);
    } )
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> CHATBOT LINE MEMBER USER AUTHEN
              </CardHeader>
              <CardBody>
                <Table hover bordered striped responsive size="sm">
                  <thead>
                  <tr>
                    <th style={{width: '25%'}}>Name</th>
                    {/* <th style={{width: '10%'}}>Dept</th> */}
                    <th style={{width: '22%'}}>Pos</th>
                    <th style={{width: '30%'}}>UserID</th>
                    <th style={{width: '23%'}}>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  { ReactHtmlParser (this.state.htmlTable) }
                  </tbody>
                </Table>
                <nav>
                  <Pagination>
                    <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                    <PaginationItem active>
                      <PaginationLink tag="button">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                    <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                  </Pagination>
                </nav>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LineUsers;
