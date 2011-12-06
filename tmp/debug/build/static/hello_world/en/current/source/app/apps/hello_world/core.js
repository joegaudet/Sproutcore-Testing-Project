// ==========================================================================
// Project:   Lebowski Framework - The SproutCore Test Automation Framework
// License:   Licensed under MIT license (see License.txt)
// ==========================================================================
/*globals HelloWorldApp */

HelloWorldApp = SC.Application.create({

  NAMESPACE: 'HelloWorldApp',
  VERSION: '1.0.0',

  store: SC.Store.create().from(SC.Record.fixtures)

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('hello_world');