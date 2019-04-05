import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'

import './AddNote.css'


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

  }

  validateContent(fieldValue) {

  }

  validateFolder(fieldValue) {

  }

  render() {
    const { folders } = this.context;

    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name' onChange={e => this.updateName(e.target.value)} />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' onChange={e => this.updateContent(e.target.value)} />
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
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
