import { call, put, select } from 'redux-saga/effects';

import api from '../../services/api';

import { Creators as UsersActions } from '../ducks/users';
import { Creators as ModalActions } from '../ducks/modal';

export function* addUser(action) {
  try {
    const { data } = yield call(api.get, `/users/${action.payload.user}`);

    const isDuplicated = yield select(state => state.users.data.find(user => user.id === data.id));

    if (isDuplicated) {
      yield put(UsersActions.addUserFailure('Usuário Duplicado!'));
    } else {
      const userData = {
        id: data.id,
        name: data.name,
        bio: data.bio,
        login: data.login,
        avatar: data.avatar_url,
        cordinates: action.payload.cordinates,
      };

      yield put(UsersActions.addUserSuccess(userData));
      yield put(ModalActions.hideModal());
    }
  } catch (err) {
    yield put(UsersActions.addUserFailure('Erro ao adicionar Usuário!'));
  }
}
