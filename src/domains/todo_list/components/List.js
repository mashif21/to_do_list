import {
    Button,
    Card,
    Container,
    Grid,
    Icon,
    Message,
    Loader
  } from 'semantic-ui-react'
  import React, { Component } from 'react'
  import { Redirect, withRouter, Link } from 'react-router-dom'
  
  import { connect } from 'react-redux'
  import { login, logout } from '../../../domains/auth/actions'
  import * as api from '../../../domains/api/actions'
  import {TaskCards} from './Cards'
  import { ModalComponent } from '../../elements/Popup'
  import { Filter } from './filter'
  

  class ToDoList extends Component {
    constructor (props) {
      super(props)
      this.state = {
        email: '',
        password: '',
        modalVisible: false,
        heading: '',
        description: '',
        taskToRemoveId: null,
        filterTriggered: false
      }
  
      this.handleFilterSearch = this.handleFilterSearch.bind(this)
      this.openModalForRemove = this.openModalForRemove.bind(this)
      this.removeTask = this.removeTask.bind(this)
      this.closeModal = this.closeModal.bind(this)
    }
    
    componentDidMount () {
      this.props.getTaskList(this.props.token)
    }
    
    handleFilterSearch (values) {
      const queryParams = (values === 2 ? true : false)
      this.setState({
        filterTriggered: true
      })
      this.props.getTaskList(this.props.token, queryParams)
    }

    removeTask (taskId) {
      const requestData = { taskId, taskList: this.props.taskList}
      this.props.deleteTaskList(requestData)
      this.closeModal()
    }

    closeModal () {
      this.setState({
        modalVisible: false,
        heading: null,
        description: null,
        taskToRemoveId: null
      })
    }

    openModalForRemove ({
      taskId
    }) {
      this.setState({
        modalVisible: true,
        heading: 'Remove Task',
        description: 'Are you sure you want to remove this task',
        taskToRemoveId: taskId
      })
    }

    render () {
      if (!this.props.loggedIn) return <Redirect to='/login' />
      return (
        <Grid
          textAlign='center'
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 1200 }}>
            <Container className='m-6'>
                <Filter filterParams = {[
                  {
                    text: 'All',
                    value: 1
                  },
                  {
                    text: 'Completed',
                    value: 2
                  },
                  {
                    text: 'Not Completed',
                    value: 3
                  }
                ]} handleFilterSearch={this.handleFilterSearch}/>
                <Button 
                  icon
                  labelPosition='left'
                  color='blue'
                  as={Link}
                  to={'/task/new'}
                  style={{float: 'right'}}              
                >
                  <Icon name='add' />
                  {'Create'}
                </Button>
            </Container>
            <Container>
              {this.props.taskListLoading ?
                <Loader active style={{marginTop: '10rem'}}>{'Loading ...'}</Loader>
              : this.props.taskList && this.props.taskList.data && this.props.taskList.count > 0 ? 
                  <>
                    <Card.Group style={{marginTop: '5rem'}}>
                      <TaskCards taskList={this.props.taskList ? [...this.props.taskList.data] : []} onRemoveClick={this.openModalForRemove}/>
                    </Card.Group>
                  </>
              : 
                !this.state.filterTriggered ?
                (
                  <>
                    <Message
                      positive
                      header='Task List Page'
                      content='Please create your task list using the create button'
                      style={{marginTop: '5rem'}}
                    />
                  </>
                ) : 
                <>
                  <Message
                    header='No data found for specified condition'
                    content='Please change filter condition to see new values'
                    style={{marginTop: '5rem'}}
                  />
              </>
              }
            </Container>
            <ModalComponent 
              openStatus={this.state.modalVisible} 
              onPressOk={() => this.removeTask(this.state.taskToRemoveId)} 
              onPressCancel={() => this.closeModal()}
              heading={this.state.heading}
              description={this.state.description}
            />
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
      getTaskList: (token, queryParams = null) => dispatch(api.getAndDelete({
        dispatch,
        url: 'task',
        token,
        queryParams
      })),
      deleteTaskList: ({
        taskList, taskId
      }) => dispatch(api.deleteCall({
        url: 'task',
        taskId,
        existingValues: taskList
      })),
      logout: () => dispatch(logout())
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      loggedIn: state.auth.loggedIn || localStorage.getItem('IS_LOGGED_IN'),
      token: state.auth.token || localStorage.getItem('TOKEN'),
      loginError: state.auth.loginError,
      taskListLoading: api.getApiLoading(state, 'task'),
      taskList: api.getApiResult(state, 'task') || api.getApiResult(state, 'apitask.lastSuccessfulResult'),
      taskListError: api.getApiError(state, 'task')
    } 
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(ToDoList))
  