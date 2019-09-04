import React from 'react';
import PropTypes from 'prop-types';

import i18n from '../../locales/i18n';
import { View, Text, Image } from 'react-native';
import styles from '../../styles/selectplantproject/selectplantproject-snippet.native';
import { challenge_outline as targetPlanted } from '../../assets';
import { delimitNumbers, convertNumber } from '../../utils/utils';
import EStyleSheet from 'react-native-extended-stylesheet';

class PlantedProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      countPlanted,
      countTarget,
      style,
      treePlantedChildContainerStyle
    } = this.props;
    let treePlantedRatio = (countPlanted / countTarget).toFixed(2);
    treePlantedRatio = parseFloat(treePlantedRatio);
    let treeCountWidth;
    if (treePlantedRatio > 1) {
      treeCountWidth = 100;
    } else if (treePlantedRatio < 0) {
      treeCountWidth = 0;
    } else {
      treeCountWidth = treePlantedRatio * 100;
    }

    return (
      <View style={[styles.treeCounterContainer, style]}>
        <View style={styles.treePlantedContainer}>
          <View
            style={styles.treePlantedChildContainer}
            style={
              treeCountWidth > 0
                ? {
                    backgroundColor: EStyleSheet.value('$newPrimary'),
                    borderColor: '#b9d384',
                    width: treeCountWidth + '%',
                    paddingRight: 10,
                    padding: 5,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    borderWidth: 0.5,
                    ...treePlantedChildContainerStyle
                  }
                : {
                    padding: 5
                  }
            }
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              position: 'absolute',
              alignItems: 'center',
              paddingTop: 8,
              paddingBottom: 8
            }}
          >
            <Text style={styles.treePlantedtextPlanted}>
              {convertNumber(parseInt(countPlanted), 2)}
            </Text>
            <Text style={styles.treePlantedtextTrees}>
              {i18n.t('label.planted')}
            </Text>
          </View>
        </View>

        {!this.props.hideTargetImage ? (
          <View style={styles.targetContainer}>
            <Text style={styles.treePlantedtext}>
              {countTarget ? delimitNumbers(countTarget) : null}
            </Text>

            <View style={{ paddingLeft: 5.5, paddingRight: 12 }}>
              <Image source={targetPlanted} style={{ width: 15, height: 15 }} />
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

PlantedProgressBar.propTypes = {
  countPlanted: PropTypes.number,
  countTarget: PropTypes.number,
  hideTargetImage: PropTypes.bool,
  style: PropTypes.object,
  treePlantedChildContainerStyle: PropTypes.object
};

export default PlantedProgressBar;
