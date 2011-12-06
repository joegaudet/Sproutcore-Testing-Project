// ==========================================================================
// Project:   Jasmine.Foo
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Jasmine */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Jasmine.Foo = SC.Record.extend(
/** @scope Jasmine.Foo.prototype */ {
	isEven: function(value){
		return value % 2 == 0;
	}
}) ;; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('jasmine');