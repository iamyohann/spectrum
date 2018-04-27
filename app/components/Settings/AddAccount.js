import React from 'react';
import { FieldTextStateless as FieldText } from '@atlaskit/field-text';
import Button from '@atlaskit/button';
import ModalDialog, { ModalFooter } from '@atlaskit/modal-dialog';
import SmartModal from '../SmartModal';
import { ipcRenderer } from 'electron';
import ExternalLink from '../ExternalLink';
import EditorAddIcon from '@atlaskit/icon/glyph/editor/add';
class AddAccountForm extends React.Component {

  static defaultFormData = {
    name: { label: 'Account Name', value: '' },
    accessKeyID: { label: 'Access key ID', value: '' },
    accessKeySecret: { label: 'Secret access key', value: '', type: 'password' },
  };

  constructor() {
    super();
    this.state = {
      formData: {
        ...AddAccountForm.defaultFormData,
      },
      modalIsOpen: false,
    }
  }
  onModalOpen = () => this.setState({ modalIsOpen: true });
  onModalClose = () => this.setState({ modalIsOpen: false });
  updateField = (e, key) => {
    const state = this.state;
    this.setState({
      formData: {
        ...state.formData,
        [key]: {
          ...state.formData[key],
          value: e.target.value,
        }
      }
    })
  }
  addAccount = () => {
    const state = this.state;
    let data = {};
    Object.keys(state.formData).forEach(
      (key) => {
        data = { ...data, [key]: this.state.formData[key].value };
      }
    );

    ipcRenderer.once('account.create.response', () => {
      this.setState({
        modalIsOpen: false,
      });
    });
    ipcRenderer.send('account.create', data);

    this.setState({
      formData: {
        ...AddAccountForm.defaultFormData,
      }
    });
  }
  render() {
    const fields = Object.keys(this.state.formData).map(key => (
      <FieldText
        required
        onChange={(e) => this.updateField(e, key)}
        name={key}
        key={key}
        {...this.state.formData[key]}
        type={this.state.formData[key].type || 'text'}
      />
    ));

    let modal = null;

    if (this.state.modalIsOpen) {
      modal = (
        <SmartModal
        heading="Add an AWS account"
        onClose={this.onModalClose}
        actions={
          [
            { text: 'Add account', onClick: this.addAccount, iconBefore: <EditorAddIcon /> },
          ]
        }
      >
        AWS account credentials are used to retrieve data from Amazon AWS API's. Certain features of this application require access to Amazon AWS API's. To learn more about AWS, visit <ExternalLink href="https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html"> Understanding and Getting Your Security Credentials </ExternalLink>
        <div key="addAccountForm">
          <div key="addAccountFields">
            {fields}
          </div>
        </div>
      </SmartModal>
      )
    }

    return [
      <Button
        appearance="primary"
        iconBefore={<EditorAddIcon />}
        onClick={this.onModalOpen}
        key="addAccountButton"
      >
        Add account
      </Button>,
      modal
    ]
  }
}

export default AddAccountForm;
