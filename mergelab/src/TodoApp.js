import React, { Component } from 'react';
import './App.css';
import Header from './header';
//import TodoInput from './components/todoInput';
import checked from './checked.png';
import unchecked from './unchecked.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {id: 0, text: "Make dinner tonight!", priority: 2, completed: 0},
        {id: 1, text: "Fold the laundry.", priority: 1, completed: 0},
        {id: 2, text: "Learn to make a React app!" , priority: 3, completed: 0}
      ],  
      completedTodos: [],
      unCompletedTodos:[],
      nextId: 3,
      value: this.props.todoText,
      priority: 3,
      isEditing: false,
      id_edited: 0
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.sortByPrior = this.sortByPrior.bind(this);
    this.changeCheck = this.changeCheck.bind(this);

    this.saveTodo = this.saveTodo.bind(this);
    

    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this); 

  }

  componentWillMount(){
    this.sortByPrior(this.state.todos);
    let uncompletedTodos = this.state.todos.slice();
    this.setState({
      unCompletedTodos: uncompletedTodos
    });
  }



  changeCheck(_index){
      
      this.state.todos.filter((data) => {
        if(data.id === _index){
          if(data.completed === 0){
            data.completed = 1;
          } 
          else{
            data.completed = 0;
          } 
        }
      });

      console.log("posle "  + this.state.todos[_index].completed);
      let completedTodos = this.state.todos.filter((item, index) => item.completed !== 0);
      let unCompletedTodos = this.state.todos.filter((item, index) => item.completed !== 1);
      this.setState({
        completedTodos: completedTodos,
        unCompletedTodos: unCompletedTodos
      });
  }

  addTodo(todo, prior) {
    let todos = this.state.todos.slice();
    todos.push({id: this.state.nextId, text: todo, priority: prior, completed: 0});
    console.log(todo + " t & c " + prior); 
    this.sortByPrior(todos);
    this.setState({
      todos: todos,
      nextId: ++this.state.nextId,
      value: '',
      
       
    });

     let completedTodos = this.state.todos.filter((item, index) => item.completed !== 0);
    let unCompletedTodos = this.state.todos.filter((item, index) => item.completed !== 1);

    this.setState({

       completedTodos: completedTodos,
        unCompletedTodos: unCompletedTodos
      });
  }

  saveTodo(){
    let val = this.state.value;
    let pr = this.state.priority; 

    this.state.todos.filter((data, index) => {
        if(data.id === this.state.id_edited){
          data.text = val;
          data.priority = pr;      
        }
      });
    
    
    this.sortByPrior(this.state.todos);
    let completedTodos = this.state.todos.filter((item, index) => item.completed !== 0);
    let unCompletedTodos = this.state.todos.filter((item, index) => item.completed !== 1);

    this.setState({
      isEditing: false,
      value: '',

       completedTodos: completedTodos,
        unCompletedTodos: unCompletedTodos
    });
  }

  editTodo(_id){
   //alert(this.state.todos[_id].text + " + txt  pr  " + this.state.todos[_id].priority + " p => ");
    //this.props.value = text;
  //    alert(todo.text);
    //alert(this.state.id_edited + " this.state.todos[_id].id " + this.state.todos[_id].text)
    alert(_id)
    let s;
    this.state.todos.filter((data) =>{
      if(data.id === _id){
        s = data.text; 
      }
    });
    this.setState({
      
      value: s,     
      isEditing: true,
      id_edited: _id
      
    });
  }

  sortByPrior(todos){
    todos.sort(function(a,b){
      return b.priority - a.priority;
    });
  }
 

  removeTodo(id) {
    let todos = this.state.todos.slice();
    todos = this.state.todos.filter((todo) => todo.id !== id);

    let completedTodos = todos.filter((item) => item.completed !== 0);
    let unCompletedTodos = todos.filter((item) => item.completed !== 1);

    this.setState({
        todos: todos,
        completedTodos: completedTodos,
        unCompletedTodos: unCompletedTodos
      });
  }


  handleChange(e) {
    
    this.setState({
      value: e.target.value
    });
  }

  handleChange2(e){
    let val = e.target.value;
    console.log(val + " val and prior " + val);
    this.setState({
      priority: val
    });
  }



  render() {
    return (
      <div className="App">
        <div className="todo-wrapper">
          <Header/>
          <div>
        <input className = "input"  type="text" value={this.state.value} onChange={this.handleChange} autoFocus="true" />
        
        <select  onChange = {this.handleChange2}>
            <option value = "1">Low</option>
            <option value = "2">Mediuim</option>
            <option value = "3">High</option>
        </select>

        <button hidden = {this.state.isEditing} className="btn btn-primary" 
        onClick={() => this.addTodo(this.state.value, this.state.priority)}>Add</button>
        
        <button hidden = {!this.state.isEditing} className="btn btn-primary" 
        onClick={() => this.saveTodo()}>Save</button>
        
        
      </div>
           <div className="todoWrapper">
       <h1>Uncompleted staff</h1>
        <table className="table">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Priority</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.unCompletedTodos.map((data)=>
                                    
                                    <tr key={data.id}>
                 
                                        <td>{data.text}</td> 
                                        <td>{data.priority}</td>
                                        <td><img src={unchecked} className="image" 
                                        onClick={() => this.changeCheck(data.id)}/></td>
                                        
                  
                  <td><button className="removeTodo" 
                  onClick={() => this.removeTodo(data.id)}>remove</button></td>
                 
                 <td><button className="editTodo" onClick={() => this.editTodo(data.id)}>edit</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
        <h1>Completed staff</h1>

        <table className="table">
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Priority</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.completedTodos.map((data) =>  

                                    <tr key={data.id}>
                 
                                        <td>{data.text}</td> 
                                        <td>{data.priority}</td>
                                        <td><img src={checked} className="image" 
                                        onClick={() => this.changeCheck(data.id)}/></td>
                                        
                  
                  <td><button className="removeTodo" 
                  onClick={() => this.removeTodo(data.id)}>remove</button></td>
                 
                 <td><button className="editTodo" onClick={() => this.editTodo(data.id)}>edit</button></td>
                                    </tr>
                               )
                            }
                        </tbody>
                    </table>

      </div>

        </div> 
    

      </div>
    );
 }
}

export default App;