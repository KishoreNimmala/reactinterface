import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import { render } from 'react-dom';
import { MdTransferWithinAStation } from 'react-icons/md';
import {without} from 'lodash';

class App extends Component{
  constructor(){
      super();
      this.state={
          
          myAppointments:[],
          lastIndex:0,
          formDisplay:false,
          orderBy:'ownerName',
          orderDir:'desc'
      }
      this.deleteAppointment=this.deleteAppointment.bind(this);
      this.toggleForm=this.toggleForm.bind(this);
      this.addAppointment=this.addAppointment.bind(this);
  }

  toggleForm(){
    this.setState({
      formDisplay:!this.state.formDisplay
    })
  } 

  deleteAppointment(apt){
    let tempApts=this.state.myAppointments;
    tempApts=without(tempApts,apt);
    this.setState({
      myAppointments:tempApts
    });
  }

  addAppointment(apt){
    let tempApts=this.state.myAppointments;
    apt.aptId=this.state.lastIndex;
    tempApts.unshift(apt);
    this.setState({
      myAppointments:tempApts,
      lastIndex:this.state.lastIndex+1
    })
  }

  componentDidMount(){
    fetch('./data.json')
    .then(respose=>respose.json())
    .then(resut=>{
      const apts=resut.map(item=>{
        item.aptId=this.state.lastIndex;
        this.setState({
          lastIndex:this.state.lastIndex+1
        });
        return item;
      })
      this.setState({
        myAppointments:apts
      });
    });
    
  }

  render() {
    let order;
    let filteredApts=this.state.myAppointments;
    if(this.state.orderDir==='asc'){
      order=1;
    }else{
      order=-1;
    }  
    filteredApts.sort((a,b)=>{
      if(a[this.state.orderBy].toLowerCase()<b[this.state.orderBy].toLowerCase){
        return -1*order;
      }else {
        return 1*order;
      }
    });

    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments 
                addAppointment={this.addAppointment}
                formDisplay={this.state.formDisplay}
                toggleForm={this.toggleForm}
                />
                <SearchAppointments />
                <ListAppointments 
                appointments={filteredApts} 
                deleteAppointment={this.deleteAppointment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default App;
