import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { removeKeysInObj } from '../utils'


export default class SingleInputForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      value: '',
      priority: 1,
      error: ''
    }

    this.extraInputProps = removeKeysInObj(Object.keys(SingleInputForm.propTypes), this.props)
    this.onChangeValue = this.onChangeValue.bind(this)
    this.onChangePriority = this.onChangePriority.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChangeValue(event) {
    this.setState({
      value: event.target.value,
      error: ''
    })
  }

  onChangePriority(event) {
    this.setState({
      priority: event.target.value
    })
  }

  onSubmit(event) {
    event.preventDefault()
    if (!this.state.value || this.state.value.length <= 0) {
      this.setState({
        error: "Cannot submit an empty value"
      })
    } else {
      this.props.onSubmit(this.state.value, this.state.priority)
      this.setState({
        value: ''
      })
    }
  }

  render() {
    return(
      <form onSubmit={this.onSubmit}>
        <input {...this.extraInputProps} type="text" value={this.state.value} onChange={this.onChangeValue} />
        <input type="number" min="0" max="10" step="1" value={this.state.priority} onChange={this.onChangePriority} />
        { this.state.error ? <div>{this.state.error}</div> : []}
        <button type="submit">Submit</button>
      </form>
    )
  }

}
