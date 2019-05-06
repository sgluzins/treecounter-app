import React from 'react';
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native';

import SearchBar from '../../../components/Header/SearchBar.native';
import Header from '../../../components/Header/Header.native';
import { getSuggestions, profileTypeToImage } from '../../../helpers/utils';
import { getImageUrl } from '../../../actions/apiRouting';
import { withNavigation } from 'react-navigation';
import styles from '../../../styles/header/search_layout.native';
import _ from 'lodash';
import i18n from '../../../locales/i18n';
import searchBarStyles from '../../../styles/header/search_bar.native';
import { NotificationManager } from '../../../notification/PopupNotificaiton/notificationManager';

class SearchUser extends React.Component {
  static SearchBar = SearchBar;
  static Header = Header;

  static defaultProps = {
    debounce: 500,
    headerBackgroundColor: '#b9d384',
    headerTintColor: '#fff'
  };
  constructor(props) {
    super(props);
    this.onChangeTextDelayed = _.debounce(this._handleChangeQuery, 200);
  }

  state = {
    q: [],
    searchResultClicked: false,
    selectedSuggestionName: ''
  };

  _handleSubmit = q => {
    this.props.onSubmit && this.props.onSubmit(q);
  };

  // TODO: debounce
  _handleChangeQuery = q => {
    this.setState({ selectedSuggestionName: '', searchResultClicked: false });
    getSuggestions(q).then(suggestions => {
      this.setState({ q: suggestions });
    });
  };

  _onNavigationClick(suggestion) {
    if (
      this.props.onSearchResultClick &&
      !this.isMyself(suggestion, this.props.currentUserProfile) &&
      (this.props.alreadyInvited &&
        !this.alreadyInvitedUser(suggestion, this.props.alreadyInvited))
    ) {
      this.props.onSearchResultClick(suggestion);
      this.setState({
        searchResultClicked: true
      });
      this.setState({
        selectedSuggestionName: this.props.clearTextOnClick
          ? ''
          : suggestion.name
      });
    } else {
      NotificationManager.error('Could not add user', 'Error', 5000);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.searchSuggestion === '') {
      this.setState({
        selectedSuggestionName: ''
      });
    }
  }
  isMyself(treecounter, currentUserProfile) {
    return (
      !!currentUserProfile &&
      currentUserProfile.treecounter.id === treecounter.id
    );
  }
  alreadyInvitedUser(treecounter, alreadyInvited) {
    if (alreadyInvited.length > 0) {
      for (let i = 0; i < alreadyInvited.length; i++) {
        if (treecounter.slug === alreadyInvited[i].treecounterSlug) {
          return true;
        }
      }
    } else {
      return false;
    }
  }
  render() {
    return (
      <View style={{ width: '100%' }}>
        <SearchBar
          dontFocus
          onChangeQuery={this.onChangeTextDelayed}
          inputValue={this.state.selectedSuggestionName}
          onSubmit={this._handleSubmit}
          placeholderTextColor={this.props.searchInputPlaceholderTextColor}
          placeholderValue={i18n.t('label.search_user')}
          textColor={this.props.searchInputTextColor}
          selectionColor={this.props.searchInputSelectionColor}
          underlineColorAndroid={
            this.props.searchInputUnderlineColorAndroid ||
            this.props.headerBackgroundColor
          }
          showCancelSearchButton={false}
          style={{
            ...searchBarStyles.searchContainer,
            width: '100%',
            backgroundColor: 'transparent'
          }}
          tintColor={
            this.props.searchInputTintColor || this.props.headerTintColor
          }
        />

        {this.state.q && !this.state.searchResultClicked ? (
          <ScrollView>
            {this.state.q.map((suggestion, i) => {
              if (this.props.hideCompetitions) {
                if (suggestion.category !== 'competition') {
                  return (
                    <TouchableOpacity
                      style={styles.searchResult}
                      key={'suggestion' + i}
                      onPress={this._onNavigationClick.bind(this, suggestion)}
                    >
                      <Image
                        style={styles.profileImage}
                        source={
                          suggestion.image
                            ? {
                                uri: getImageUrl(
                                  suggestion.category,
                                  'avatar',
                                  suggestion.image
                                )
                              }
                            : profileTypeToImage[suggestion.type]
                        }
                      />
                      <Text style={styles.profileText}>{suggestion.name}</Text>
                    </TouchableOpacity>
                  );
                }
              } else {
                return (
                  <TouchableOpacity
                    style={styles.searchResult}
                    key={'suggestion' + i}
                    onPress={this._onNavigationClick.bind(this, suggestion)}
                  >
                    <Image
                      style={styles.profileImage}
                      source={
                        suggestion.image
                          ? getImageUrl('profile', 'avatar', suggestion.image)
                          : profileTypeToImage[suggestion.type]
                      }
                    />
                    <Text style={styles.profileText}>{suggestion.name}</Text>
                  </TouchableOpacity>
                );
              }
              return null;
            })}
          </ScrollView>
        ) : null}
      </View>
    );
  }
}

export default withNavigation(SearchUser);
