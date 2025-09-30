export default {
  component: require('../components/App'),
  childRoutes:[
    {
      path: '/',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./../components/About'))
        })
      }
    },
    {
      path: '/about',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./../components/About'))
        })
      }
    },
    {
      path: '/services',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./../components/services/Services'))
        })
      }
    },
    {
      path: '/contact',
      getComponent: (location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./../components/Contact'))
        })
      }
    }
  ]
}