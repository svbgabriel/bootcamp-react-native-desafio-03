import React, { Fragment } from 'react';

import { StatusBar } from 'react-native';

import AddUser from '~/components/AddUser';
import Map from '~/components/Map';

const Main = () => (
  <Fragment>
    <StatusBar barStyle="light-content" />
    <Map />
    <AddUser />
  </Fragment>
);

export default Main;
