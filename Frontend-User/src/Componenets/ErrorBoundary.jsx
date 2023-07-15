import React, { Component } from 'react'

export class ErrorBoundary extends Component {

    state ={ hasError: false}

    static getDerivedStateFromError(error){
        return {hasError: true}
    }

    componentDidCatch(error,info){
        console.log(error,info)
    }
  render() {
    if(this.state.hasError){
        return this.props.fallback
    }
    return this.props.children
  }
}

export default ErrorBoundary
