import React, { Component } from 'react'
import 'styles/common-components/learning-path-stepper.scss'
import { connect } from 'react-redux'
import { userActivityDetails, getStageDetails, getModuleName } from 'redux/actions/dashboard'
import Icon from 'utils/icon'
import Routes from 'config/routes'
import { Link } from 'react-router-dom'

let jsxData = null

class LearningpathStepper extends Component {

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.currentTopic?._id !== this.props.currentTopic?._id
  // }

  componentDidMount() {
    this.generateStepperData()
    // this.getStepperData()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentTopic !== this.props.currentTopic) {
      this.generateStepperData()
    }
  }

  generateStepperData() {
    const allLevels = []
    // Collecting all levels data according to user learning path
    this.props.syllabus.length > 0 && this.props.syllabus.forEach(phase => {
      phase.children.length > 0 && phase.children.forEach(mod => {
        mod.children.forEach(lev => {
          lev['parentName'] = mod.name
          allLevels.push(lev)
        })
      })
    })
    const data = this.orderLevelsArray(this.props.userLearningPath, allLevels)

    // Mapping collected data into JSX
    let levelCount = 0
    jsxData = data.map((level, index) => {
      return (
        <React.Fragment key={index}>
          {index > 0 && data[index - 1].parentName !== level.parentName && (
            <div className='lp-path-module-name'>{level.parentName}</div>
          )}
          {/* SHOWING CONTENT DETAILS OF FIRST 7 OR LESS LEVELS IN SAME MODULE */}
          {(levelCount < 7 && level.is_completed === false) && (
            <React.Fragment key={index}>
              <div className={(index > 0 && data[index - 1].parentName === level.parentName) ? 'not-first step' : 'step'}>
                <div className="v-stepper big">
                  <div className={!level.children[0].unlocked ? 'circle big locked' : 'circle big'}>
                    {!level.children[0].unlocked && (
                      <Icon icon='ICON_LEARNINGPATH_STEPPER_LOCK' />
                    )}
                  </div>
                  <div className={!level.children[0].unlocked ? 'line locked' : 'line'} />
                </div>
                <div className="content container-fluid pr-0 pl-0">
                  <p className='lp-sidebar-level-name'>{level.name}</p>
                </div>
              </div>
              {level.children.map((content, x) => {
                x === 0 && levelCount++
                return (
                  <div
                    className='step'
                    key={x}>
                    <div className="v-stepper">
                      <div className={(!content.unlocked || content.is_completed === false) ? 'circle small locked' : 'circle small'}>
                        {/* <Icon icon='ICON_LEARNINGPATH_STEPPER_SMALL_CIRCLE' /> */}
                      </div>
                      {((index !== data.length - 1 && data[index + 1].parentName !== level.parentName) && x + 1 === level.children.length) ? (<React.Fragment />) :
                        (<div className={(!content.unlocked || content.is_completed === false) ? 'line locked' : 'line'} />)}
                    </div>
                    <div className="content container-fluid pr-0 pl-0">
                      <Link to={`${Routes.CoursesBasePath}/${level._id.split('_')[0]}/${level.parentName}/${Number(level.name.split(' ')[1]) - 1}/level`}
                        style={{ color: '#fff' }}>
                        <p onClick={this.props.lpSidebarToggle} className='lp-sidebar-content-title'>{content.name.toProperCase()}</p>
                      </Link>
                    </div>
                  </div>
                )
              })
              }
            </React.Fragment>
          )}
        </React.Fragment>
      )
    })

  }

  orderLevelsArray(array_with_order, array_to_order) {
    let ordered_array = [],
      len = array_to_order.length,
      len_copy = len,
      index, current;

    for (; len--;) {
      current = array_to_order[len];
      if (current._id === 'Discovery_Module1_Level1_Digital_Marketing')
        index = array_with_order.indexOf('Discovery_Digital_Marketing');
      else
        index = array_with_order.indexOf(current._id);
      ordered_array[index] = current;
    }
    return ordered_array
  }

  getStepperData = () => {
    let levelCount = 1
    let data = []
    let phaseData = this.props.currentStageIndex.length > 0 ? this.props.syllabus[this.props.currentStageIndex[0]] : null
    data = phaseData && phaseData.children.map((module, indexx) => {
      return (
        <React.Fragment key={indexx}>
          <div className='lp-path-module-name'>{module.name}</div>

          {/* SHOWING CONTENT DETAILS OF FIRST 7 OR LESS LEVELS IN SAME MODULE */}
          {levelCount === 1 ? (
            indexx === this.props.currentStageIndex[1] && module.children.map((level, i) => {
              if (levelCount < 8) {
                levelCount++
                return (
                  <React.Fragment key={i}>
                    <div className={i > 0 ? 'not-first step' : 'step'}>
                      <div className="v-stepper big">
                        <div className={!level.children[0].unlocked ? 'circle big locked' : 'circle big'}>
                          {!level.children[0].unlocked && (
                            <Icon icon='ICON_LEARNINGPATH_STEPPER_LOCK' />
                          )}
                        </div>
                        <div className={!level.children[0].unlocked ? 'line locked' : 'line'} />
                      </div>
                      <div className="content container-fluid pr-0 pl-0">
                        <p className='lp-sidebar-level-name'>{level.name}</p>
                      </div>
                    </div>
                    {levelCount - 1 === 1 ? (
                      i === this.props.currentStageIndex[2] && level.children.map((content, index) => {
                        return (
                          <div
                            className='step'
                            key={index}>
                            <div className="v-stepper">
                              <div className={(!content.unlocked || content.is_completed === false) ? 'circle small locked' : 'circle small'}>
                                {/* <Icon icon='ICON_LEARNINGPATH_STEPPER_SMALL_CIRCLE' /> */}
                              </div>
                              {(module.children.length === i + 1 && index + 1 === level.children.length) ? (<React.Fragment />) : (<div className={(!content.unlocked || content.is_completed === false) ? 'line locked' : 'line'} />)}
                            </div>
                            <div className="content container-fluid pr-0 pl-0">
                              <p className='lp-sidebar-content-title'>{content.name.toProperCase()}</p>
                            </div>
                          </div>
                        )
                      })
                    ) : (
                        level.children.map((content, index) => {
                          return (
                            <div
                              className='step'
                              key={index}>
                              <div className="v-stepper">
                                <div className={!content.unlocked ? 'circle small locked' : 'circle small'}>
                                  {/* <Icon icon='ICON_LEARNINGPATH_STEPPER_SMALL_CIRCLE' /> */}
                                </div>
                                {(module.children.length === i + 1 && index + 1 === level.children.length) ? (<React.Fragment />) : (<div className={!content.unlocked ? 'line locked' : 'line'} />)}
                              </div>
                              <div className="content container-fluid pr-0 pl-0">
                                <p className='lp-sidebar-content-title'>{content.name.toProperCase()}</p>
                              </div>
                            </div>
                          )
                        })
                      )}
                  </React.Fragment>
                )
              } else return
            })
          ) : (
              module.children.map((level, i) => {
                if (levelCount < 8) {
                  levelCount++
                  return (
                    <React.Fragment key={i}>
                      <div className={i > 0 ? 'not-first step' : 'step'}>
                        <div className="v-stepper big">
                          <div className={!level.children[0].unlocked ? 'circle big locked' : 'circle big'}>
                            {!level.children[0].unlocked && (
                              <Icon icon='ICON_LEARNINGPATH_STEPPER_LOCK' />
                            )}
                          </div>
                          <div className={!level.children[0].unlocked ? 'line locked' : 'line'} />
                        </div>
                        <div className="content container-fluid pr-0 pl-0">
                          <p className='lp-sidebar-level-name'>{level.name}</p>
                        </div>
                      </div>
                      {level.children.map((content, index) => {
                        return (
                          <div
                            className='step'
                            key={index}>
                            <div className="v-stepper">
                              <div className={!content.unlocked ? 'circle small locked' : 'circle small'}>
                                {/* <Icon icon='ICON_LEARNINGPATH_STEPPER_SMALL_CIRCLE' /> */}
                              </div>
                              {(module.children.length === i + 1 && index + 1 === level.children.length) ? (<React.Fragment />) : (<div className={!content.unlocked ? 'line locked' : 'line'} />)}
                            </div>
                            <div className="content container-fluid pr-0 pl-0">
                              <p className='lp-sidebar-content-title'>{content.name.toProperCase()}</p>
                            </div>
                          </div>
                        )
                      })
                      }
                    </React.Fragment>
                  )
                } else return
              })
            )}
        </React.Fragment>
      )
    })
    jsxData = data
  }

  render() {
    return (
      <div className="phases-vertical-stepper-container mb-90 dashboard-stepper" id='learning-path-stepper'>
        <div className="vertical-stepper-mobile-pd">
          <div className="vertical-step-container">
            {jsxData}
          </div>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    syllabus: ownProps.data,
    currentModuleId: `${state.profile?.progressStatus?.phase}_${state.profile?.progressStatus?.module}_${state.profile?.progressStatus?.goal}`,
    currentPhaseId: `${state.profile?.progressStatus?.phase}_${state.profile?.progressStatus?.goal}`,
    currentStageIndex: state.dashboard?.currentStageIndex ? state.dashboard?.currentStageIndex : [],
    userLearningPath: ownProps.userLearningPath,
    currentTopic: state.dashboard.stageData ? state.dashboard.stageData?.dashboard[0] : null,
  }
}

export default connect(
  mapStateToProps,
  { userActivityDetails, getStageDetails, getModuleName }
)(LearningpathStepper)
