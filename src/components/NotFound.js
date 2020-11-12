import React from 'react'

export default class NotFound extends React.Component {
  render () {
    return (
      <div className='flex h-full items-center justify-center'>
        <div className='text-center'>
          <h3 className='text-red text-3xl m-auto'>404</h3>
          <h4>Page not found</h4>
        </div>
      </div>
    )
  }
}
