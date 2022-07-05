async function getBuyData(startingIndexInt, endingIndexInt) {
    return new Promise(function(resolve) {
        if (String(startingIndexInt).length == 0 && String(endingIndexInt).length == 0) {
            resolve("No Data to POST");
        } else {
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.onload = function() {
                var gotten_Text = this.responseText;
                const datesetArray = gotten_Text.split('\n').slice(0,-1);
                resolve(datesetArray);
            }
        xmlhttp.open("POST", "backend/getFXData.php?case01=1&str=" + String(startingIndexInt) + "&ed=" + String(endingIndexInt));
        xmlhttp.send();
        }
    }) 
};

async function input_data(startingIndexInt, endingIndexInt) {
    return new Promise(function(resolve) {
        if (String(startingIndexInt).length == 0 && String(endingIndexInt).length == 0) {
            resolve("No Data to POST");
        } else {
            const xmlhttp = new XMLHttpRequest();
            
            xmlhttp.onload = function() {;
                var gotten_Text = this.responseText;
                const datesetArray = gotten_Text.split('\n').slice(0,-1);
                resolve(datesetArray);
            }
        xmlhttp.open("POST", "backend/getFXData.php?case01=2&str=" + String(startingIndexInt) + "&ed=" + String(endingIndexInt));
        xmlhttp.send();
        }
    }) 
};

