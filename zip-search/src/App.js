import React, { Component } from 'react';
import './App.css';

//Destructuring props
function City({ cityName, population, state, latitude, longitude, wage }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>{cityName},{state}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>State: {state}</td>
          </tr>
          <tr>
            <td>Location: ({latitude},{longitude})</td>
          </tr>
          <tr>
            <td>Population: {population}</td>
          </tr>
          <tr>
            <td>Total Wages: {wage}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function NoResults(){
  return (
    <div>
      No Search Results.
    </div>
  );
}

function ZipSearchField(props) {
  return (
  <div>
    <div className="input-group">
      <div className="input-group-prepend">
        <span className="input-group-text">Zip Code: </span>
      </div>
      <input 
        type="text"  
        placeholder="Try 10016" 
        onChange={e => props.valueChanged(e)}
      />
    </div>
  </div>);
}

class App extends Component {
  constructor(props){
    super(props);
    this.state ={
      cities: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    if(event.target.value.length === 5){
      fetch("http://ctp-zip-api.herokuapp.com/zip/"+event.target.value)
      .then(response => response.json())
      .then(body => {
        console.log(body);
        this.setState({ cities: body});
      });
    }else{
      this.setState({ cities: [] });
    }
  }

  render() {
    let cityElements = this.state.cities.map((city,index) =>{
      return (
        <City 
          key={index}
          cityName={city.City}
          state={city.State}
          population={city.EstimatedPopulation}
          wage={city.TotalWages}
          latitude={city.Lat}
          longitude={city.Long}
        />
      );
    });
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
          <ZipSearchField valueChanged={this.handleChange}/>
        <div>
          {this.state.cities.length === 0 ? <NoResults /> : cityElements}
        </div>
      </div>
    );
  }
}

export default App;
