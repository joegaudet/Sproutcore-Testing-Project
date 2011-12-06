var jsApiReporter;
(function() {
  var jasmineEnv = jasmine.getEnv();
  jsApiReporter = new jasmine.JsApiReporter();
  var trivialReporter = new jasmine.TrivialReporter();
  jasmineEnv.addReporter(jsApiReporter);
  jasmineEnv.addReporter(trivialReporter);
  jasmineEnv.specFilter = function(spec) {
    return trivialReporter.specFilter(spec);
  };
  window.onload = function() {
    jasmineEnv.execute();
  };
})();; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('jasmine-sproutcore');