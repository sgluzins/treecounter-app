import React from 'react';
import { View, Text, Image } from 'react-native';
// { plantedDate: 'On April 9,2019', heightOfTree: 150, widhtOfTree: 120 },
import ArrowUpIcon from '../../assets/images/green-arrow-up.png';
import ArrowRightIcon from '../../assets/images/green-arrow-right.png';
import CalendarIcon from '../../assets/images/green-calendar.png';
import styles from '../../styles/mesurements/index';
import i18n from '../../locales/i18n.js';

const Measurement = props => (
  <View style={{ paddingTop: 20 }}>
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
    >
      <Image source={CalendarIcon} style={styles.icon} />
      <Text>{props.measurementDate}</Text>
    </View>
    <View style={{ flexDirection: 'row', paddingTop: 5 }}>
      <View
        style={{
          ...styles.itemContainer
        }}
      >
        <Image source={ArrowUpIcon} style={styles.icon} />
        <Text>
          {props.height} {i18n.t('label.m_tall')}
        </Text>
      </View>
      <View style={{ flexDirection: 'column', flex: 8, marginLeft: 16 }}>
        <View
          style={{
            ...styles.itemContainer
          }}
        >
          <Image source={ArrowRightIcon} style={styles.icon} />
          <Text>
            {props.diameter} {i18n.t('label.cm_wide')}
          </Text>
        </View>
      </View>
    </View>
  </View>
);

export default Measurement;
