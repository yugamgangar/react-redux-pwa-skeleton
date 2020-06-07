import React, { Component } from 'react'
import ContentCard from 'views/dashboard/components/ContentCard'
import AssessmentCard from 'views/dashboard/components/AssessmentCard'
import PropTypes from 'prop-types'
import 'styles/common-components/vertical-stepper.scss'
import VerticalStepperHeader from './vertical-stepper-header'
import Icon from 'utils/icon'
import ReviseCard from '../views/dashboard/components/ReviseCard'

class VerticalStepper extends Component {

    render() {
        // STARTING AT 0, ONCE PROGRAM GETS FIRST INCOMPLETE DATA THIS WILL BE INCREASED WITH 1
        // JUST VALUE 1 IS THE TRIGGER FOR ONGOING CONTENT
        let ongoingContentTrigger = 0, completedContent = this.props.data.filter(x => x.completed === true).length
        let stepperClass = ''

        switch (this.props.parentDiv){
            case 'dashboard': stepperClass = 'phases-vertical-stepper-container dashboard'; break;
            case 'dayplan': stepperClass = 'phases-vertical-stepper-container dayplan'; break;
            case 'dayplan-modal': stepperClass = 'phases-vertical-stepper-container dayplan-modal'; break;
            default: stepperClass = 'phases-vertical-stepper-container dashboard'; break;
        }

        return (
            <div className={stepperClass} id='content-stepper'>
                <div className="vertical-stepper-mobile-pd">
                    <div className="vertical-step-container">

                        {this.props.parentDiv !== 'dayplan' && (
                        <div className='step' style={{ overflow: 'visible' }}>
                            <div className="v-stepper">
                                <div className="circle" style={{ visibility: 'hidden' }} />
                                <div className="line" />
                            </div>
                            <div className="content container-fluid pr-0 pl-0">
                                <VerticalStepperHeader 
                                    level_data= {this.props.levelData} 
                                    levelChange= {this.props.levelChange} 
                                    dropdown={this.props.dropdown ? true : false}
                                    totalLevels={this.props.parentDiv === 'dashboard' ? this.props.totalLevels : this.props.data.length}
                                    completedContent={this.props.parentDiv === 'dashboard' ? this.props.completedContent : completedContent}
                                />
                            </div>
                        </div>
                        )}

                        {this.props.data.map((obj, index) => {
                            if (this.props.parentDiv === 'levelpage' && obj.completed === false && !obj.locked) { ongoingContentTrigger += 1 }

                            return (
                                obj.type === 'assessment-card' && this.props.parentDiv === 'dashboard' && this.props.showReviseCard ? (
                                    <React.Fragment key={index}>
                                        
                                        <div className='step'>
                                            <div className="v-stepper">
                                                <div className="circle" />
                                                <div className="line" />
                                            </div>
                                            <div className="content container-fluid pr-0 pl-0">
                                                <ReviseCard
                                                    title={`Can't wait to see you on the next level Yugam!`}
                                                    link=''
                                                    description='Click to view previous content and brush up your skills. Then come back to the dashboard and ace this assessment.'
                                                    />
                                            </div>
                                        </div>

                                    <div className={`step${ongoingContentTrigger > 0 ? ' ongoing' : ''}`}>
                                        <div className="v-stepper">
                                            <div className="circle" />
                                            <div className="line" />
                                        </div>
                                        <div className="content container-fluid pr-0 pl-0">
                                            
                                                {ongoingContentTrigger === 1 && (
                                                    <div className='ongoing-continue-reminder'><Icon icon='ICON_MAP_PIN'/>You're here! Continue your progress.</div>
                                                )}
                                            <AssessmentCard
                                                id={obj.id}
                                                title={obj.title}
                                                questions={obj.questions}
                                                contentTime={obj.contentTime}
                                                review={obj.completed}
                                                score={68}
                                                locked={obj.locked}
                                            />
                                        </div>
                                    </div>
                                    </React.Fragment>
                                ) : obj.type === 'assessment-card' ? (
                                    <div
                                        className={`step${obj.completed ? ' completed' : ''}${ongoingContentTrigger > 0 ? ' ongoing' : ''}`}
                                        key={index}>
                                        <div className="v-stepper">
                                            <div className="circle" />
                                            <div className="line" />
                                        </div>
                                        <div className="content container-fluid pr-0 pl-0">
                                            
                                                {ongoingContentTrigger === 1 && (
                                                    <div className='ongoing-continue-reminder'><Icon icon='ICON_MAP_PIN'/>You're here! Continue your progress.</div>
                                                )}
                                            <AssessmentCard
                                                id={obj.id}
                                                title={obj.title}
                                                questions={obj.questions ? obj.questions : null}
                                                contentTime={obj.contentTime}
                                                review={obj.completed}
                                                score={68}
                                                locked={obj.locked}
                                                walkthroughTrigger={this.props.parentDiv === 'dashboard' ? true : false}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                        <div
                                            className={`step${obj.completed ? ' completed' : ''}${ongoingContentTrigger > 0 ? ' ongoing' : ''}`}
                                            key={index}>
                                            <div className="v-stepper">
                                                <div className="circle" />
                                                <div className="line" />
                                            </div>
                                            <div className="content container-fluid pr-0 pl-0">
                                                
                                                {ongoingContentTrigger === 1 && (
                                                    <div className='ongoing-continue-reminder'><Icon icon='ICON_MAP_PIN'/>You're here! Continue your progress.</div>
                                                )}
                                                <ContentCard
                                                    id={obj.id}
                                                    title={obj.title}
                                                    contentTime={obj.contentTime}
                                                    imageUrl={obj.imageUrl}
                                                    link={obj.link}
                                                    description={obj.description}
                                                    stage={obj.stage}
                                                    locked={obj.locked}
                                                    completed={obj.completed}
                                                    ongoing_content={ongoingContentTrigger === 1}
                                                    contentType={obj.contentType}
                                                    userActivityHandler={obj.userActivityHandler}
                                                    bookmark={obj.bookmark}
                                                    onBookmark={obj.onBookmark}
                                                    walkthroughTrigger={this.props.parentDiv === 'dashboard' && index === 0 ? true : false}
                                                />
                                            </div>
                                        </div>
                                    )
                            )
                        })}

                    </div>
                </div>
            </div>
        )
    }
}

VerticalStepper.propTypes = {
    level: PropTypes.string,
    levelName: PropTypes.string,
    data: PropTypes.array.isRequired,
}

export default VerticalStepper