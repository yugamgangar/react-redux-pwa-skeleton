import React from 'react'
import Responsive from 'react-responsive'
import Constants from '../config/constants'

const Desktop = props => (
    <Responsive {...props} minWidth={Constants.desktop_min} />
)

const Tablet = props => (
    <Responsive
        {...props} minWidth={Constants.tablet_min} maxWidth={Constants.desktop_min}
    />
)

const Mobile = props => (
    <Responsive
        {...props} maxWidth={Constants.mobile_max}
    />
)

const IpadPro = props => (
    <Responsive
        {...props} minWidth='1024px' maxWidth='1024px'
    />
)

const TabletMobile = props => (
    <Responsive {...props} maxWidth={Constants.tablet_mobile_max} />
)

export { Desktop, Tablet, Mobile, TabletMobile, IpadPro }
