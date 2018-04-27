import React from 'react';
import { Extensions } from 'electron';
import { shell } from 'electron';

class ExternalLink extends React.Component {
    onClick = (event) => {
        event.preventDefault();
        shell.openExternal(event.target.href);
    }
    render() {
        const { children, onClick, ...otherProps} = this.props;
        return (
            <a
                {...otherProps}
            >
                {children}
            </a>
        )
    }
}

export default ExternalLink;
