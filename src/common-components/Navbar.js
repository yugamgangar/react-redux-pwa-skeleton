import React, { Component } from 'react'
import Icon from 'utils/icon'
import Routes from 'config/routes'
import { TabletMobile, Desktop } from 'utils/media-query'
import { Link, NavLink } from 'react-router-dom'
import LearningpathStepper from './learningpath-stepper'
import { Progress } from 'reactstrap';
import { logout } from 'redux/actions/authentication';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {
  callMajorMinorModal, showAchieveModal, upgradeValidity, callFriendReferralModal
} from 'redux/actions/dashboard';
import Tooltip from 'react-tooltip-lite';
import { REACT_APP_URL } from '../config/config'
import { icon_hourGlass, avatar, icon_workReadiness } from '../utils/images'
import moment from 'moment'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lpSidebarToggle: false,
      sidemenuToggle: false,
      currentPoints: null,
      hours: 0,
      minutes: 0,
      // toggle: false
    }
  }

  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      (this.props.currentPhase.name === 'Learning' &&
        prevProps.currentPhase.name === 'Discovery')
    ) {
      this.props.callMajorMinorModal(true);
    } else if (
      (this.props.currentPhase.name === 'Achieve' &&
        prevProps.currentPhase.name === 'Learning')
    ) {
      this.props.showAchieveModal(true);
      this.props.upgradeValidity()
    }
    window.addEventListener('load', this.handleLoad);

    if (this.props.tourState.renderTour === true && (prevProps.tourState.lpDrawer !== this.props.tourState.lpDrawer))
      this.setState({ lpSidebarToggle: this.props.tourState.lpDrawer })

    if (this.props.tourState.renderTour === true && (prevProps.tourState.sideDrawer !== this.props.tourState.sideDrawer))
      this.setState({ sidemenuToggle: this.props.tourState.sideDrawer })

    return null;
  }

  handleLoad = () => {
    let initialX = null,
      initialY = null,
      touchsurface = document.getElementById('dashboardContainerId')


    touchsurface.addEventListener('touchstart', function (e) {
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;
    })

    touchsurface.addEventListener('touchmove', function (e) {
      if (initialX === null) {
        return;
      }
      if (initialY === null) {
        return;
      }
      let currentX = e.touches[0].clientX;
      let currentY = e.touches[0].clientY;

      let diffX = initialX - currentX;
      let diffY = initialY - currentY;
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 10) {
          // console.log("swiped left");
          // openSideBar(false)
          this.setState({ sidemenuToggle: true, lpSidebarToggle: false })
          // this.props.showLearningPathwayDrawer(false)
        } else if (diffY > -10) {
          // console.log("swiped right");
          // openSideBar(true)
          // this.props.showLearningPathwayDrawer(true)
          this.setState({ lpSidebarToggle: true, sidemenuToggle: false })
        }
      }
      // UP AND DOWN SWIPE 
      // else {
      //   // sliding vertically
      //   if (diffY > 0) {
      //     // swiped up
      //     console.log("swiped up");
      //   } else {
      //     // swiped down
      //     console.log("swiped down");
      //   }
      // }

      initialX = null;
      initialY = null;

      e.preventDefault();
    }.bind(this))
  }

  openSideBar = (check) => {
    // this.props.showLearningPathwayDrawer(check)
    this.setState({
      lpSidebarToggle: !this.state.lpSidebarToggle,
      sidemenuToggle: false
    })

  }

  componentWillMount() {
    this.props.callMajorMinorModal(false);
    this.props.showAchieveModal(false)
    setTimeout(() => {
      // if (this.props.profileId === null) this.props.logout();
      if (this.props.currentPhase.name === 'Learning' && (this.props.userMajor && this.props.userMajor.length) === 0 && this.props.userMinor.length === 0)
        this.props.callMajorMinorModal(true)
      if (this.props.currentPhase.name === 'Achieve' && this.props.userKind == null) {
        this.props.showAchieveModal(true)
      }
    }, 1000)
  }

  getTxt() {
    if (!this.props.paid) {
      return "Upgrade To Premium"
    }
    else {
      if (this.props.paidScheme == "Placement") {
        return "Maverick"
      }
      else {
        return "Upgrade Plan"
      }
    }
  }

  logoutHandler = () => {
    this.props.logout(() => this.props.history.push(Routes.Login));
  };

  startGuide = () => {
    this.props.history.push(Routes.DashboardHome);
    this.props.guideStartCallback();
  };

  checkTimeLeft = () => {
    let time;
    this.props.stageData.map((stage) => {
      if (stage.is_completed === false && stage.total !== 0) {
        time = Math.round((1 - (stage.completed / stage.total)) * (stage.contentTime))
      }
    })
    if (time === undefined || time === null) {
      return '?'
    }
    else {
      if (this.props.avgTime !== undefined && this.props.avgTime !== 0) {
        if (this.props.avgTime !== null) {
          let daysLeft = time / this.props.avgTime;
          return Math.round(daysLeft)
        }
        else {
          let daysLeft = time / 10;
          return Math.round(daysLeft)
        }
      }
      else {
        return '?'
      }
    }
  }

  getTimeLeft = () => {
    if (this.props.freeDaysLeft === 1) {
      const hours = moment.duration(moment(this.props.endDate).diff(moment(new Date())))
      const duration = Math.ceil(hours.asHours())
      return <span className="navbar-hours-left">{duration}H</span>
    }
    if (this.props.freeDaysLeft > 5000) {
      return '∞';
    }
    else if (this.props.freeDaysLeft <= 0) {
      return '-'
    }
    else
      return this.props.freeDaysLeft
  }

  referFriends = () => {
    this.props.callFriendReferralModal(true)
  }

  lpSidebarToggle = () => this.setState({ lpSidebarToggle: false })

  render() {
    const { open } = this.state
    return (
      <React.Fragment>
        {/* GUEST NAVBAR */}
        {!this.props.userLoggedIn ? (
          <div id='navbar'>
            <div className='guest-header-container'>
              <Link to={Routes.DashboardHome} style={{ display: 'contents' }}><Icon className='logo' icon='ICON_CAREER_NINJA_WHITE' /></Link>
            </div>
          </div>
        ) : (
            // APP NAVBAR
            <div id='navbar'>
              <div className={this.props.checkPricePopup ? 'header-container mt-40' : 'header-container'}>
                <div data-tut='reactour-navbar-learningpath' style={{ cursor: 'pointer' }} onClick={() => this.setState({ lpSidebarToggle: true })}>
                  {/* <div style={{ cursor: 'pointer' }} onClick={() => this.props.showLearningPathwayDrawer(true)}> */}
                  <Icon className='learning-path' icon='ICON_LEARNING_PATH' />
                </div>
                <ul className='header-pages-ul'>
                  <li>
                    <NavLink
                      to={Routes.DashboardHome}
                      activeClassName='active'
                    >
                      <div className='pill'>
                        <Icon icon='ICON_NAV_DASHBOARD' />
                        <span>Dashboard</span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={this.props.tourState.renderTour ? `${Routes.CoursesBasePath}/1` : Routes.CoursesBasePath}
                      activeClassName='active'
                      data-tut="reactour-navbar-syllabus"
                    >
                      <div className='pill'>
                        <Icon icon='ICON_NAV_LEARNING' />
                        <span>Learning</span>
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={Routes.Jobs}
                      activeClassName='active'
                    >
                      <div className='pill'>
                        <Icon icon='ICON_NAV_JOBS' />
                        <span>Jobs</span>
                      </div>
                    </NavLink>
                  </li>
                  <TabletMobile>
                    <li>
                      <NavLink
                        to={Routes.MyActivity}
                        activeClassName='active'
                      >
                        <div className='pill'>
                          <Icon icon='ICON_NAV_PROFILE' />
                          <span>Profile</span>
                        </div>
                      </NavLink>
                    </li>
                  </TabletMobile>
                </ul>

                <Icon className='logo' icon='ICON_CAREER_NINJA_WHITE' />


                <Desktop>

                  <NavLink to={Routes.PricingPage} className='header-pricing-btn-div' activeClassName='header-pricing-btn-div'>
                    <button
                      className={(this.props.paid && this.props.paidScheme == "Placement") ? "header-pricing-btn goldColor" : "header-pricing-btn"}>
                      {this.getTxt()}
                    </button>
                  </NavLink>

                  <ul className='header-gamification-ul'>
                    <li data-tut='reactour-navbar-locktimer'>
                      <Tooltip content="Days Until Course Expiry">
                        <img style={{ width: '30px' }} src={icon_hourGlass} alt="" />
                      </Tooltip>
                      <div className='current-points'>
                        {this.props.freeDaysLeft ? this.getTimeLeft() : 0}
                      </div>
                    </li>
                    <li data-tut="reactour-navbar-points">
                      <Tooltip content="Points gained">
                        <Icon className="icon-badge" icon="ICON_BADGE_TWO" />
                      </Tooltip>
                      <TransitionGroup>
                        <CSSTransition
                          timeout={500}
                          key={this.props.currentPoints}
                          classNames="messageout"
                        >
                          <div className="current-points">
                            {this.props.currentPoints}
                          </div>
                        </CSSTransition>
                      </TransitionGroup>
                    </li>
                    <li data-tut="reactour-navbar-streaks">
                      <Tooltip content="Days Streak">
                        <Icon className="icon-badge header-streak-icon" icon="ICON_STREAK_FLAME_ORANGE" />
                      </Tooltip>
                      <div className="current-points">
                        {this.props.currentStreak}
                      </div>
                    </li>
                    <li>
                      {
                        this.props.userProgress === "Discovery" ? (
                          < Tooltip content="Days To Start Learning Stage" >
                            <img src={icon_workReadiness} alt="" className="icon-badge" />
                          </Tooltip>
                        ) : (
                            <Tooltip content="Days to work readiness at current speed">
                              <img src={icon_workReadiness} alt="" className="icon-badge" />
                            </Tooltip>
                          )
                      }
                      <div className="current-points">
                        {this.checkTimeLeft(this.props?.avgTime)}
                      </div>
                    </li>
                  </ul>

                  <div className='hamburger-div' onClick={() => this.setState({ sidemenuToggle: true })}>
                    {/* <Icon
              className='navbar-hamburger-icon'
              icon='ICON_NAV_HAMBURGER'
            /> */}
                    <img
                      src={this.props.profilePicture}
                      alt="profile-image"
                      className="profile-image-style"
                    />
                  </div>

                </Desktop>

              </div>

              {/* HEADER PROGRESS BAR DIV - DESKTOP */}
              <Desktop>
                <div className={this.props.checkPricePopup ? 'header-progress-container pricepopupOn' : 'header-progress-container'}>

                  <div
                    className="col-lg-4 col-12 d-flex align-items-center justify-content-center"
                    data-tut="reactour-courses-phase"
                  >
                    <Link to={Routes.CoursesBasePath}>
                      <span className="text-truncate">
                        {this.props.currentPhase.name}
                      </span>
                      <Progress
                        value={this.props.phaseProgress}
                        className="header-progress-bar"
                        barClassName="progress-color"
                      >
                        {this.props.phaseProgress}%
								      </Progress>
                    </Link>
                  </div>

                  <div
                    className="col-lg-4 col-12 d-flex align-items-center justify-content-center"
                    data-tut="reactour-courses-module-circle"
                  >
                    <Link to={Routes.CoursesBasePath}>
                      <span className="text-truncate">
                        {this.props.currentModule.name}
                      </span>
                      <Progress
                        value={this.props.moduleProgress}
                        className="header-progress-bar"
                        barClassName="progress-color"
                      >
                        {this.props.moduleProgress}%
								      </Progress>
                    </Link>
                  </div>

                  <div
                    className="col-lg-4 col-12 d-flex align-items-center justify-content-center"
                    data-tut="reactour-courses-levels"
                  >
                    <Link to={`${Routes.CoursesBasePath}/${this.props.currentPhase.name}/${this.props.currentModule.name}/${this.props.currentStageIndex[2]}/level`}>
                      <span className="text-truncate">
                        {this.props.currentLevel.name}
                      </span>
                      <Progress
                        value={this.props.levelProgress}
                        className="header-progress-bar"
                        barClassName="progress-color"
                      >
                        {this.props.levelProgress}%
								  </Progress>
                    </Link>
                  </div>
                </div>
              </Desktop>


              {/* HEADER PROGRESS BAR DIV - TABLET & MOBILE */}
              <TabletMobile>
                <div className={this.props.checkPricePopup ? 'mobile-header-progress-container pricepopupOn' : 'mobile-header-progress-container'}>

                  {(REACT_APP_URL + Routes.DashboardHome !== window.location.href) && (
                    <div
                      className="col-6 d-flex align-items-center justify-content-center sm-flex-column"
                      data-tut="reactour-courses-phase"
                    >
                      <span className="text-truncate">
                        {this.props.currentPhase.name}
                      </span>
                      <Progress
                        value={this.props.phaseProgress}
                        className="header-progress-bar"
                        barClassName="progress-color"
                      />
                    </div>
                  )}
                  <div
                    className="col-6 d-flex align-items-center justify-content-center sm-flex-column"
                    data-tut="reactour-courses-module-circle"
                  >
                    <span className="text-truncate">
                      {this.props.currentModule.name}
                    </span>
                    <Progress
                      value={this.props.moduleProgress}
                      className="header-progress-bar"
                      barClassName="progress-color"
                    />
                  </div>

                  {(REACT_APP_URL + Routes.DashboardHome === window.location.href) && (
                    <div
                      className="col-6 d-flex align-items-center justify-content-center sm-flex-column"
                      data-tut="reactour-courses-levels"
                    >
                      <span className="text-truncate">
                        {this.props.currentLevel.name}
                      </span>
                      <Progress
                        value={this.props.levelProgress}
                        className="header-progress-bar"
                        barClassName="progress-color"
                      />
                    </div>
                  )}
                </div>
              </TabletMobile>

              {/* SIDE MENU START */}
              <div id='sidebar' className={this.state.sidemenuToggle === true ? 'side-menu open' : 'side-menu'}>
                <div className='closebtn' onClick={() => this.setState({ sidemenuToggle: false })}>
                  &times;
            </div>

                <TabletMobile>
                  <NavLink to={Routes.PricingPage} className='header-pricing-btn-div' activeClassName='header-pricing-btn-div'>
                    <button
                      className={(this.props.paid && this.props.paidScheme == "Placement") ? "header-pricing-btn goldColor" : "header-pricing-btn"}>
                      {this.getTxt()}
                    </button>
                  </NavLink>
                  <ul className='header-gamification-ul'>
                    <li data-tut="mob-reactour-navbar-locktimer">
                      <Tooltip content="Days Until Course Expiry">
                        <img style={{ width: '30px' }} src={icon_hourGlass} alt="" />
                      </Tooltip>
                      <div className='current-points'>
                        {this.props.freeDaysLeft ? this.getTimeLeft() : 0}
                      </div>
                    </li>
                    <li data-tut="mob-reactour-navbar-points">
                      <Tooltip content="Points gained">
                        <Icon className="icon-badge" icon="ICON_BADGE_TWO" />
                      </Tooltip>
                      <TransitionGroup>
                        <CSSTransition
                          timeout={500}
                          key={this.props.currentPoints}
                          classNames="messageout"
                        >
                          <div className="current-points">
                            {this.props.currentPoints}
                          </div>
                        </CSSTransition>
                      </TransitionGroup>
                    </li>
                    <li data-tut="mob-reactour-navbar-streaks">
                      <Tooltip content="Days Streak">
                        <Icon className="icon-badge header-streak-icon" icon="ICON_STREAK_FLAME_ORANGE" />
                      </Tooltip>
                      <div className="current-points">
                        {this.props.currentStreak}
                      </div>
                    </li>
                    <li>
                      {
                        this.props.userProgress === "Discovery" ? (
                          <Tooltip content="Days To Start Learning Stage">
                            <img src={icon_workReadiness} alt="" className="icon-badge" />
                          </Tooltip>
                        ) : (
                            <Tooltip content="Days to work readiness at current speed">
                              <img src={icon_workReadiness} alt="" className="icon-badge" />
                            </Tooltip>
                          )
                      }
                      <div className="current-points">{this.checkTimeLeft(this.props?.avgTime)}</div>
                    </li>
                  </ul>
                </TabletMobile>

                <Desktop>
                  <Link to={Routes.MyActivity} onClick={() => this.setState({ sidemenuToggle: false })} className='sidenav-link'>
                    {/* <Icon icon='ICON_SIDEBAR_NUT' />
              Settings */}
                    <Icon icon='ICON_NAV_PROFILE' className='sidebar-bookmark-icon' />
                    My Profile
            </Link>
                </Desktop>
                <Link to={Routes.Bookmarks} onClick={() => this.setState({ sidemenuToggle: false })} className='sidenav-link'>
                  {/* <Icon icon='ICON_SIDEBAR_NOTIFICATION' />
              Notifications */}
                  <Icon icon='ICON_BOOKMARKED' className='sidebar-bookmark-icon' />
                  Bookmarks
            </Link>
                <div onClick={() => {
                  if (window.innerWidth > 768) {
                    this.setState({ sidemenuToggle: false })
                    this.startGuide()
                  } else { this.startGuide() }
                }}
                  className='sidenav-link'>
                  {/* <Icon icon='ICON_SIDEBAR_SPEED' />
              My Learning Pace */}
                  <Icon icon='ICON_SIDEBAR_NUT' />
                  Start Guide
            </div>
                {/* <Link to='' onClick={() => this.setState({ sidemenuToggle: false })} className='sidenav-link'>
            <Icon icon='ICON_SIDEBAR_WEBNODES' />
              Pathway Builder
            </Link> */}
                {/* <Link to='' onClick={() => this.setState({ sidemenuToggle: false })} className='sidenav-link'>
                  <Icon icon='ICON_SIDEBAR_HELP' />
                  Help Centre
            </Link>
                <Link
                  to=''
                  onClick={() => this.setState({ sidemenuToggle: false })}
                  className='sidenav-link contact'>
                  Contact Us
            </Link> */}
                <Link to=''
                  onClick={() => { this.setState({ sidemenuToggle: false }); this.logoutHandler() }} className='sidenav-link logout'>
                  Logout
            </Link>
                <div className='side-menu-careerninja'>
                  careerninja
            </div>
                <Icon
                  icon='VECTOR_SIDEBAR_LOGO'
                  className='side-menu-logo-vector'
                />
              </div>
              <div className={this.state.sidemenuToggle === true ? 'sidemenu-blank-div open' : 'sidemenu-blank-div'}
                onClick={() => this.setState({ sidemenuToggle: false })} />


              {/* LEARNING PATH SIDEBAR START */}

              <div className={this.state.lpSidebarToggle === true ? 'lp-sidebar open' : 'lp-sidebar'}>
                <div className='lp-sidebar-title'>
                  <Icon icon='ICON_LEARNING_PATH' />
                  Learning Path
            </div>
                <div className='sidebar-stepper-container'>
                  <LearningpathStepper data={this.props.stageData} userLearningPath={this.props.userLearningPath} lpSidebarToggle={this.lpSidebarToggle} />
                </div>
              </div>
              <div
                className={this.state.lpSidebarToggle === true ? 'lp-sidebar-blank-div open' : 'lp-sidebar-blank-div'}
                onClick={() => this.lpSidebarToggle()}
              />

              {/* SIDEBAR  HEADER FOR TABLETS AND MOBILES*/}
              <TabletMobile>
                <div className={this.props.checkPricePopup ? 'mobile-top-header-container pricepopupOn' : 'mobile-top-header-container'}>
                  <div onClick={() => this.openSideBar()} data-tut="mob-reactour-navbar-learningpath">
                    <Icon className='learning-path' icon='ICON_LEARNING_PATH' />
                  </div>
                  <Icon className='logo' icon='ICON_CAREER_NINJA_WHITE' />
                  <div onClick={() => this.setState({ sidemenuToggle: true })}>
                    <Icon
                      className='navbar-hamburger-icon'
                      icon='ICON_NAV_HAMBURGER'
                    />
                  </div>
                </div>
              </TabletMobile>
            </div >
          )}</React.Fragment>
    )
  }
}

