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
    var wordArr = str.split(" ");
    // Final amount of parts we want.
    var numParts_final = Math.min(numParts, wordArr.size);
    // How many words are in a part (average)
    var numWordsInEachPart = wordArr.size/numParts_final;
    // Final result to return
    var strArr;
    // Start appending strings to strArr
    for (var i = 0; i < numParts_final; ++i) {
        strArr[i] = "";
        for (var j = 0; j < numWordsInEachPart; ++j) {
            strArr[i] += wordArr[i * numWordsInEachPart + j];
            if (j < numWordsInEachPart - 1 && 
                i * numWordsInEachPart + j < wordArr.size - 1 ) {
                strArr[i] += " ";
            }
        }
    }
    
    // test code
    for (var s in strArr) {
        console.log(s);
    }
    
    return strArr;
}

/** Helper methods to determin if there are duplicates in the strArr.
 *  @param strArr The array of strings need to be analized.
 *  @return Boolean value indicating if there are duplicates in the array or not.
 */
function stringDuplicated(strArr) {
    var strSet = new Set(strArr);
    return set.size = strArr.size;
}

