import React, { Component } from 'react';

class NoteListNavError extends Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Could not display the navigation.</h2>
            );
        }
        return this.props.children;
    }  
}

export default NoteListNavError;