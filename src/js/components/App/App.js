import React, { Component } from 'react';
import { connect } from 'react-redux';
import {setMessage} from '../../actions/taskActions';
import {DumbApp} from './DumbApp';

class App extends Component {
  render() {
    return <DumbApp message={this.props.message} clearMessage={this.props.clearMessage}/>
  }
}
function mapDispatchToProps(dispatch){
  return{
    clearMessage: () => {dispatch(setMessage(''))}
  }
}
function mapStateToProps(state){
  return {
    message: state.tasks.message,
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
