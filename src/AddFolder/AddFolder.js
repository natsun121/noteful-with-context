import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'

import './AddFolder.css'

export default class AddFolder extends Component {

  state = {
    name: ''
  }

  updateName(name) {
    this.setState({name})
  }

  handleSubmit(event, name) {
    event.preventDefault();
    console.log(name)
    // fetch(`http://localhost:9090/folders`, {
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   body: JSON.stringify(name)
  
    // })
    // .then(res => res.json())
    // .then(resJ => console.log(resJ))


  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={e => this.handleSubmit(e, this.state.name)}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' onChange={e => this.updateName(e.target.value)} />
          </div>
          <div className='buttons'>
            <button type='submit'>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
