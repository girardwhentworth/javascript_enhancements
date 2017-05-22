// ==UserScript==
// @name         JS Helper Extension
// @namespace    http://tampermonkey.net/
// @version      0.2.01
// @description  try to take over the world!
// @author       You
// @match        http://ab.entertainmentcrave.com/lp.html?uid*&ip=*&sig=*&sigNgage=*&rnd=*&gender=*&age=*&zip=*&memberLocationID=*&showTimerOverride=*&hasRedesign=*
// @grant        none
// ==/UserScript==

(function() {

    // Old notes:
    //  - don't run on iframes with id like *google_ads*, *easyXDM*, *topAd*, *google_osd* or no ID at all
    //  - do run on parentiframe 

    'use strict';
    var focusLock = false;
	var minutes = 1.75;
	var minute = 60000;
	var inactivityTimer = minute * minutes;
	var isTimeout;

    window.addEventListener("focus", function(event) {

		mainFunction();

    });
	
	startTimeout();

	window.onLoad = mainFunction();
	
	// If activityTimer has run out, reload the page
	// (every onFocus will add time to the timer)
	function startTimeout() {
		console.log("|--- JS ---| Starting the timeout function.");
		var isTimeout = setTimeout(function() {
			console.log("|--- JS ---| Reloading the page.");
			window.top.location.reload();
		}, inactivityTimer);
	}
	
	function mainFunction() {
		
		console.log("|--- JS ---| Window has focus; firing main function.");

		// Reset the inactivity timer
		clearTimeout(isTimeout);
		startTimeout();
		
		// Only run if the focus is not locked
        if (!focusLock) {

            // "Occupied!"
            focusLock = true;

            // Helped finding the right IFRAME to use in the @match
            // console.log("My information:");
            // console.log("  - " + window.location);

            setTimeout(function() {

                console.log("|--- JS ---| Starting main timeout function.");

                // elems = array of all SPAN tags on the page
                // spanID = array of all the SPAN tags that hold the SB Amount
                // sbAmount = array of the integer of the SB Amount

                var elems = document.getElementsByTagName("span"), elemCount=elems.length, spanID = [], i = 0, j = 0, tot = 0, sbAmount = [], maxSB = 0;

                for (i=0,  tot=elemCount; i < tot; i++) {

                    if (elems[i].getAttribute("ng-bind") === 'Placement.SBAmount'){

                        // Only add the current SPAN to the spanID array if it's one of the ones we want
                        spanID.push(elems[i]);
                        sbAmount.push(elems[i].textContent);  // Add the SB amount to the array

                        if (parseInt(elems[i].textContent) > maxSB) { // check if the SB amount is larger than the current maxSB
                            maxSB = parseInt(elems[i].textContent);   // if so, update maxSB
                        }
                    }
                }

                console.log("|--- JS ---| # of total span elements = " + elemCount);
                console.log("|--- JS ---| # of useful span         = " + spanID.length);
                console.log("|--- JS ---| Most SB available        = " + maxSB);

                // Count down from the largest SB amount found to the smallest
                OuterLoop:
                for (i=maxSB; i >= 0; i--) {

                    console.log("|--- JS ---| Checking for links worth " + i + " SB");

                    // Loop through all the sbAmount array values
                    InnerLoop:
                    for (j=0,  tot=sbAmount.length; j < tot; j++) {

						//console.log(sbAmount[j] + " SB for " + elems[j]);

                        // If the current sbAmount value is the max
                        if(parseInt(sbAmount[j]) == i) {

                            // Set the node, localName and HREF attribute for 3 parents up
							var p1node = spanID[j].parentNode,
								p1name = p1node.localName,
								p1attr = p1node.getAttribute("href"),
								p2node = spanID[j].parentNode.parentNode,
								p2name = p2node.localName,
								p2attr = p2node.getAttribute("href"),
								p3node = spanID[j].parentNode.parentNode.parentNode,
								p3name = p3node.localName,
								p3attr = p3node.getAttribute("href"),
								currSB = sbAmount[j];
								
							// Pick the name and attribute for the correct parent
							var attr = '', node = '';
							switch("a") {
								
								case p1name:  
									attr = p1attr;
									node = p1node;
									break;
								case p2name:
									attr = p2attr;
									node = p2node;
									break;
								case p3name:
									attr = p3attr;
									node = p3node;
									break;
							}
								
							// Check if the playlist is in the blacklist, and if so, don't execute the code below
							if(!isBlacklisted(attr)) {
								node.click();
								break OuterLoop;
							}
                        }
                    }
                }

                // List all the SPAN elements we found
                // for (i=0,  tot=elemCount; i < tot; i++) {
                //     console.log(elems[i]);
                // }

                // List all the SB amounts we found
                // for (i=0,  tot=sbAmount.length; i < tot; i++) {
                //     console.log(sbAmount[i]);
                // }
				
				// remove the lock so it can run the next time it's called
				focusLock = false;
                console.log("|--- JS ---| End of JS Helper Extension"); 
            }, 10000);
		}
	}
	
	// FUNCTION check if the playlist link is in the blacklist (these playlists are broken)
	function isBlacklisted(attr){
		// Regex to get playlist value
		var plist = attr.substring(attr.indexOf("plid=")+5,attr.indexOf("$"));
		var ret = '';
		console.log('|--- JS ---| Found playlist ' + plist);
		
		switch (plist) {
		
			case '536be5107591fd847d8b456a':
			case '566a0e7b7591fd49728b4568':
			case '55fc58d87591fd064d8b456a':
			case '57b54de67591fd081a8b4568':
			case '5748d08a7591fdfc608b4568':
			case '576af13b7591fd15108b4568':
				console.log("|--- JS ---|   - on the blacklist");
				ret = true;
				break;
			
			default: 
				console.log("|--- JS ---|   - safe playlist");
				ret = false;
		}
		return ret;
	}

    // FUNCTION to open a window (not in use)
    function eventFire(el, etype){
		console.log("|--- JS ---|   (inside eventFire)");
		if (el.fireEvent) {
			el.fireEvent('on' + etype);
		} else {
			var evObj = document.createEvent('Events');
			evObj.initEvent(etype, true, false);
			el.dispatchEvent(evObj);
		}
	}
})();
