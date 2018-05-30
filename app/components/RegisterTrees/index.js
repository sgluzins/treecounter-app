import React, { Component } from 'react';
import PropTypes from 'prop-types';
import t from 'tcomb-form';

import PrimaryButton from '../Common/Button/PrimaryButton';
import TextHeading from '../Common/Text/TextHeading';
import CardLayout from '../Common/Card/CardLayout';
import {
  singleTreeRegisterFormSchema,
  schemaOptionsSingleTree,
  multipleTreesRegisterFormSchema,
  schemaOptionsMultipleTrees
} from '../../server/parsedSchemas/registerTrees';

let TCombForm = t.form.Form;

const formLayoutSingleTree = locals => {
  return (
    <div className="register-tree__form">
      <div className="register-tree__form--row">
        {locals.inputs.treeCount}
        {locals.inputs.treeSpecies}
      </div>
      <div className="register-tree__form--row">{locals.inputs.plantDate}</div>
      {locals.inputs.geoLocation}
      <div className="register-tree__form--row">
        {locals.inputs.contributionImages}
      </div>
      <div className="register-tree__form--row">
        {locals.inputs.treeClassification}
        <div className="register-tree__form--row__spacer" />
        {locals.inputs.treeScientificName}
      </div>
      <div className="register-tree__form--row">
        {locals.inputs.contributionMeasurements}
      </div>
    </div>
  );
};

const formLayoutMultipleTrees = locals => {
  return (
    <div className="register-tree__form">
      <div className="register-tree__form--row">
        {locals.inputs.treeCount}
        <div className="register-tree__form--row__spacer" />
        {locals.inputs.treeSpecies}
      </div>
      <div className="register-tree__form--row">{locals.inputs.plantDate}</div>
      {locals.inputs.geoLocation}
      <div className="register-tree__form--row">
        {locals.inputs.contributionImages}
      </div>
    </div>
  );
};

const schemaOptionsSingle = {
  template: formLayoutSingleTree,
  ...schemaOptionsSingleTree
};

const schemaOptionsMultiple = {
  template: formLayoutMultipleTrees,
  ...schemaOptionsMultipleTrees
};

export default class RegisterTrees extends Component {
  static mode = {
    singleTree: 'single-tree',
    multipleTrees: 'multiple-trees'
  };

  constructor() {
    super();

    this.state = {
      mode: RegisterTrees.mode.singleTree,
      individual: {
        treeCount: 1
      }
    };

    // Bind Local method
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }

  onSubmitClick() {
    this.props.onSubmit(this.state.mode);
  }

  handleModeOptionChange(changeEvent) {
    this.setState({ mode: changeEvent.target.value });
  }

  render() {
    return (
      <div className="app-container__content--center">
        <TextHeading>Register planted trees</TextHeading>
        <CardLayout>
          <div className="register-tree">
            <form className="register-tree__type">
              <label
                className={
                  'radio register-tree__type--option ' +
                  (this.state.mode === RegisterTrees.mode.singleTree
                    ? 'active'
                    : '')
                }
              >
                <input
                  type="radio"
                  value={RegisterTrees.mode.singleTree}
                  checked={this.state.mode === RegisterTrees.mode.singleTree}
                  onChange={e => this.handleModeOptionChange(e)}
                />
                <span>Individual&nbsp;Tree</span>
              </label>
              <label
                className={
                  'radio register-tree__type--option ' +
                  (this.state.mode === RegisterTrees.mode.multipleTrees
                    ? 'active'
                    : '')
                }
              >
                <input
                  type="radio"
                  value={RegisterTrees.mode.multipleTrees}
                  checked={this.state.mode === RegisterTrees.mode.multipleTrees}
                  onChange={e => this.handleModeOptionChange(e)}
                />
                <span>Many&nbsp;Trees</span>
              </label>
            </form>
          </div>
          <div className="register-tree__form">
            {this.state.mode === RegisterTrees.mode.singleTree ? (
              <TCombForm
                ref="registerTreeForm"
                type={singleTreeRegisterFormSchema}
                options={schemaOptionsSingle}
                value={this.state.individual}
              />
            ) : (
              <TCombForm
                ref="registerTreeForm"
                type={multipleTreesRegisterFormSchema}
                options={schemaOptionsMultiple}
              />
            )}
          </div>
          <PrimaryButton onClick={this.onSubmitClick}>Register</PrimaryButton>
        </CardLayout>
      </div>
    );
  }
}

RegisterTrees.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
