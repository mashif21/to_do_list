import {
    Container,
    Form,
    Grid,
    Message,
  } from 'semantic-ui-react'
  import React, { Component } from 'react'
  import { withRouter } from 'react-router-dom'
  import styled from 'styled-components'
  
  import { connect } from 'react-redux'
  import { login } from '../../../domains/auth/actions'
  import * as api from '../../../domains/api/actions'
  
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
        triggeredSave: false,
        emptyError: false
      }
  
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e, { name, value }) {
      this.setState({ [name]: value })
    }
  
    handleSubmit () {
      if (this.state.description && this.state.description.trim().length > 0) {
        const submissionData = {
          body: { description: this.state.description },
          existingValues: (this.props.taskList && this.props.taskList.data) || [],
          token: this.props.token
        }
        this.setState({
          triggeredSave: true,
          emptyError: false
        })
        this.props.createTask(submissionData)
      } else {
        this.setState({
          emptyError: true
        })
      }
    }
  
    render () {
      return (
        <Grid
          textAlign='center'
          verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 1200 }}>
            {this.state.triggeredSave && this.props.taskListError ? (
              <Message
                error
                header='Error'
                content='Error while saving new task'
              />
            ) : null}
            {this.state.triggeredSave && this.props.taskList ? (
              <Message
                positive
                header='Success'
                content='Successfully created new task'
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
                onChange={this.handleChange}
                style={{
                  width: '100%',
                  borderColor: 'black',
                  borderWidth: '1px',
                  height: '10rem'
                }}
            />
            <Container>
              <span style={{color: 'red'}}>{this.state.emptyError? 'Please enter value in description' : ''}</span>
            </Container>
            <CustomButton primary onClick={this.handleSubmit} style={{top: 10}} disabled={this.state.triggeredSave && (this.props.loadingTaskList || this.props.taskList)}>
              {'Create'}
            </CustomButton>
          </Grid.Column>
        </Grid>
      )
    }
  }
  const mapDispatchToProps = (dispatch) => {
    return {  
      login: (params) => dispatch(login(params)),
      createTask: ({
          token,
          existingValues,
          body
        }) => dispatch(api.postAndUpdate(
        dispatch,
        'task',
        body,
        'post',
        existingValues,
        token,
      ))
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      loggedIn: state.auth.loggedIn || localStorage.getItem('IS_LOGGED_IN'),
      token: state.auth.token || localStorage.getItem('TOKEN'),
      loginError: state.auth.loginError,
      loadingTaskList: api.getApiLoading(state, 'task'),
      taskList: api.getApiResult(state, 'task') || api.getApiResult(state, 'task'),
      taskListError: api.getApiError(state, 'task')
    } 
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(ToDoListCreate))
