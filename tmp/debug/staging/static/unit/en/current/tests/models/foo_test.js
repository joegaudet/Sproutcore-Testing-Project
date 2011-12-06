// ==========================================================================
// Project:   Unit.Foo Unit Test
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Unit module test ok equals same stop start */

module("Unit.Foo");
var foo = Unit.Foo.create();

// base case 
test("Is even should report even, when 0.", function() {
	ok(foo.isEven(0));
});

// second concrete odd base case
test("Is even should report even, when 2.", function() {
	ok(foo.isEven(2));
})

// indefinite (anonymous) case
test("Is even should report even, when number is even.", function() {
	ok(foo.isEven(2 * Math.round(Math.random())));
})

// base case
test("Is even should report false, when 1.", function() {
	ok(!foo.isEven(1));
});
	
test("Is even should report false, when 3.", function() {
	// second concrete odd base case
	ok(!foo.isEven(3));
});
	
test("Is even should report false, when number is odd.", function() {
	// indefinite (anonymous) odd case
	ok(!foo.isEven(1 + 2 * Math.round(Math.random())));
});