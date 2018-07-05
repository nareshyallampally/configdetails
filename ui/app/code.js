var editors = [];
$(document).ready(function() {


    var themeName = "midnight";

    var themes = ['3024-day', 'duotone-light', 'midnight', 'shadowfox', '3024-night', 'eclipse', 'monokai', 'solarized', 'abcdef', 'elegant', 'neat', 'the-matrix', 'ambiance-mobile', 'erlang-dark', 'neo', 'tomorrow-night-bright', 'ambiance', 'hopscotch', 'night', 'tomorrow-night-eighties', 'base16-dark', 'icecoder', 'oceanic-next', 'ttcn', 'base16-light', 'isotope', 'panda-syntax', 'twilight', 'bespin', 'lesser-dark', 'paraiso-dark', 'vibrant-ink', 'blackboard', 'liquibyte', 'paraiso-light', 'xq-dark', 'cobalt', 'lucario', 'pastel-on-dark', 'xq-light', 'colorforth', 'material', 'railscasts', 'yeti', 'dracula', 'mbo', 'rubyblue', 'zenburn', 'duotone-dark', 'mdn-like', 'seti', 'zenburn'];
    themes.forEach(function(theme) {
        $('#themeSelection').append(`<option value="${theme}">${theme}</option>`);
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", `/css/vendor/codemirror/5.36.0/theme/${theme}.css`);
        document.getElementsByTagName("head")[0].appendChild(fileref);
    });

    $('#themeSelection').change(function() {
        var selectCtrl = this;
        editors.forEach(function(editor) {
            var value = $(selectCtrl).val();
            editor.setOption("theme", value);
        });
    });
    var markers = [];
    $("#btnselectall").click(function() {
        editors.forEach(function(editor) {
            var totalcount = editor.lineCount();
          	var marker =  editor.markText({
                line: 0,
                ch: 0
            }, {
                line: totalcount
            }, {
                className: "styled-background"
            });
            markers.push(marker);
        });
        
    });

    $("#btndeselectall").click(function(){
    	markers.forEach(function(marker){
    		marker.clear();
    	});
    });


    var elementModeMapping = [{
            "elemId": "c-code",
            "mode": "text/x-csrc"
        },
        {
            "elemId": "cpp-code",
            "mode": "text/x-c++src"
        },
        {
            "elemId": "java-code",
            "mode": "text/x-java"
        },
        {
            "elemId": "csharp-code",
            "mode": "text/x-csharp"
        },
        {
            "elemId": "css-code",
            "mode": "text/css"
        }
    ];
    elementModeMapping.forEach(function(obj) {
        var editor = CodeMirror.fromTextArea(document.getElementById(obj.elemId), {
            lineNumbers: true,
            matchBrackets: true,
            lineWrapping: true,
            theme: themeName,
            mode: obj.mode,
            clearOnEnter: true,
            styleSelectedText: true

        });
        $.getJSON(`${obj.elemId}.json`).done(function(payload) {
            var decode = atob(payload.content);
            editor.setValue(decode);

        });
        editors.push(editor);
    });

    var mac = CodeMirror.keyMap.default == CodeMirror.keyMap.macDefault;
    CodeMirror.keyMap.default[(mac ? "Cmd" : "Ctrl") + "-Space"] = "autocomplete";

    var selectbox = "";
    for (i = 1; i <= 66; i++) {
        selectbox += '<option value =' + i + '>' + i + '</option>'
    }
    $("#numselect").html(selectbox);
    $("#numselect").change(function() {
    	markers.forEach(function(marker){
    		marker.clear();
    	});
    	// markers.length =0;
        $("#numselect option:selected").each(function() {
            var lineNum = +$(this).val();

            editors.forEach(function(editor) {
        		var marker=editor.markText({
                    line: lineNum - 1,
                    ch: 0
                }, {
                    line: lineNum,
                    ch: 0
                }, {
                    className: "styled-background"
                });
              
            	markers.push(marker);    
            });

        });
    });
});