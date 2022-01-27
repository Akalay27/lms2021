module.exports = `<!DOCTYPE html>
<html>
    <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.1/p5.js" crossorigin=""></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.3.1/addons/p5.sound.min.js" crossorigin=""></script>
        <script>
            function getScriptOff(line) {
                var offs = [[77,"sketch"]];
                var l = 0;
                var file = '';
                for (var i=0; i<offs.length; i++) {
                    var n = offs[i][0];
                    if (n < line && n > l) {
                    l = n;
                    file = offs[i][1];
                    }
                }
                return [line - l, file];
            }
            //catch reference errors, via http://stackoverflow.com/a/12747364/2994108
            
            window.onerror = function (msg, url, lineNumber, columnNo, error) {
                var string = msg.toLowerCase();
                var substring = "script error";
                var data = {};
                if ((url.indexOf("http://") == 0 || url.indexOf("https://") == 0) && error.stack){
                var errorNum = error.stack.split('about:srcdoc:')[1].split(':')[0];
                var fileInfo = getScriptOff(errorNum);
                data = msg + ' (' + fileInfo[1] + ': line ' + fileInfo[0] + ')';
                } else {
                var fileInfo = getScriptOff(lineNumber);
                data = msg + ' (' + fileInfo[1] + ': line ' + fileInfo[0] + ')';
                }
                window.parent.postMessage(
                {
                    source: fileInfo[1],
                    messages: [
                    {
                        log: [
                        {
                            method: 'error',
                            data: [data],
                            id: Date.now().toString()
                        }
                        ]
                    }
                    ]
                }, '*');
            return false;
            };
            // catch rejected promises
            window.onunhandledrejection = function (event) {
            if (event.reason && event.reason.message && event.reason.stack){
                var errorNum = event.reason.stack.split('about:srcdoc:')[1].split(':')[0];
                var fileInfo = getScriptOff(errorNum);
                var data = event.reason.message + ' (' + fileInfo[1] + ': line ' + fileInfo[0] + ')';
                window.parent.postMessage(
                {
                    source: fileInfo[1],
                    messages: [
                    {
                        log: [
                        {
                            method: 'error',
                            data: [data],
                            id: Date.now().toString()
                        }
                        ]
                    }
                    ]
                }, '*');
            }
            };
      </script>
        <meta charset="utf-8">
    </head>
    <body>
        <script>{code}</script>
    </body>

</html>`