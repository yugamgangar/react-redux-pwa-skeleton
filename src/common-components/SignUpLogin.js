import React, { Component, createRef } from 'react'
import { Link, BrowserRouter as Router } from 'react-router-dom'
import Icon from '../utils/icon'
import { vector_signupCorousel } from '../utils/images'
// import 'react-responsive-carousel/lib/styles/carousel.min.css'
// import { Carousel } from 'react-responsive-carousel'

class SignUpLogin extends Component {
  signupEmail = createRef(null)
  signupPassword = createRef(null)

  constructor(props) {
    super(props)

    this.state = {
      loginViaEmail: false,
      signupViaEmail: false,
      loginTabActive: true,
      __renderEmailError: false,
      __renderPasswordError: false,
      loginTabClass: 'tab-head-text active',
      signupTabClass: 'tab-head-text'
    }
  }

  closeModal = () => {
    this.props.closeModal(false)
  }

  setTabView = async () => {
    await this.setState({ loginTabActive: !this.state.loginTabActive })
    if (this.state.loginTabActive === true) {
      this.setState({
        loginTabClass: 'tab-head-text active',
        signupTabClass: 'tab-head-text'
      })
      this.setState({ signupViaEmail: false })
    } else {
      this.setState({
        loginTabClass: 'tab-head-text',
        signupTabClass: 'tab-head-text active'
      })
      this.setState({ loginViaEmail: false })
    }
  }

  setLoginViaEmailState = async () => {
    this.setState({ loginViaEmail: !this.state.loginViaEmail })
  }
  setSignupViaEmailState = async () => {
    this.setState({ signupViaEmail: !this.state.signupViaEmail })
  }

  validateInputValues = event => {
    event.preventDefault()
    // eslint-disable-next-line
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordReg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    if (
      this.signupEmail.current.value.length < 12 ||
      emailReg.test(this.signupEmail.current.value) === false
    ) {
      this.setState({ __renderEmailError: true })
    } else
      this.setState({
        __renderEmailError: false
      })
    if (
      this.signupPassword.current.value.length < 8 ||
      passwordReg.test(this.signupPassword.current.value) === false
    ) {
      this.setState({
        __renderPasswordError: true
      })
    } else
      this.setState({
        __renderPasswordError: false
      })
  }

