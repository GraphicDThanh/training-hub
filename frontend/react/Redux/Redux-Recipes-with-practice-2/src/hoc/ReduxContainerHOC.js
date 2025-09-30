/** code example */
/*import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default (
  ComposedComponent,
  mapStateToProps,
  mapDispatchToProps,
  actionCreators
) => {
  class ReduxContainer extends React.PureComponent {
    constructor(props) {
      super(props);
      const { dispatch } = props;
      this.boundActionCreators = bindActionCreators(actionCreators, dispatch)
    }

    static propTypes = {
      dispatch: PropTypes.func
    };

    static defaultProps = {
      dispatch: () => {}
    };

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.boundActionCreators}
        />
      );
    }
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReduxContainer)
}*/