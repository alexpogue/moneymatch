/* This file is used to process strings. i.e. split them apart, compare them. */


/** This function is used to split strings into the given number apart.
 *  If the string cannot be splited into the given number apart, it will see each word as a part. (the most amount of parts)
 *  The returned parts are guarenteed to be unique.
 *  @param str The string need to be splited.
 *  @param numOfParts Number of parts we want the string to be splited to, if we cannot split into this amount of parts, split the string to the maximum amount possible.
 *  @return An array of all parts splitted by the function.
 */
function splitString(str, numParts) {
    // Array of all words
    var wordArr = [];
    wordArr = str.split(" ");
    // Final amount of parts we want.
    var numParts_final = Math.min(numParts, wordArr.length);
    // How many words are in a part (average)
    var numWordsInEachPart_f = wordArr.length/numParts_final;
    // Final result to return
    var strArr = [];
    for (var i = 0; i < numParts_final; ++i) {
        strArr[i] = "";
    }
    // Start appending strings to strArr
    var i = 0;
    var currentIndAtWordArr_f = numWordsInEachPart_f;
    var currentIndAtStrArr = 0;
    while (i < wordArr.length) { // Nested loop, but runs at O(n)
        var currentNumOfWordsInPart = Math.round(currentIndAtWordArr_f - i);
        for (var j = 0; j < currentNumOfWordsInPart; ++j, ++i) {
            strArr[currentIndAtStrArr] += wordArr[i];
            if (j < currentNumOfWordsInPart - 1 && i < wordArr.length - 1) {
                strArr[currentIndAtStrArr] += " ";
            }
        }
        currentIndAtStrArr++;
        currentIndAtWordArr_f += numWordsInEachPart_f;
    }
    
    // Handle duplicate error
    solveDuplicatedStrProblem(strArr);
    
    // Debug code {
    //    console.log(strArr);
    // }
    
    return strArr;
}

/** Helper methods to solve the duplicated string problem. If there are duplicated strings in strArr, change one of the duplicated strings.
 *  @param strArr The array of strings need to be analized.
 */
function solveDuplicatedStrProblem(strArr) {
    if (strArr.length <= 1 ) {
        return;
    }
    var duplicated = false;
    var duplicatedString;
    var tempArr = strArr.slice(0);
    tempArr.sort();
    for (var i = 0; i < tempArr.length - 1; ++i) {
        if (tempArr[i] === tempArr[i + 1]) {
            duplicated = true;
            duplicatedString = tempArr[i];
            break;
        }
    }
    
    // Debug code {
    //    if (duplicatedString) {
    //        console.log(duplicatedString);
    //    }
    // }
    
    // If there are duplicated string:
    if (duplicatedString) {
        var ind = strArr.indexOf(duplicatedString);
        
        if (duplicatedString && ind > 0) { // If it's not the first string in strArr
            var tempChunk = strArr[ind - 1].split(" ");
            if (tempChunk.length > 1) { // If there are more than one word in the previouse string:
                strArr[ind] = tempChunk[tempChunk.length - 1] + " " +strArr[ind];
                strArr[ind - 1] = strArr[ind - 1].substring(0, strArr[ind - 1].length - tempChunk[tempChunk.length - 1].length - 1);
                duplicatedString = false;
            }
        }
        
        if (duplicatedString && ind < strArr.length - 1) { // If it's not the last string in strArr
            var tempChunk = strArr[ind + 1].split(" ");
            if (tempChunk.length > 1) { // If there are more than one word in the later string:
                strArr[ind] = strArr[ind] + " " + tempChunk[0];
                strArr[ind + 1] = strArr[ind + 1].substring(tempChunk[0].length + 1, strArr[ind + 1].length);
                duplicatedString = false;
            }
        }
            
        if (duplicatedString) {
            console.error("String contains duplicated string problem that is very hard to solve.");
            return;
        } else {
            solveDuplicatedStrProblem(strArr);
        }
    } else {
        return;
    }
}

