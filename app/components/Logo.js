import React from 'react';
import PropTypes from 'prop-types';

class Logo extends React.Component {
    static propTypes = {
        color: PropTypes.string,
    }
    static defaultProps = {
        color: '#000000'
    }

    render() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={this.props.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
        )
    }
}

export default Logo;
