/**
 * Thanks to Lucas Constantino Silva
 * https://github.com/lucasconstantino
 *
 * This a fork from React policies of Lucas
 */
/* eslint no-shadow: 0 */
/* eslint no-underscore-dangle: 0 */
/* eslint prefer-const: 0 */
/* eslint max-len: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

let count = 0;
const ignore = () => {};

/**
 * @param {Object} config.
 * @param {String} config.name A name for this policy. Useful when retrieving
 *  policy context inside your components.
 * @param {Function} config.test The testing callback. Should return 'true' if
 *  the test passed and 'false' otherwise.
 * @param {Function} [config.failure] An optional failure callback.
 * @param {Function} [config.isTesting] An optional callback to determine if
 *  the test is in progress.
 * @param {Boolean} [preview=false] If set to 'true' will render the component
 *  while the testing process is not finished (see "isTesting" argument).
 *  Defaults to 'false', which means 'placeholder' or 'empty' component will be
 *  used instead.
 * @param {Object} [empty=<div />] A component to be rendered when the test
 *  fails.
 * @param {Object} [placeholder=null] A component to be redered while the
 *  testing process is not finished  (see "isTesting" argument above).
 * @param {Function} [config.shouldUpdate] A callback to determine if policy
 *  testing should be re-executed or note. It works much similarly to
 *  "shouldComponentUpdate"; it receives "nextProps" as an argument and have
 *  current props accessible via "this.props".
 * @param {Function} [config.compose] A callback to be called to allow
 *  composing the PoliciedComponent. Useful for usage with other HOC or
 *  libraries like redux (i.e. 'connect') and react-router (i.e. 'withRouter').
 * @return {Function} A policy decorator.
 */
/**
   Config key              | Type     | Description
  ------------------------|----------|-----------
  `test`                  | Function | The policy validation function. Should return 'true' if the test passes and 'false' otherwise.
  `name`                  | String   | (optional) A name for this policy. Useful when retrieving policy context inside your components.
  `failure`               | Function | (optional) A failure callback.
  `isTesting`             | Function | (optional) A callback to determine if the test is in progress.
  `preview`               | Boolean  | (optional) If set to 'true' will render the component while the testing process is not finished (see "isTesting" argument above). Defaults to 'false', which means 'placeholder' or 'empty' component will be used instead.
  `empty`                 | Object   | (optional) A component to be rendered when the test fails. Defaults to an empty `div`.
  `placeholder`           | Object   | (optional) A component to be rendered while the testing process is not finished (see "isTesting" argument above).
  `shouldUpdate`          | Function | (optional) A callback to determine if policy testing should be re-executed or not. It works much similarly to "shouldComponentUpdate"; it receives "nextProps" as an argument and have current props accessible via "this.props".
  `compose`               | Function | (optional) A callback to allow composing the PoliciedComponent. Useful for usage with other HOC or libraries like redux (i.e. 'connect') and react-router (i.e. 'withRouter'). It receives the PoliciedComponent as it's single argument.

  `config` can also be a function, which will be taken for the `test` configuration key.
 */
const Policy = (...configs) => {
  const config = configs
    .map(config => (typeof config === 'function' ? { test: config } : config))
    .reduce((prev, next) => ({ ...prev, ...next }), {});

  const {
    name,
    test,
    failure = ignore,
    preview = false,
    empty = <div />,
    placeholder = null,
    shouldUpdate = () => true,
    isTesting = () => false,
    compose = PoliciedComponent => PoliciedComponent
  } = config;

  const _name =
    name || (test.name !== 'test' && test.name) || 'policy' + count + 1;

  const HOC = Composed => {
    class PoliciedComponent extends Component {
      static displayName = `PoliciedComponent(${_name}/${Composed.displayName ||
        'Composed'})`;

      static childContextTypes = {
        policy: PropTypes.object
      };

      static contextTypes = {
        policy: PropTypes.object
      };

      constructor(props) {
        super(props);
        this.state = { testing: true, failed: null };
      }
      getChildContext() {
        return {
          policy: {
            ...(this.context.policy || {}),
            [_name]: this.state
          }
        };
      }
      componentWillMount() {
        this.test(this.props);
      }

      componentWillReceiveProps(nextProps) {
        if (shouldUpdate.call(this, nextProps)) {
          this.test(nextProps);
        }
      }
      test(props) {
        const failed = !test.call(this, props);
        const testing = isTesting.call(this, props);

        this.setState({ testing, failed });

        if (!testing && failed) failure.call(this, props);
      }

      render() {
        const { testing, failed } = this.state;

        // 1. In case still testing, not failed, and allowing preview.
        if (testing && preview) return <Composed {...this.props} />;

        // 2. In case still testing and placeholder component available,
        // show placeholder component.
        if (testing && placeholder) return placeholder;

        // 3. In case finished testing and not failed, render component.
        if (!testing && !failed) return <Composed {...this.props} />;

        // 4. In case finished testing or failed or not previewing,
        // return empty component or null if none given.
        return empty || null;
      }
    }

    return compose(PoliciedComponent);
  };

  HOC.derivate = override =>
    Policy(
      config,
      typeof override === 'function' ? override(config) : override
    );

  return HOC;
};

export default Policy;

export const combine = (...policies) => component =>
  []
    .concat(policies)
    .reverse()
    .reduce((component, policy) => policy(component), component);
