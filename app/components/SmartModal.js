import React from 'react';
import PropTypes from 'prop-types';
import ModalDialog, { ModalFooter } from '@atlaskit/modal-dialog';
import Button, { ButtonGroup } from '@atlaskit/button';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import { colors } from '@atlaskit/theme';
import InlineDialog from '@atlaskit/inline-dialog';
import styled from 'styled-components';
import Avatar from '@atlaskit/avatar';


const Hint = styled.span`
  align-items: center;
  color: ${colors.subtleText};
  cursor: help;
  display: flex;
`;
const HintText = styled.span`
  margin-left: 1em;
`;
const Header = ({ onClose }) => (
    <span style={{ position: 'absolute', right: 0, top: 4 }}>
      <Button onClick={onClose} appearance="link">
        <CrossIcon
          label="Close Modal"
          primaryColor={colors.R400}
          size="small"
        />
      </Button>
    </span>
);

class SmartModal extends React.Component {

  static propTypes = {
    key: PropTypes.string,
    actions: PropTypes.array,
    onClose: PropTypes.func,
    width: PropTypes.string
  }
  static defaultProps = {
    actions: [],
    width: "medium",
  }
  render() {
    const actions = [
      ...(this.props.actions),
      { text: 'Cancel', onClick: this.props.onClose },
    ];
    const modal = (
      <div style={{ padding: 16 }}>
          <ModalDialog
            key={this.props.key}
            actions={actions}
            heading={this.props.heading}
            onClose={this.close}
            width={this.props.width}
          >
            {this.props.children}
          </ModalDialog>
      </div>
    );

    return modal;
  }
}

export default SmartModal;
