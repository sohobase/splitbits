import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { STYLE, THEME } from './src/config';
import { LoadingScreen, MainScreen } from './src/screens';
import { initialize } from './src/store';

const navigationOptions = {
  headerBackTitle: ' ',
  headerStyle: STYLE.HEADER,
  headerTitleStyle: STYLE.HEADER_TITLE,
  headerTintColor: THEME.COLOR.TEXT_HIGHLIGHT,
};

const Navigation = StackNavigator({
  Main: { screen: MainScreen, navigationOptions: { header: null } },
  // Settings: { screen: MainScreen, navigationOptions },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { store: undefined };
  }

  async componentWillMount() {
    this.setState({ store: await initialize() });
  }

  render() {
    const { store } = this.state;

    return (
      !store ?
        <LoadingScreen />
        :
        <Provider store={store}>
          <Navigation />
        </Provider>
    );
  }
}

export default App;
