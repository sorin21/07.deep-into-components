import React from 'react';

import classes from './Cockpit.scss';

const cockpit = (props) => {
  const assignedClasses = [];
  let btnClass = classes.Buttton;
  if (props.showPersons) {
    // btnClass = classes.Red;
    btnClass = [classes.Button, classes.Red].join(" ");
  }

  if (props.persons.length <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.persons.length <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.appTitle}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button
        className={btnClass}
        onClick={props.clicked}>Toggle Persons</button>
      <button onClick={props.login}>Log in</button>
    </div>
  );
};

export default cockpit;