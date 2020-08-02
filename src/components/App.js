import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import { render } from 'react-dom';
import { MdTransferWithinAStation } from 'react-icons/md';
import {findIndex,without} from 'lodash';

class App extends Component{
  constructor(){
      super();
      this.state={
          
          myAppointments:[],
          lastIndex:0,
          formDisplay:false,
          orderBy:'aptDate',
          orderDir:'desc',
          queryText:''
      }
      this.deleteAppointment=this.deleteAppointment.bind(this);
      this.toggleForm=this.toggleForm.bind(this);
      this.addAppointment=this.addAppointment.bind(this);
      this.changeOrder=this.changeOrder.bind(this);
      this.searchApts=this.searchApts.bind(this);
      this.updateInfo=this.updateInfo.bind(this);
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

  changeOrder(order,dir){
    this.setState({
      orderBy:order,
      orderDir:dir
    });
  }

  searchApts(query){
    this.setState({
      queryText:query
    })
  }
  
  updateInfo(name,value,id){
    let tempApts=this.state.myAppointments;
    let indexId=findIndex(this.state.myAppointments,{
      aptId:id
    });
    tempApts[indexId][name]=value;
    this.setState({
      myAppointments:tempApts
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
    filteredApts=filteredApts.sort((a,b)=>{
      if(a[this.state.orderBy].toLowerCase()<b[this.state.orderBy].toLowerCase()){
        return -1*order;
      }else {
        return 1*order;
      }
    }).filter(eachItem=>{
      return(
        eachItem['petName'].toLowerCase().includes(this.state.queryText.toLocaleLowerCase())
        ||
        eachItem['ownerName'].toLowerCase().includes(this.state.queryText.toLocaleLowerCase())
        ||
        eachItem['aptNotes'].toLowerCase().includes(this.state.queryText.toLocaleLowerCase())
      );
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
                <SearchAppointments
                searchApts={this.searchApts} 
                orderBy={this.state.orderBy}
                orderDir={this.state.orderDir}
                changeOrder={this.changeOrder}
                />
                <ListAppointments 
                appointments={filteredApts}
                updateInfo={this.updateInfo} 
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
