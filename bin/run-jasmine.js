#!../phantom.js
/**
 * Wait until the test condition is true or a timeout occurs. Useful for waiting
 * on a server response or for a ui change (fadeIn, etc.) to occur.
 *
 * @param testFx javascript condition that evaluates to a boolean,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param onReady what to do when testFx condition is fulfilled,
 * it can be passed in as a string (e.g.: "1 == 1" or "$('#bar').is(':visible')" or
 * as a callback function.
 * @param timeOutMillis the max amount of time to wait. If not specified, 3 sec is used.
 */
/*globals phantom WebPage*/
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3001, //< Default Max Timeout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function() {
            if ( (new Date().getTime() - start < maxtimeOutMillis) && !condition ) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if(!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 100); //< repeat check every 250ms
}


if (phantom.args.length === 0 || phantom.args.length > 2) {
    console.log('Usage: run-jasmine.js URL');
    phantom.exit();
}

var page = new WebPage();

// Route "console.log()" calls from within the Page context to the main Phantom context (i.e. current "this")
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

page.open(phantom.args[0], function(status){
    if (status !== "success") {
        console.log("Unable to access network");
        phantom.exit();
    } else {
        waitFor(function(){
            return page.evaluate(function(){
                if (document.body.querySelector('.finished-at')) {
                    return true;
                }
                return false;
            });
        }, function(){
            var passed = page.evaluate(function(){
				// color defs
				var e = String.fromCharCode(27);
				var red = e + "[31m";
				var green = e + "[32m";
				var clear = e + "[0m";

				var failed = function(element){
					return element.className.indexOf("passed") === -1
				};

				var colorize = function(element, prefix){
					if(!prefix) prefix = "";
					var description = element.querySelectorAll('.description')[0].innerText;
					var color = failed(element) ? red : green;
					console.log(color + prefix + description + clear);
				};
				

				colorize(document.body.querySelector('.runner'))

                var suites = document.body.querySelectorAll('div.suite');
                for (var i = 0; i < suites.length; ++i) {
                    var suite = suites[i];
					colorize(suite);
                    var specs = suite.querySelectorAll('.spec');
                    for (var j = 0; j < specs.length; ++j) {
						var spec = specs[j];
						colorize(spec, "\t");
						if(failed(spec)){
							// not sure why the stackTraces aren't showing up
							// 10 point if you can figure it out
							var messages = spec.querySelector(".messages");
							var divs = messages.querySelectorAll("div");
							console.log("\t " + divs[0].innerText);
							// console.log("\t " + divs[1].innerText);
							// console.log("\t " + spec.querySelector(".stackTrace").innerText);
						}
                    }
                }
				console.log(clear);
				return document.body.querySelector('.description').innerText.match(/0 failures/) != null;
            });
            phantom.exit(passed ? 0 : -1);
        });
    }
});
