(function (global) {
    'use strict';

    const AppUtil = {};

    global.AppUtil = AppUtil;

    AppUtil.debounce = (payloadFunction, delayMs, callback, onError) => {
        let timerId;

        return function () {
            let params = arguments;

            // TODO need improve code here

            if (timerId) {
                clearTimeout(timerId);
            };
            timerId = setTimeout(applyPayloadFunction, delayMs);

            function applyPayloadFunction() {
                let result;

                 try {
                    result = payloadFunction.apply(null, params);

                    callback && callback(result);
                } catch (err) {
                    if (onError) {
                        onError(err);
                    } else {
                        console.error('Error in AppUtil.debounce:', err);
                    }
                }
            }
        };
    };

    AppUtil.throttle = function (payloadFunction, delayMs, callback, onError) {
        let intervalId,
            lastParamsApplied,
            params;

        return function () {
            params = arguments;
            lastParamsApplied = false;

            if (intervalId === undefined) {
                applyPayloadFunction();

                intervalId = setInterval( () => {
                    if (!lastParamsApplied) {
                        applyPayloadFunction();
                    } else {
                        clearInterval(intervalId);
                        intervalId = undefined;
                    }

                }, delayMs);
            }

            function applyPayloadFunction() {
                let result;

                try {
                    result = payloadFunction.apply(null, params);
                    lastParamsApplied = true;
                    params = undefined;

                    callback && callback(result);
                } catch (err) {
                    if (onError) {
                        onError(err);
                    } else {
                        console.error('Error in AppUtil.throttle:', err);
                    }
                }
                
            }
        }
    };


})(typeof module !== 'undefined' ? module.exports : window);
