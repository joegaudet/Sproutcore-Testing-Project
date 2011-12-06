// ==========================================================================
// Project:   Unit.Foo
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Unit */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Unit.Foo = SC.Record.extend(
/** @scope Unit.Foo.prototype */ {
	isEven: function(value){
		return value % 2 == 0;
	}
});
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('unit');