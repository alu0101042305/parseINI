var parseINI = function(string){

  let WHITES = /\s+|;.*/y;
  let SECTION = /\[(.*)\]/y;
  let SETTING = /(\w+)=([^\n]+)/y;
  let tokens = [WHITES, SECTION, SETTING];

  let object = {};
  let actual_section = object;
  var m;  //match
  var i = 0;

var advanceIndex = function() {
  var str = m[0];
  i += str.length; // Warning! side effect on i
};

// Begin tokenization. If the source string is empty, return nothing.
if (!string) return object;

// Loop through this text
while (i < string.length) {
    tokens.forEach( function(t) { t.lastIndex = i;}); // Only ECMAScript5
    // Ignore whitespace and comments
    if (m = WHITES.exec(string)) {
        ;
     }
    // section.
    else if (m = SECTION.exec(string)) {
      object[m[1]] = {};
      actual_section = object[m[1]];
    }
    // setting.
    else if (m = SETTING.exec(string)) {
      actual_section[m[1]] = m[2];
    } else {
      throw new Error("Error");
    }
    advanceIndex();
}
return object;
};

module.exports = parseINI;
console.log(parseINI(`
    name=Torres Quevedo
    [address]
    invention=The chess player`));
