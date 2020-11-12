import {
  Checkbox,
  Container,
  Form,
  Grid,
  Message
} from 'semantic-ui-react'
import React, { Component } from 'react'
import { Redirect, withRouter, Link } from 'react-router-dom'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { login } from '../../../domains/auth/actions'
import * as api from '../../../domains/api/actions'
import {
  TASK,
  REST_METHODS,
  AUTHENTICATION_GLOBAL_PARAMS
} from '../../url_constants'

const CustomButton = styled.button`
  background: ${(props) => (props.primary ? '#2185d0' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid;
  border-radius: 10px;
  cursor: pointer;
  border-color: 'black';
  height: 2.5rem;
  width: 15%;
  cursor: pointer;
`

class ToDoListCreate extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      description: '',
      firstTime: true,
      completed: false,
      triggerUpdate: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCheckChange = this.handleCheckChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setDefaultValue = this.setDefaultValue.bind(this)
    this.updateFirstTime = this.updateFirstTime.bind(this)
  }

  componentDidMount () {
    this.props.taskDetails({
      taskId: this.props.match.params.id
    })
  }

  handleChange (e, { name, value }) {
    this.setState({ [name]: value })
  }

  handleCheckChange (e, { checked }) {
    this.setState({ completed: checked })
  }

  handleSubmit () {
    const submissionData = {
      body: {
        completed: this.state.completed,
        description: this.state.description
      },
      taskId: this.props.match.params.id
    }
    this.setState({
      triggerUpdate: true
    })
    this.props.updateTaskDetails(submissionData)
  }

  setDefaultValue () {
    this.setState({
      description: this.props.taskList.data.description,
      completed: this.props.taskList.data.completed,
      firstTime: false
    })
  }

  updateFirstTime () {
    this.setState({
      firstTime: false
    })
  }

  render () {
    if (!this.props.loggedIn) return <Redirect to='/login' />
    if (
      !this.props.loadingTaskList &&
      this.props.taskList &&
      this.state.firstTime
    ) {
      this.setDefaultValue()
    }
    if (this.props.taskList && this.state.firstTime) {
      this.updateFirstTime()
    }
    return (
      <Grid textAlign='center' verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 1200 }}>
          {this.state.triggerUpdate && this.props.taskListError ? (
            <Message
              error
              header='Error'
              content='Error while updating task values'
            />
          ) : null}
          {this.state.triggerUpdate && this.props.taskList ? (
            <Message
              positive
              header='Success'
              content='Successfully updated task values'
            />
          ) : null}
          <Container className='m-4'>
            <h1>{'TO DO LIST'}</h1>
          </Container>
          <Form.TextArea
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Task Description'
            type='text'
            required
            name='description'
            value={this.state.description}
            onChange={this.handleChange}
            style={{
              width: '100%',
              borderColor: 'black',
              borderWidth: '1px',
              height: '10rem'
            }}
          />
          <div style={{ paddingTop: '2rem', float: 'right' }}>
            <Checkbox
              label='Completed'
              name='completed'
              onChange={this.handleCheckChange}
              checked={this.state.completed}
            />
          </div>
          <div style={{ paddingTop: '3rem' }}>
            <CustomButton primary onClick={this.handleSubmit}>
              {'Update'}
            </CustomButton>
          </div>
          {this.props.loginError ? (
            <Message
              error
              header='Authentication Error'
              content='Wrong username and/or password'
            />
          ) : null}
        </Grid.Column>
      </Grid>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (params) => dispatch(login(params)),
    taskDetails: ({ token, taskId }) =>
      dispatch(
        api.getCall({
          url: `${TASK}/${taskId}`
        })
      ),
    updateTaskDetails: ({ taskId, body }) =>
      dispatch(api.postAndUpdate(`${TASK}/${taskId}`, body, REST_METHODS.PUT)),
    getTaskList: (token) =>
      dispatch(
        api.getCall({
          url: TASK
        })
      )
  }
}

const mapStateToProps = (state, props) => {
  const { TOKEN, IS_LOGGED_IN } = AUTHENTICATION_GLOBAL_PARAMS
  return {
    loggedIn: state.auth.loggedIn || localStorage.getItem(IS_LOGGED_IN),
    token: state.auth.token || localStorage.getItem(TOKEN),
    loginError: state.auth.loginError,
    loadingTaskList: api.getApiLoading(
      state,
      `${TASK}.${props.match.params.id}`
    ),
    taskList:
      api.getApiResult(state, `${TASK}.${props.match.params.id}`) ||
      api.getApiResult(state, `${TASK}.${props.match.params.id}`),
    taskListError: api.getApiError(state, `${TASK}.${props.match.params.id}`)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ToDoListCreate))
