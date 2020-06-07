import React from 'react'

class ProgressBar extends React.Component {
  render(props) {
    let widthStyle = { width: this.props.width + '%' }

    return (
      <React.Fragment>
        <div className='progress-bar'>
          <div className='progress' style={widthStyle} />
        </div>
      </React.Fragment>
    )
  }
}

export default ProgressBar
