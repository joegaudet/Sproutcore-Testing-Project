// ==========================================================================
// Project:   Jasmine.Foo Unit Test
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals Jasmine module test ok equals same stop start describe beforeEach afterEach it*/

describe('Foo#isEven',
function() {
	var foo;
	
    beforeEach(function() {
		foo = Jasmine.Foo.create();
	});

    afterEach(function() {
		foo = null;
    });

	// base case 
	it("should report even, when 0.", function() {
		expect(foo.isEven(0)).toBe(true);
	});

	// second concrete odd base case
	it("should report even, when 2.", function() {
		expect(foo.isEven(2)).toBe(true);
	});

	// indefinite (anonymous) case
	it("should report even, when number is even.", function() {
		expect(foo.isEven(2 * Math.round(Math.random()))).toBe(true);
	});

	// base case
	it("should report false, when 1.", function() {
		expect(foo.isEven(1)).toBe(false);
	});

	it("should report false, when 3.", function() {
		// second concrete odd base case
		expect(foo.isEven(3)).toBe(false);
	});

	it("should report false, when number is odd.", function() {
		// indefinite (anonymous) odd case
		expect(foo.isEven(1 + 2 * Math.round(Math.random()))).toBe(false);
	});
});