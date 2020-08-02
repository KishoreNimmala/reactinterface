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
          myName: 'Kishore',
          myAppointments:[],
          lastIndex:0,
          formDisplay:true

      }
      this.deleteAppointment=this.deleteAppointment.bind(this);
  }

  

  deleteAppointment(apt){
    let tempApts=this.state.myAppointments;
    tempApts=without(tempApts,apt);
    this.setState({
      myAppointments:tempApts
    });
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
       
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments 
                formDisplay={this.state.formDisplay}
                />
                <SearchAppointments />
                <ListAppointments 
                appointments={this.state.myAppointments} 
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
