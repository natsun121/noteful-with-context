import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NoteListNav from '../NoteListNav/NoteListNav'
import NotePageNav from '../NotePageNav/NotePageNav'
import NoteListMain from '../NoteListMain/NoteListMain'
import NotePageMain from '../NotePageMain/NotePageMain'
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'


import './App.css'
import ApiContext from '../ApiContext';
import AppErrorBoundary from './AppErrorBoundary';

class App extends Component {
  state = {
    notes: [],
    folders: [],
    error: ''
  };

  componentDidMount() {

    const url = `http://localhost:9090/`
    const endpoints = ['notes', 'folders']
    
    Promise.all(endpoints.map( e => 
      fetch(url.concat(e))
        .then(res => {
        if (!res.ok) {
          throw new Error('Unable to fetch from server');
        }
        return res.json()
        })
        .then(resJson => this.setState({
          [e]: resJson
        })) 
      
    ))
    .catch(error => {
      this.setState({
        error: 'Unable to fetch data from server'
      })
    })
    

  }

  renderNavRoutes() {

    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListNav}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageNav}
        />
        <Route
          path='/add-folder'
          component={NotePageNav}
        />
        <Route
          path='/add-note'
          component={NotePageNav}
        />
      </>
    )
  }

  renderMainRoutes() {

    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={NoteListMain}
          />
        )}
        <Route
          path='/note/:noteId'
          component={NotePageMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-note'
          component={AddNote}
        />
      </>
    )
  }

  handleDeleteNote = (noteId) => {
    const newNotes = this.state.notes.filter(n => n.id !== noteId)
    this.setState({
      notes: newNotes
    })
  }  

  handleAddFolder = (folder) => {

    this.setState({
      folders: [...this.state.folders, folder]
    })


  }

  handleAddNote = (note) => {

    this.setState({
      notes: [...this.state.notes, note]
    })


  }

  render() {
    const value = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.handleDeleteNote,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote
    }

    const { error } = this.state;

    return (
      <>
      <AppErrorBoundary>

        {error !== '' && <div className="error">{error}</div>}
        <ApiContext.Provider value={value}>
          
          <div className='App'>
            <nav className='App__nav'>
              {this.renderNavRoutes()}
            </nav>
            <header className='App__header'>
              <h1>
                <Link to='/'>Noteful</Link>
                {' '}
                <FontAwesomeIcon icon='check-double' />
              </h1>
            </header>
            <main className='App__main'>
              {this.renderMainRoutes()}
            </main>
          </div>
        </ApiContext.Provider>
      </AppErrorBoundary>
      </>
    )
  }
}



export default App
