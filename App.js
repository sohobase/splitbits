import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { C } from './src/config';
import {
  LoadingScreen,
  LockScreen,
  OnboardingScreen,
  MainScreen,
  ProfileScreen,
  FriendsScreen,
  SettingsScreen,
  TransactionScreen,
} from './src/screens';

const navigationOptions = { header: null };

const screens = {
  Lock: { screen: LockScreen, navigationOptions },
  Onboarding: { screen: OnboardingScreen, navigationOptions },
  Main: { screen: MainScreen, navigationOptions },
  Transaction: { screen: TransactionScreen, navigationOptions },
  Profile: { screen: ProfileScreen, navigationOptions },
  Friends: { screen: FriendsScreen, navigationOptions },
  Settings: { screen: SettingsScreen, navigationOptions },
};

const NavigationMain = StackNavigator({ ...screens }, { initialRouteName: C.DEV ? 'Main' : 'Lock' });
const NavigationOnboarding = StackNavigator({ ...screens }, { initialRouteName: 'Onboarding' });

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { store: undefined };
    this._onLoad = this._onLoad.bind(this);
  }

  _onLoad(state) {
    this.setState({ ...state });
  }

  render() {
    const { store } = this.state;

    return (
      !store ?
        <LoadingScreen onLoad={this._onLoad} />
        :
        <Provider store={store}>
          {
            store.getState().wallets.length > 0
              ? <NavigationMain initialRouteName="Transaction" />
              : <NavigationOnboarding />
          }
        </Provider>
    );
  }
}

export default App;
