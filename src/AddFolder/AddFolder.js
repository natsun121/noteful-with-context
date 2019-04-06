import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError/ValidationError'

import './AddFolder.css'
import AddFolderError from './AddFolderError';

export default class AddFolder extends Component {

  static contextType = ApiContext;

  state = {
    name: '',
    nameValid: false,
    formValid: false,
    validationMessages: {
      name: ''
    },
    error: null
  }

  validateName(fieldValue) {
    const { folders } = this.context;
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {

      fieldErrors.name = 'Name is required';
      hasError = true;
    } else {

      if (typeof folders.find(f => f.name === fieldValue) === 'object') {
        console.log('in taken')
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
    }, this.formValid );

  }

  formValid() {
    this.setState({
      formValid: this.state.nameValid
    });
  }

  updateName(name) {
    this.setState({name}, () => {this.validateName(name)})
  }

  handleSubmit(event, name) {
    event.preventDefault();

    const url = `http://localhost:9090/folders`
    const folder = {
      name
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(folder)
    })
    .then(res => {
      if(!res.ok) {
        throw new Error('unable to post folder to server');

      }
      return res.json()
    })
    .then(resJ => {
      this.props.history.push('/')
      this.context.addFolder(resJ)
    })
    .catch(error => console.log(error))
 


  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <AddFolderError>
          <NotefulForm onSubmit={e => this.handleSubmit(e, this.state.name)}>
            <div className='field'>
              <label htmlFor='folder-name-input'>
                Name
              </label>
              <input type='text' id='folder-name-input' onChange={e => this.updateName(e.target.value)} />
              <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>
            </div>
            <div className='buttons'>
              <button type='submit' disabled={!this.state.formValid}>
                Add folder
              </button>
            </div>
          </NotefulForm>
      </AddFolderError>
      </section>
    )
  }
}
