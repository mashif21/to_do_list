import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default class PrimaryMenu extends Component {
  render () {
    return (
      <Menu pointing>
        <Menu.Item
          name='users'
          active={this.props.location.pathname.includes('/task')}
        >
          <a href="/task">Tasks</a>
        </Menu.Item>
      </Menu>
    )
  }
}