  render() {
    return (
      <div>
        {this.props.show && (
          <div className='modal-parent-component'>
            <Router>
              <div className='modal-component row'>
                <div className='signup-container col-lg-6 col-md-12 col-sm-12'>
                  {/* SIGN UP CONTENT DIV */}
                  <div className='signup-content-div col-lg-8'>
                    <div className='icon-header-div'>
                      <Icon icon='ICON_CAREER_NINJA' className='signup-logo' />
                      <h3>Welcome to CareerNinja!</h3>
                    </div>
                    <div>
                      {/* SIGNUP LOGIN TAB HEAD */}
                      <div className='tab-head'>
                        <div
                          className={this.state.loginTabClass}
                          onClick={this.setTabView}>
                          Log In
                        </div>
                        <div
                          className={this.state.signupTabClass}
                          onClick={this.setTabView}>
                          Sign Up
                        </div>
                      </div>

                      {/* SIGNUP TAB BODY */}
                      <div className='d-flex flex-column signup-tab-body'>
                        {this.state.loginTabActive && (
                          <div className='tab-body-text'>
                            Login with your registered account to access your
                            learning pathway, view job updates and more.
                          </div>
                        )}
                        {!this.state.loginTabActive && (
                          <div className='tab-body-text'>
                            Sign up with these quick options and get started
                            building the skills you need to get the career you
                            want.
                          </div>
                        )}
                        <div className='login-signup-social-platforms-div'>
                          {this.state.loginTabActive && (
                            <div>Login via social platforms </div>
                          )}
                          {!this.state.loginTabActive && (
                            <div>Sign up via social platforms </div>
                          )}
                          <div className='login-signup-social-icons'>
                            <Icon icon='ICON_FACEBOOK_WHITE' />
                            <Icon icon='ICON_LINKEDIN_WHITE' />
                            <Icon icon='ICON_GOOGLE_WHITE' />
                          </div>
                        </div>

                        <div className='or-with-side-lines'>OR</div>
                        {this.state.loginTabActive &&
                          this.state.loginViaEmail === false && (
                            <button
                              className='btn-outline'
                              onClick={this.setLoginViaEmailState}>
                              Login Using Email
                            </button>
                          )}
                        {!this.state.loginTabActive &&
                          this.state.signupViaEmail === false && (
                            <button
                              className='btn-outline'
                              onClick={this.setSignupViaEmailState}>
                              Sign Up Using Email
                            </button>
                          )}

                        {this.state.signupViaEmail &&
                          !this.state.loginViaEmail && (
                            // SIGN UP FORM START
                            <div className='signup-via-email-form'>
                              <p className='signup-via-email-head'>
                                Sign Up Via Email
                              </p>
                              <form>
                                <div className='email-input'>
                                  <div className='form-label'>
                                    Email Address
                                  </div>
                                  <input
                                    type='text'
                                    className='input'
                                    placeholder='Your primary address'
                                    ref={this.signupEmail}
                                  />
                                  {this.state.__renderEmailError && (
                                    <p className='invalid-email-error error-message-sm'>
                                      Please enter a valid email address.
                                      (example@email.com)
                                    </p>
                                  )}
                                </div>
                                <div className='password-input'>
                                  <div className='form-label'>
                                    Create a password
                                  </div>
                                  <input
                                    type='password'
                                    className='input'
                                    placeholder='Must be 8 digits or more'
                                    ref={this.signupPassword}
                                  />
                                  {this.state.__renderPasswordError && (
                                    <p className='invalid-password-error error-message-sm'>
                                      Please enter a valid password. (Password
                                      must contain atleast a letter, a number
                                      and a special character)
                                    </p>
                                  )}
                                </div>
                                <br />
                                <div className='checkbox-input'>
                                  <input
                                    type='checkbox'
                                    name='terms'
                                    value='terms checked'
                                    className='checkbox'
                                  />
                                  <span>
                                    By signing up, you agree to CareerNinja’s
                                    Privacy Policy and Terms and Conditions
                                  </span>
                                </div>
                                <br />
                                <button
                                  className='btn-fill'
                                  onClick={e => this.validateInputValues(e)}>
                                  Sign Up
                                </button>
                              </form>
                            </div>
                          )
                          // SIGN UP FORM END
                        }

                        {this.state.loginViaEmail &&
                          this.state.signupViaEmail === false && (
                            // LOGIN FORM START
                            <div className='signup-via-email-form'>
                              <p className='signup-via-email-head'>
                                Login Via Email
                              </p>
                              <form>
                                <div className='email-input'>
                                  <div className='form-label'>
                                    Email Address
                                  </div>
                                  <input
                                    type='text'
                                    className='input'
                                    placeholder='Your primary address'
                                  />
                                  <Link href='' className='forgot-link'>
                                    Forgot email address?
                                  </Link>
                                </div>
                                <div className='password-input'>
                                  <div className='form-label'>
                                    Create a password
                                  </div>
                                  <input
                                    type='password'
                                    className='input'
                                    placeholder='Must be 8 digits or more'
                                  />
                                  <Link href='' className='forgot-link'>
                                    Forgot password?
                                  </Link>
                                </div>
                                <br />
                                <div className='checkbox-input'>
                                  <input
                                    type='checkbox'
                                    name='terms'
                                    value='terms checked'
                                    className='checkbox'
                                  />
                                  <span>Remember me next time</span>
                                </div>
                                <br />
                                <button className='btn-fill login-btn'>
                                  Log In
                                </button>
                              </form>
                            </div>
                          )
                          // LOGIN FORM END
                        }
                      </div>
                    </div>
                  </div>
                </div>

                <div className='signup-image-container col-lg-6 col-sm-12'>
                  <Icon
                    icon='VECTOR_SIGNUP_RIGHT'
                    className='signup-bg-vector'
                  />
                  <Icon
                    icon='VECTOR_SIGNUP_DOTS'
                    className='signup-bg-dots-vector-1'
                  />
                  <Icon
                    icon='VECTOR_SIGNUP_DOTS'
                    className='signup-bg-dots-vector-2'
                  />
                  {/* <Carousel
                  autoPlay
                  interval={4000}
                  showStatus={false}
                  showThumbs={false}
                  stopOnHover
                  swipeable
                  showArrows={false}>
                  <div> */}
                  <img
                    src={vector_signupCorousel}
                    alt=''
                  />
                  <h3>Pick a career goal</h3>
                  <p>
                    We help you achieve your career goal by personalizing your
                    learning experience.
                  </p>
                  {/* </div>
                </Carousel> */}
                  <Icon
                    icon='ICON_CAREER_NINJA_WHITE'
                    className='signup-mobile-logo'
                  />
                  <div onClick={this.closeModal}>
                    <Icon
                      icon='ICON_CIRCULAR_CLOSE'
                      className='icon-circular-close'
                    />
                  </div>
                </div>
              </div>
            </Router>
          </div>
        )}
      </div>
    )
  }
}

export default SignUpLogin
