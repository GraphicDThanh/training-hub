// https://github.com/jrburke/r.js/blob/master/build/example.build.js
({
    mainConfigFile: 'src/files/scripts/app.js',    
    baseUrl: 'src/files/scripts',
    name: 'app',                 
    out: 'dist/js/main.min.js',
    preserveLicenseComments: false,
    paths: {
      requireLib: '../bower-components/requirejs/require',
      almond: '../bower-components/almond/almond'
    },
    include: ['requireLib', 'almond'],
    optimize : "none"
})