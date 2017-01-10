require.config({

  paths: {
      'jasmine': ['../tests/lib/jasmine'],
      'jasmine-html': ['../tests/lib/jasmine-html'],
      'jasmine-boot': ['../tests/lib/boot'],
      'data-spec': ['specs/data.spec'],
      'data': ['../js/data/data']
  },

  shim: {
    'jasmine-html': {
      deps : ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html']
    }
  }

  });

  require(['jasmine-boot'], function () {
    require(['data-spec', 'data'], function(data_spec, data){
      data_spec.spec(data);
      window.onload();
      console.log(data);
    })
  });
