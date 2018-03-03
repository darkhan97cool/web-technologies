import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import imag from "./einstein.jpg";
import Popover from 'react-simple-popover';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      contacts:[
        {id: 0,fullName: "Ayan", number: "87072342354"},
        {id: 1,fullName: "Rayim", number: "87478972354"},
        {id: 2,fullName: "Yerlan", number: "87778972354"},
        {id: 3,fullName: "Bakhosh", number: "87077770777"},
        {id: 4,fullName: "Gaziz", number: "87777937397"}
      ],
      searchResults: [],
      isName: "fullName",
      open: false,
      id_opened: 0,
      is_editing: false,
      fullN:'',
      numb:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    //this.searchValue = this.searchValue.bind(this);
  }

  componentWillMount(){
    let contact = this.state.contacts.slice();
    this.setState({searchResults: contact});
  }


  handleChange2(e){
    let val = e.target.value;
    this.setState({
          isName: val
    });
    console.log(val);
    
  }

  handleChange(e){

    let _value = e.target.value;
  
    let contacts = this.state.contacts.slice();
    let searchResults = this.state.searchResults;
    searchResults.length = 0;
    /*
    let filteredContact = contacts.filter(contact=>{
      contact.
    });
    */
    console.log(this.state.IsName);
    for(let i = 0;i < contacts.length;i++){
      if(this.state.isName == "fullName"){
        let str = contacts[i].fullName;
        str = str.toLowerCase();
        if(str.indexOf(_value) != -1){
        
          let full = contacts[i].fullName;
          let numb = contacts[i].number;
          searchResults.push({id: contacts[i].id, fullName: full,number: numb});
        }
      }
      else{
        let str = contacts[i].number;
        str = str.toLowerCase();
        if(str.indexOf(_value) != -1){
        
          let full = contacts[i].fullName;
          let numb = contacts[i].number;
          searchResults.push({fullName: full,number: numb});
        }
      }      
    }
    this.setState({
          searchResults: searchResults
    });
    
  }

  clickPop(_id){
    this.setState({
      open: true,
      id_opened: _id,
      fullN: this.state.searchResults[_id].fullName,
      numb: this.state.searchResults[_id].number
    });
  }

  closePop(){
    this.setState({open: false});
  }

  clickedEdit(){
    this.setState({is_editing: true});
  }

  clickedSave(){
    //this.state.contacts[this.state.id_opened].
    this.state.contacts[this.state.id_opened].fullName = this.state.fullN;
    this.state.contacts[this.state.id_opened].number = this.state.numb;
    this.setState({
      is_editing: false,

    });
  }

  inputChangef(e){
    this.setState({fullN: e.target.value});
  }

  inputChangen(e){
    this.setState({numb: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <header><h1>Contact List</h1></header> 
        <div>
        
          <input value={this.state.value} onChange={this.handleChange} />
          
          
          <select value = {this.state.value} onChange = {this.handleChange2}>
            <option value = "fullName">Full Name</option>
            <option value = "number">Phone Number</option>
          </select>
          <div>
            <div className = "leftt">
              <table className="table">
                  <thead>
                      <tr>
                          <th>Photo</th>
                          <th>Full NAME</th>
                          <th>PHONE</th>
                      </tr>
                  </thead>
                  <tbody>
                      {
                        this.state.searchResults.map((searchResult,index) => 
                              <tr key={index} onClick = {this.clickPop.bind(this,index)} className = "table-tr">
                                  <td><img src = {imag}/></td>
                                  <td>{searchResult.fullName}</td> 
                                  <td>{searchResult.number}</td>                                      
                              </tr>
                            )
                      }
                  </tbody>
              </table>
            </div>
            
            <div className = "right">
              <Popover  continer={this} 
              show={this.state.open} onHide={!this.state.open} className = "pop-right" placement="right">
                <img src = {imag}/>
                <input disabled = {!this.state.is_editing} 
                type = "text" value = {this.state.fullN}
                onChange = {this.inputChangef.bind(this)}/>
                
                <input disabled = {!this.state.is_editing} type = "text" 
                value = {this.state.numb} 
                onChange = {this.inputChangen.bind(this)} />
                
                <button hidden = {this.state.is_editing} 
                onClick = {this.clickedEdit.bind(this)}>Edit</button>
                
                <button hidden = {!this.state.is_editing} 
                onClick = {this.clickedSave.bind(this)}>Save</button>

                <button onClick = {this.closePop.bind(this)}>X</button>
            </Popover>
            </div>
          </div>
        </div>
     </div>


    );
  }
}

export default App;
