import React, { Component } from 'react';
import '../css/App.css';
import AddAppointments from './AddAppointments';
import ListAppointments from './ListAppointments';
import SearchAppointments from './SearchAppointments';
import { render } from 'react-dom';

class App extends Component{
  constructor(){
      super();
      this.state={
          myName: 'Kishore',
          myAppointments:[]

      }
  }

  componentDidMount(){
    fetch('./data.json')
    .then(respose=>respose.json())
    .then(resut=>{
      const apts=resut.map(item=>{
        return item;
      })
      this.setState({
        myAppointments:apts
      });
    });
    
  }

  render() { 
    const listItems=this.state.myAppointments.map((item,i)=>(
      <div key={i}>
        <div>
          {item.petName}
        </div>
        <div>
          {item.ownerName}
        </div>
      </div>
    ));   
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                {listItems}
                <AddAppointments />
                <SearchAppointments />
                <ListAppointments />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
export default App;
