import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'

import './AddNote.css'
import ValidationError from '../ValidationError/ValidationError';


export default class AddNote extends Component {
  static contextType = ApiContext;
  state = {
    name: '',
    content: '',
    folderId: '',
    nameValid: false,
    contentValid: false,
    folderValid: false,
    formValid: false,
    validationMessages: {
      name: '',
      content: '',
      folder: ''
    }
  }

  updateName(name) {
    this.setState({name}, () => {this.validateName(name)});
  }
  updateContent(content) {
    this.setState({content}, () => {this.validateContent(content)})
  }
  updateFolderId(folderId) {
    this.setState({folderId}, () => {this.validateFolder(folderId)})
  }

  //function stubs need to be finished

  validateName(fieldValue) {
    const { notes } = this.context;
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else {

      if (typeof notes.find(n => n.name === fieldValue) === 'object') {
        fieldErrors.name = 'Name is taken';
        hasError = true;
      } else {
        fieldErrors.name = '';
        hasError = false;
      }
    }


    this.setState({
      validationMessages: fieldErrors,
      nameValid: !hasError
    }, this.formValid);

  }

  validateContent(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.content = 'Content is required';
      hasError = true;
    } else {
      fieldErrors.content = '';
        hasError = false;
      }

    this.setState({
      validationMessages: fieldErrors,
      contentValid: !hasError
    }, this.formValid);   

  }

  validateFolder(fieldValue) {
    const fieldErrors = { ...this.state.validationMessages };
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue === '...') {
      fieldErrors.folder = 'Choose a folder';
      hasError = true;
    } else {
      fieldErrors.content = '';
      hasError = false;
    }

    this.setState({
      validationMessages: fieldErrors,
      folderValid: !hasError
    }, this.formValid);   

  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid && this.state.contentValid && this.state.folderValid
    });
  }

  handleSubmit(event, name, content, folderId) {
    event.preventDefault();
    const date = new Date().toISOString()

    const url = `http://localhost:9090/notes`
    const note = {
      name,
      content,
      folderId,
      modified: date
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('unable to post note to server')
        }
        return res.json()
      })
      .then(resJ => {
        this.props.history.push('/')
        this.context.addNote(resJ)
      })



  }

  render() {
    const { folders } = this.context;
    const { name, content, folderId } = this.state;
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={e => this.handleSubmit(e, name, content, folderId)}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name' onChange={e => this.updateName(e.target.value)} />
            <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name} />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' onChange={e => this.updateContent(e.target.value)} />
            <ValidationError hasError={!this.state.contentValid} message={this.state.validationMessages.content} />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id' onChange={e => this.updateFolderId(e.target.value)}>
              <option value={null}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
            <ValidationError hasError={!this.state.folderValid} message={this.state.validationMessages.folder} />
          </div>
          <div className='buttons'>
            <button 
              type='submit'
              disabled={!this.state.formValid}>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
