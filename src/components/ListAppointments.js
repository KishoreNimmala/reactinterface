import React,{component, Component} from 'react';

class ListAppointments extends Component{
    render(){
        const listItems=this.props.appointments.map((item,i)=>(
            <div key={i}>
              <div>
                {item.petName}
              </div>
              <div>
                {item.ownerName}
              </div>
            </div>
          ));
        return(
            <div>
                {listItems}
            </div>
        )
    }

}

export default ListAppointments;