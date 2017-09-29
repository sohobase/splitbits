import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { STYLE, THEME } from './src/config';
import {
  LoadingScreen,
  OnboardingScreen,
  MainScreen,
  ProfileScreen,
  FriendsScreen,
  SettingsScreen,
  TransactionScreen,
  WalletScreen,
} from './src/screens';

// const navigationOptions = {
//   headerBackTitle: ' ',
//   headerStyle: STYLE.HEADER,
//   headerTitleStyle: STYLE.HEADER_TITLE,
//   headerTintColor: THEME.COLOR.TEXT_HIGHLIGHT,
// };

const navigationOptions = { header: null };

const Navigation = StackNavigator({
  // Onboarding: { screen: OnboardingScreen, navigationOptions },
  Main: { screen: MainScreen, navigationOptions },
  Transaction: { screen: TransactionScreen, navigationOptions },
  Profile: { screen: ProfileScreen, navigationOptions },
  Friends: { screen: FriendsScreen, navigationOptions },
  Settings: { screen: SettingsScreen, navigationOptions },
  Wallet: { screen: WalletScreen, navigationOptions },
});

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
          <Navigation />
        </Provider>
    );
  }
}

export default App;
