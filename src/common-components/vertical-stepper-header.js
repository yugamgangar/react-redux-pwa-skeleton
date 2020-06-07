import React from 'react'
import StepperHeaderDropdown from './stepper-header-dropdown'
import 'styles/common-components/vertical-stepper-header.scss'

function VerticalStepperHeader(props) {
    return (
        <div className='stepper-header-component'>
            <div className='stepper-header-circle'>
                <span>{props.completedContent}/{props.totalLevels}</span>
            </div>
            <div className={props.dropdown ? 'stepper-header-content-card dd' : 'stepper-header-content-card'}>
                {
                    props.dropdown ? (
                        <StepperHeaderDropdown level_data={props.level_data} levelChange={props.levelChange} />
                    ) : (
                            <div>
                                <p id='level-number-label'>{props.level_data[0]?.number}</p>
                                <p id='level-name-label'>{props.level_data[0]?.title}</p>
                            </div>
                        )
                }
            </div>
        </div>
    )
}

export default VerticalStepperHeader
