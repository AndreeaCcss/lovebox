let text = ".......................... ............. ......... ....... .........................";
let words = text.split(" ");
function groupIntoLines() {
    var result = [];
    var line = words[0];
    if  (line.length > 21) {
        let nextLine = line.substr(0, 21);
        result.push(nextLine); 
        let nextSecondLine = line.substr(21, 21);
        result.push(nextSecondLine);
        line = line.substr(42, 21);
    };
    for (i = 1; i < words.length; i++) {
        let word = words[i]; 
        if(spaceLength = 1, spaceLength + line.length + word.length <= 21) {
            line = line + " " + word;
        } else if (line.length > 21) {
                let nextLine = line.substr(0, 21);
                result.push(nextLine);
                line = line.substr(21, 21); 
                result.push(line);
                line = word;
        } else {
            result.push(line);
            if (word.length > 21) {
                let nextSecondLine = word.substr(0, 21);
                result.push(nextSecondLine);
                line = word.substr(21, 21); 
            } else {
                line = word;
            }
        };         
    };
    result.push(line);
    return result;
};
console.log(groupIntoLines(words));