import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import './NoteListMain.css'

import { getNotesForFolder } from '../notes-helpers';
import ApiContext from '../ApiContext';
import NoteListMainError from './NoteListMainError';

import PropTypes from 'prop-types';

class NoteListMain extends React.Component {
  static contextType = ApiContext;
  
  render() {
    const { folderId } = this.props.match.params
    const { notes=[] } = this.context;

    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteListMain'>
        <NoteListMainError>
            <ul>
              {notesForFolder.map(note =>
                <li key={note.id}>
                  <Note
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                  />
                </li>
              )}
            </ul>
            <div className='NoteListMain__button-container'>
              <CircleButton
                tag={Link}
                to='/add-note'
                type='button'
                className='NoteListMain__add-note-button'
              >
                <FontAwesomeIcon icon='plus' />
                <br />
                Note
              </CircleButton>
            </div>
        </NoteListMainError>
      </section>
    )
  }
}

NoteListMain.defaultProps = {
  notes: [],
}

NoteListMain.proptypes = {
  notes: PropTypes.array.isRequired,

}


export default NoteListMain