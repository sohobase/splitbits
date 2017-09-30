import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
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

const screens = {
  Onboarding: { screen: OnboardingScreen, navigationOptions },
  Main: { screen: MainScreen, navigationOptions },
  Transaction: { screen: TransactionScreen, navigationOptions },
  Profile: { screen: ProfileScreen, navigationOptions },
  Friends: { screen: FriendsScreen, navigationOptions },
  Settings: { screen: SettingsScreen, navigationOptions },
  Wallet: { screen: WalletScreen, navigationOptions },
};

const NavigationMain = StackNavigator({ ...screens }, { initialRouteName: 'Main' });
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
