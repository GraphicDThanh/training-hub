import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Policy from './rcPolicies';

const mapStateToPropsAuthented = ({ user }) => ({ user });
const mapStateToPropsRouterAuthented = ({ loadingUser }) => ({ loadingUser });

const onFailure = ({ history }) => history.push('/');

export const authenticated = Policy({
  name: 'authenticated',
  test: ({ user }) => !!user,
  compose: PoliciedComponent =>
    connect(mapStateToPropsAuthented)(PoliciedComponent)
});

export const enforceLogin = authenticated.derivate(({ compose }) => ({
  name: 'enforceLogin',
  failure: onFailure,
  isTesting: ({ loadingUser }) => loadingUser,
  preview: false,
  compose: PoliciedComponent =>
    compose(
      withRouter(connect(mapStateToPropsRouterAuthented)(PoliciedComponent))
    )
}));

export default enforceLogin;
