import React from 'react';
import Notes from './Notes.jsx';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../stores/NoteStore';
import Header from './Header';
import About from './About';
import Services from './services/Services';
import Contact from './Contact';
import Footer from './Footer';
import data from './../static-data/static-data.json.js';


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}