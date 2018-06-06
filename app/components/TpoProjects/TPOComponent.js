import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { plantProjectsSelector } from '../../selectors/index';
import ActivePlantProject from './ActivePlantProject';
import i18n from '../../locales/i18n.js';
let lng = 'en';

const TPOComponent = ({ userTpos, plantProjects, id }) => (
  <div>
    <div className="tpo_box">
      <p className="firstHeadline">
        {i18n.t('label.tpoProjectlabels.org', { lng })}
      </p>
      <p>{i18n.t('label.tpoProjectlabels.plant_for_u', { lng })}</p>
      <hr />
      <ActivePlantProject
        userTpos={userTpos}
        plantProjects={plantProjects}
        id={id}
      />
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    userTpos: state.entities.tpo,
    plantProjects: plantProjectsSelector(state)
  };
};
export default connect(mapStateToProps)(TPOComponent);

TPOComponent.propTypes = {
  userTpos: PropTypes.any.isRequired,
  plantProjects: PropTypes.any.isRequired,
  id: PropTypes.number.isRequired
};
