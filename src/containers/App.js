import React, { PureComponent } from 'react';

import classes from './App.scss';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  state = {
    persons: [
      { id: 'asfa1', name: 'Max', age: 28 },
      { id: 'vasdf1', name: 'Manu', age: 29 },
      { id: 'asdf11', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    toggleClicked: 0,
    authenticated: false
  }

  //WARNING! To be deprecated in React v17. Use componentDidMount instead.
  // componentWillMount() {
  //   console.log('[App.js] Component will mount');
  // }

  componentDidMount() {
    console.log('[App.js] Component did mount');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("[UPDATE App.js] Get Derived State From Props", nextProps, prevState);
    return true;
  }

  /* shouldComponentUpdate(nextProps, nextState) {
    console.log("[UPDATE App.js] Should Component Update", nextProps, nextState);
    // console.log('nextState.persons', nextState.persons);
    // console.log('nextState.showPersons', nextState.showPersons);
    return nextState.persons !== this.state.persons || 
      nextState.showPersons !== this.state.showPersons;
    // return true;
  } */

  // componentWillUpdate(nextProps, nextState) {
  //   console.log("[UPDATE App.js] Component Will Update");
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log("[UPDATE App.js] Component Did Update", prevProps, prevState);
  }


  nameChangedHandler = ( event, id ) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    } );

    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( { persons: persons } );
  }

  deletePersonHandler = ( personIndex ) => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice( personIndex, 1 );
    this.setState( { persons: persons } );
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState((prevState) => ({ 
      showPersons: !doesShow,  
      toggleClicked: prevState.toggleClicked + 1
    }) );
  }

  loginHandler = () => {
    this.setState(() => ({authenticated: true}))
  }

  render () {
    console.log('[App.js] Inside render');
    let persons = null;

    if ( this.state.showPersons ) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />;
    }

    return (
      <div className={classes.App}>
        <button onClick={() => {this.setState(() => ({showPersons: true}))}}>Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
          login={this.loginHandler} />
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
