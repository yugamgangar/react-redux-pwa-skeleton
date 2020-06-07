import React, { useState } from 'react'
import 'styles/common-components/stepper-header-dropdown.scss'
import Icon from 'utils/icon'

function StepperHeaderDropdown(props) {
    const [dd_toggle, setDdToggle] = useState(false)

    const toggleState = () => setDdToggle(!dd_toggle)

    return (
        <div className={dd_toggle === true ? 'dd-wrapper open' : 'dd-wrapper'} id='stepper-header-dropdown'>
            <div style={{ display: 'flex', cursor: 'pointer' }} onClick={toggleState}>
                <div className='dd-title'>
                    <p className='level-number-label'>{props?.level_data[0]?.number}</p>
                    <p className='level-name-label'>{props?.level_data[0]?.title}</p>
                    <p className='level-description-label'>{props?.level_data[0]?.description}</p>
                </div>
                {props.level_data.length > 1 && (
                    <Icon icon='ICON_DROPDOWN_CLOSE_ARROW' className='stepper-dropdown-arrow' />
                )}
            </div>

            <ul className='dd-list' onClick={props.levelChange}>

                {props?.level_data.slice(1).map((el, i) => {
                    return (
                        <li id={el.id} onClick={toggleState} key={i}>
                            <div className='dd-title'>
                                <p className='level-number-label' >{el.number}</p>
                                <p className='level-name-label'>{el.title}</p>
                            </div>
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}

export default StepperHeaderDropdown
