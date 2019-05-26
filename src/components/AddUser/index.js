import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Modal, Text, View, TextInput, TouchableOpacity, ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ModalActions } from '../../store/ducks/modal';
import { Creators as UsersActions } from '../../store/ducks/users';

import styles from './styles';

class AddUser extends Component {
  static propTypes = {
    modal: PropTypes.shape({
      visible: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
      cordinates: PropTypes.oneOfType([
        PropTypes.oneOf([null]),
        PropTypes.shape({
          latitude: PropTypes.number,
          longitude: PropTypes.number,
        }),
      ]),
    }).isRequired,
    users: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.string]),
    }).isRequired,
    hideModal: PropTypes.func.isRequired,
    addUserRequest: PropTypes.func.isRequired,
  };

  state = {
    userInput: '',
  };

  handleInputChange = e => this.setState({ userInput: e.target.value });

  handleSave = () => {
    const { users } = this.props;

    if (users.loading) return;

    const { userInput } = this.state;

    if (!userInput) return;

    const {
      addUserRequest,
      modal: { cordinates },
    } = this.props;

    addUserRequest(userInput, cordinates);
    this.setState({ userInput: '' });
  };

  handleHideModal = () => {
    const { hideModal } = this.props;
    hideModal();
    this.setState({ userInput: '' });
  };

  render() {
    const { modal, users } = this.props;
    const { userInput } = this.state;
    return (
      <Modal
        visible={modal.visible}
        animationType="slide"
        transparent
        onRequestClose={this.handleHideModal}
      >
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Text style={styles.title}>Adicionar novo usuário</Text>
            <TextInput
              placeholder="Usuário do Github"
              value={userInput}
              style={styles.input}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(username) => {
                this.setState({ userInput: username });
              }}
            />
            {users.error && <Text style={styles.error}>{users.error}</Text>}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancel]}
                onPress={this.handleHideModal}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.save]} onPress={this.handleSave}>
                {users.loading ? (
                  <ActivityIndicator color={styles.loading.color} size="small" />
                ) : (
                  <Text style={styles.buttonText}>Salvar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modal: state.modal,
  users: state.users,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...ModalActions, ...UsersActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddUser);
