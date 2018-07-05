"use strict";
$(document).ready(function() {
  $.getJSON("data.json").then(function(payload) {
  for(var newValue of payload.data){
    $("#Formselect").append(
      '<option value="' + newValue + '">' + newValue + "</option>");

  }
});
  /*function cleanup(obj)
    {
        $(obj).parent().next().find("span").html("");

    }
    $("#inputtext,#Textarea1,#usertext,#pwdtext,#brokertext").blur(function()
    {
        cleanup(this);
        var NAMEREGEX = /^[A-Za-z0-9]{3,20}$/;

        var isValidTxt = NAMEREGEX.test($(this).val());

        if(!isValidTxt)
        {
            $(this).parent().next().find("span").text("Enter Numbers And Alphabets Only").css("color","red");
        }

    });*/

  $("#btn1").click(function() {
    var newValue = $("input[name=region]").val();
    $("#Formselect").append(
      '<option value="' + newValue + '">' + newValue + "</option>"
    );

    $("#inputName").val("");
  });

  $("select").on("click", function() {
    console.log(
      $(this)
        .find("option:selected")
        .text(),
      "       selected"
    );
    $("#inputName").val(
      $(this)
        .find("option:selected")
        .text()
    );
  });

  $("#inputsearch").on("keyup", function() {
    var ssearch = $("#inputsearch").val();
    $("#Formselect")
      .find("option")
      .hide();

    $(`select :contains("${ssearch}")`).show();
  });
var cEditor = CodeMirror.fromTextArea(document.getElementById("c-code"), {
  lineNumbers: true,
  matchBrackets: true,
  theme:"midnight",
  mode: "text/x-csrc"
});
var cppEditor = CodeMirror.fromTextArea(document.getElementById("cpp-code"), {
  lineNumbers: true,
  matchBrackets: true,
  theme:"midnight",
  mode: "text/x-c++src"
});
var javaEditor = CodeMirror.fromTextArea(document.getElementById("java-code"), {
  lineNumbers: true,
  matchBrackets: true,
  theme:"midnight",
  mode: "text/x-java"
});
var csharpEditor=CodeMirror.fromTextArea(document.getElementById("csharp-code"),{
  lineNumbers:true,
  matchbrackets:true,
  theme:"midnight",
  mode:"text/x-csharp"

});
var cssEditor=CodeMirror.fromTextArea(document.getElementById("css-code"),{
  lineNumbers:true,
  matchbrackets:true,
  theme:"midnight",
  mode:"text/css"
});
var mac = CodeMirror.keyMap.default == CodeMirror.keyMap.macDefault;
CodeMirror.keyMap.default[(mac ? "Cmd" : "Ctrl") + "-Space"] = "autocomplete";


});
