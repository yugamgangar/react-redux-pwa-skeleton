import React, { Component } from 'react'

const SidebarMenu = props => {
    return (
        <div id='sidebar' className='side-menu' ref={this.sidebar}>
            <div id='sidenavContainer' ref={this.sidemenuContainer} />
            <div className='closebtn' onClick={() => this.closeNav('sideMenu')}>
                &times;
            </div>
            <Link to='' onClick={this.closeNav} className='sidenav-link settings'>
                <Icon icon='ICON_NAV_PROFILE' />
              Settings
            </Link>
            <Link to='' onClick={this.closeNav} className='sidenav-link'>
                <Icon icon='ICON_NAV_PROFILE' />
              Notifications
            </Link>
            <Link to='' onClick={this.closeNav} className='sidenav-link'>
                <Icon icon='ICON_NAV_PROFILE' />
              My Learning Pace
            </Link>
            <Link to='' onClick={this.closeNav} className='sidenav-link'>
                <Icon icon='ICON_NAV_PROFILE' />
              Pathway Builder
            </Link>
            <Link to='' onClick={this.closeNav} className='sidenav-link'>
                <Icon icon='ICON_NAV_PROFILE' />
              Help Centre
            </Link>
            <Link
                to=''
                onClick={this.closeNav}
                className='sidenav-link contact'>
                Contact Us
            </Link>
            <Link to='' onClick={this.closeNav} className='sidenav-link logout'>
                Logout
            </Link>
            <div className='side-menu-careerninja' onClick={this.closeNav}>
                careerninja
            </div>
            <Icon
                icon='VECTOR_SIDEBAR_LOGO'
                className='side-menu-logo-vector'
            />
        </div>
    )
}

export default SidebarMenu
