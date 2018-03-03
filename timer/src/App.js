import React from 'react';
import helpers from './helpers';

//onClick={() => this.changeCheck(data.id)}
class TimersDashboard extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      timers: [
        {
          project: "Test project 1",title: "Test title 1", 
          id: helpers.guid(), elapsed: 5456099, runningSince: Date.now(),
        }, {
          title: "Test title 2",
          project: "Test project ",
          id: helpers.guid(),
          elapsed: 1273998,
          runningSince: null,
        }
      ],
    };
  }

  handleTrashClick = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(timer => timer.id !== timerId),
    });
  }

  handleStartClick = (timerId) =>{

    let time = this.state.timers.slice();
    for(let i = 0;i < time.length;i++){
      if(time[i].id === timerId){
        if(time[i].runningSince === null ){
          time[i].runningSince = Date.now();
        }
        else{
          //alert(helpers.renderElapsedString(time[i].elapsed, time[i].runningSince));
          time[i].elapsed += (Date.now() - time[i].runningSince); 
          time[i].runningSince = null;
          
        }
        
      }
    }
    //t[timerId].runningSince = Date.now();
    this.setState({timers:time});
  }

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);
  };


  createTimer = (timer) => {
    const t = helpers.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t),
    });
  };

  handleEditFormSubmit = (timer) => {
    this.updateTimer(timer)
  };


  updateTimer = (newTimer) => {
  
    const newArr = this.state.timers.map((timer) => {
      if (timer.id === newTimer.id) {
        return Object.assign({}, timer, {
          title: newTimer.title,
          project: newTimer.project,
        });
      } else {
        return timer;
      }
    });
    
    this.setState({
      timers: newArr,
    });    
  };



  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList 
            timers={this.state.timers}
            onStartClick={this.handleStartClick}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
             
          />
          <ToggleableTimerForm 
            onFormSubmit={this.handleCreateFormSubmit} 
          />
            
        </div>
      </div>
    );
  }
}

// class EditableTimerList extends React.Component {

//   render() {
//     const timers = this.props.timers.map((timer) => (
//       <EditableTimer
//         key={timer.id}
//         id={timer.id}
//         title={timer.title}
//         project={timer.project}
//         elapsed={timer.elapsed}
//         runningSince={timer.runningSince}
//         onStartClick={this.props.onStartClick}
//         onFormSubmit={this.props.onFormSubmit}
//         onTrashClick = {this.props.onTrashClick}        
//       />
//     return (
//       <div id='timers'>
//         {timers}
//       </div>
//     ));
//   }
// }


class EditableTimerList extends React.Component {

  render() {
    const timers = this.props.timers.map((timer) => (
      <EditableTimer
        key={timer.id}
        id={timer.id}
        title={timer.title}
        project={timer.project}
        elapsed={timer.elapsed}
        runningSince={timer.runningSince}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
        onStartClick={this.props.onStartClick}

      />
    ));
    return (
      <div id='timers'>
        {timers}
      </div>
    );
  }
}

//a
class EditableTimer extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      editFormOpen: false,
    };
  }

  handleSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.closeForm();
  };


  handleEditClick = () => {
    this.openForm();
  }

  openForm = () => {
    this.setState({
      editFormOpen: true,
    })
  };

    handleFormClose = () => {
    this.closeForm();
  };

   closeForm = () => {
    this.setState({
      editFormOpen: false,
    })
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
      //a
    } else {
      return (
        <Timer
          
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          onStartClick={this.props.onStartClick}
          onEditClick={this.handleEditClick}
          onTrashClick = {this.props.onTrashClick}

        />
      );
    }
  }
}

//a

class TimerForm extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      title: this.props.title || '',
      project: this.props.project || '',
    }
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  };

  handleProjectChange = (e) => {
    this.setState({
      project: e.target.value
    });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      title: this.state.title,
      project: this.state.project
    });
  };

  render() {
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Title</label>
              <input 
                type='text' 
                value={this.state.title} 
                onChange={this.handleTitleChange}
              />
            </div>
            <div className='field'>
              <label>Project</label>
              <input 
                type='text' 
                value={this.state.project}
                onChange={this.handleProjectChange}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button 
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button 
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


class ToggleableTimerForm extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isOpen: false,
    }
    // this.handleFormOpen = this.handleFormOpen.bind(this);
  }

  handleFormOpen = () => {
    this.setState({
      isOpen: true
    });
  };

  handleFormClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleFormSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.setState({ isOpen: false });
  };


  render() {
    if (this.state.isOpen) {
      return (
        <TimerForm
          onFormSubmit={this.handleFormSubmit}
          onFormClose={this.handleFormClose}
         />
      );
      //a
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button 
            className='ui basic button icon'
            onClick={this.handleFormOpen}
          >
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}

//a
class Timer extends React.Component {

  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  startClick = () => {
    this.props.onStartClick(this.props.id);
  };

  TrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

	render() {
	const elapsedString = helpers.renderElapsedString(this.props.elapsed, this.props.runningSince);
	return (
	  <div className='ui centered card'>
	    <div className='content'>
	      <div className='header'>{this.props.title}</div>
	      <div className='meta'>{this.props.project}</div>
	      <div className='center aligned description'>
	        <h2>{elapsedString}</h2>
	      </div>

	      <div className='extra content'>
	        <span className='right floated edit icon' onClick={this.props.onEditClick}>
	          <i className='edit icon' />
	        </span>
	        <span className='right floated trash icon' onClick={this.TrashClick}>
	          <i className='trash icon' />
	        </span>
	      </div>
	    </div>      
	    <button className='ui bottom attached blue basic button' onClick={this.startClick}>
	      {this.props.runningSince ? "Stop" : "Start"}
	    </button>
	  </div>
	);
	}
}



export default TimersDashboard;

