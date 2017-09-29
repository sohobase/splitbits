import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { View as Animatable } from 'react-native-animatable';
import QRCode from 'react-native-qrcode';
import { Button, Header } from '../../components';
import { SHAPE, STYLE, THEME } from '../../config';
import styles from './Profile.style';

const { COLOR } = THEME;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this._onSave = this._onSave.bind(this);
  }

  _onSave() {
    const { navigation: { goBack } } = this.props;
    goBack();
  }

  render() {
    const { _onSave } = this;
    const { navigation } = this.props;

    return (
      <View style={STYLE.SCREEN}>
        <View style={STYLE.LAYOUT_TOP}>
          <Header
            title="Profile"
            navigation={navigation}
            buttonRight={{ icon: 'add', onPress: _onSave }}
          />
          <Animatable animation="bounceIn" delay={600} style={styles.preview}>
            <View style={[STYLE.CENTERED, styles.preview]}>
              <QRCode
                value={'http://sohobase.co'}
                size={128}
                fgColor={COLOR.WHITE}
                bgColor={COLOR.PRIMARY}
              />
              <Text style={styles.name}>Name Surname</Text>
            </View>
          </Animatable>
        </View>

        <View style={[STYLE.LAYOUT_BOTTOM, styles.content]}>
          <Button accent caption="Save changes" onPress={_onSave} />
        </View>
      </View>
    );
  }
}

Profile.propTypes = {
  navigation: SHAPE.NAVIGATION,
};

Profile.defaultProps = {
  navigation: undefined,
};

export default Profile;