function mapStateToProps(state, props) {
  window.addEventListener('load', this.handleLoad);
  let currentPhase = null,
    currentModule = null,
    currentLevel = null,
    phaseProgress = 0,
    moduleProgress = 0,
    levelProgress = 0,
    currentPoints = state.dashboard.currentPoints,
    currentStreak = state.dashboard.currentStreak;
  if (state.dashboard && state.dashboard.stageData && state.dashboard.stageData.syllabus) {
    state.dashboard.stageData.syllabus.some(phase => {
      if (phase.completed !== phase.total) {
        currentPhase = phase;
        return true;
      }
    });
    if (currentPhase && currentPhase.childType === 'MODULE') {
      currentPhase.children.some(level => {
        if (level.completed !== level.total) {
          currentModule = level;
          return true;
        }
      });
    }
    if (currentModule && currentModule.childType === 'LEVEL') {
      currentModule.children.some(level => {
        if (level.completed !== level.total) {
          currentLevel = level;
          return true;
        }
      });
    }
    if (currentPhase)
      phaseProgress = Math.round((currentPhase.completed / currentPhase.total) * 100);
    if (currentModule)
      moduleProgress = Math.round((currentModule.completed / currentModule.total) * 100);
    if (currentLevel)
      levelProgress = Math.round((currentLevel.completed / currentLevel.total) * 100);
    if (currentPhase?.name == "Discovery") {
      levelProgress = null;
      moduleProgress = null;
    }
  }
  return {
    currentPhase: currentPhase ? currentPhase : { name: '' },
    currentModule: currentModule ? currentModule : { name: 'Module 1' },
    currentLevel: currentLevel ? currentLevel : { name: 'Level 1' },
    stageData: state.dashboard?.stageData?.syllabus ? state.dashboard.stageData.syllabus : [],
    phaseProgress: phaseProgress ? phaseProgress : 0,
    moduleProgress: moduleProgress != null ? moduleProgress : phaseProgress,
    levelProgress: levelProgress != null ? levelProgress : phaseProgress,
    profilePicture:
      state.profile.userProfile && state.profile.userProfile.profilePicture != null
        ? state.profile.userProfile.profilePicture
        : avatar,
    currentPoints,
    currentStreak,
    profileId: state.profile._id ? state.profile._id : null,
    avgTime: state.profile ? state.profile.avgTimePerDay : 0,
    freeDaysLeft: state.dashboard?.lockDetails?.daysLeft ? state.dashboard.lockDetails.daysLeft : 0,
    userMajor: state.profile?.userOnboarding?.majorSubGoals ? state.profile?.userOnboarding?.majorSubGoals : [],
    userMinor: state.profile?.userOnboarding?.minorSubGoals ? state.profile?.userOnboarding?.minorSubGoals : [],
    userKind: state.profile?.userOnboarding?.userKind ? state.profile?.userOnboarding?.userKind : null,
    checkPricePopup: state.dashboard.checkPricePopup,
    userProgress: state.profile?.progressStatus?.phase ? state.profile.progressStatus.phase : "",
    // showBtn : (state.profile?.subscription?.Digital_Marketing?.premium?.paid == false ? true : (state.profile?.subscription?.Digital_Marketing?.premium?.paidScheme == "Placement" ? false: true)),
    paid: state.profile?.subscription?.Digital_Marketing?.premium?.paid === true ? true : false,
    paidScheme: (state.profile?.subscription?.Digital_Marketing?.premium?.paid === true ? (state.profile?.subscription?.Digital_Marketing?.premium?.paidScheme) : ""),
    userLoggedIn: state.authentication.token === null ? false : true,
    currentStageIndex: state.dashboard?.currentStageIndex ? state.dashboard?.currentStageIndex : [],
    userLearningPath: state.profile?.path ? state.profile?.path : [],
    tourState: state.dashboard?.tour
    // pathwayDrawer: state.dashboard?.pathwayDrawer ? state.dashboard.pathwayDrawer : false
  };
}

export default connect(
  mapStateToProps,
  { logout, callMajorMinorModal, showAchieveModal, upgradeValidity, callFriendReferralModal }
)(Navbar);
