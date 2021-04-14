/* Includes: */
var http = require('http');
var url = require('url');
var fs = require('fs');

function menuMain(res) {
    res.write("<!DOCTYPE html>\n");
    res.write("<html>\n");
    res.write("  <head>\n");
    res.write("     <meta charset='utf-8'/>\n");
    res.write("     <style>\n");
    res.write("         body {background-image: url('https://www.penguinrandomhouse.ca/sites/default/files/inline-images/Bold%20Bookshelf.jpg')}\n");
    res.write("         .myBtn {transition: background 0.5s ease-in-out; display: block; margin-left: auto; margin-right: auto; margin-top: 10px; margin-bottom: 10px; background-color: #656EFF; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; font-size: 16px;}\n");
    res.write("         .myBtn:hover {background-color: #B3B8FF;}\n");
    res.write("         #main {width: 50%;margin: auto;}\n");
    res.write("     </style>\n");
    res.write("  </head>\n");
    res.write("  <body>\n");
    res.write("   <div id='main'>\n");
    res.write("     <form action ='/show')>");
    res.write("         <button class='myBtn' id='show' onclick='window.location.href = '/show'>Show bookshelf</button>\n")
    res.write("     </form>")
    res.write("     <form action ='/add')>");
    res.write("         <button class='myBtn' id='add' onclick='window.location.href = '/add'>Add book</button>\n")
    res.write("     </form>")
    res.write("     <form action ='/change')>");
    res.write("         <button class='myBtn' id='change' onclick='window.location.href = '/change'>Change book</button>\n")
    res.write("     </form>")
    res.write("     <form action ='/delete')>");
    res.write("         <button class='myBtn' id='delete' onclick='window.location.href = '/delete'>Delete book</button>\n")
    res.write("     </form>")
    res.write("   </div>")
    res.write("  </body>\n");
    res.write("</html>\n");
}

function showMain(res) {
    let data = fs.readFileSync('julFil.txt');
    let lines = data.toString().split(/\r?\n/);
    //pop to remove the empty line at the end of the .txtfile
    lines.pop();

    res.write("<!DOCTYPE html>\n");
    res.write("<html>\n");
    res.write("  <head>\n");
    res.write("    <meta charset='utf-8'/>\n");
    res.write("     <style>\n");
    res.write("         body {background-image: url('https://www.penguinrandomhouse.ca/sites/default/files/inline-images/Bold%20Bookshelf.jpg')}\n");
    //https://www.w3schools.com/css/css3_buttons.asp for button css
    //https://stackoverflow.com/questions/35972580/how-to-make-gradual-colour-change-when-hover-with-css/35972594 for gradual transition of colors
    res.write("         .myBtn {transition: background 0.5s ease-in-out; display: block; margin-left: auto; margin-right: auto; margin-top: 10px; margin-bottom: 10px; background-color: #656EFF; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; font-size: 16px;}\n");
    res.write("         .myBtn:hover {background-color: #B3B8FF;}\n");
    //https://www.w3schools.com/css/css_align.asp#:~:text=Center%20Align%20Elements,the%20edges%20of%20its%20container for div centering
    res.write("         #main {width: 50%;margin: auto;}\n");
    //https://www.w3schools.com/howto/howto_css_modals.asp popupwindow
    res.write("         .modal {display: none; position: fixed; z-index: 1; left: 0;  top: 0;  width: 100%;  height: 100%; overflow: auto;  background-color: rgb(0,0,0);  background-color: rgba(0,0,0,0.4);}\n");
    res.write("         .modal-content {background-color: #fefefe;  margin: 15% auto;  padding: 20px;  border: 1px solid #888;  width: 80%;}\n");
    res.write("     </style>\n");
    res.write("  </head>\n");
    res.write("  <body>\n");
    res.write("   <div id='main'>\n");
    res.write("     <select name='sortBy' id='sortBy' onchange='sort()'>\n");
    res.write("         <option value='nothing'>Sort by document order</option>\n");
    res.write("         <option value='bookalphabetic'>Sort by book name (alphabetic)</option>\n");
    res.write("     </select>\n");


    res.write("         <div id='buttonPlaceStandard'>\n")
    for (l of lines) {
        //button to modal
        let currentLine = l.split('|');
        // https://stackoverflow.com/questions/5963182/how-to-remove-spaces-from-a-string-using-javascript for .replace
        res.write(" <button class='myBtn' id=" + currentLine[2].replace(/\s/g, '') + ">" + currentLine[2] + "</button>\n")
    }
    res.write("         </div>\n");


    res.write("         <div id='buttonPlaceTitle' style='display: none;'>\n")
    var titleList = [];
    for (l of lines) {
        let currentLine = l.split('|');
        titleList.push(currentLine[2]);
    }
    titleList.sort();
    for (title of titleList) {
        res.write(" <button class='myBtn' id=" + title.replace(/\s/g, '') + "02" +">" + title + "</button>\n")
    }
    
    res.write("         </div>\n");

    //https://www.w3schools.com/howto/howto_css_modals.asp for pretty popupwindows
    for (l of lines) {
        let currentLine = l.split('|');
        res.write(" <div id=" + currentLine[2].replace(/\s/g, '') + 'Modal' + ' ' + "class='modal'>\n")
        res.write("     <div class='modal-content'>\n")
        res.write("     <p id=" + currentLine[2].replace(/\s/g, '') + 'Modal' + 'Author' + ">" + currentLine[0] + "</p>\n")
        res.write("     <p id=" + currentLine[2].replace(/\s/g, '') + 'Modal' + 'Title' + ">" + currentLine[2] + "</p>\n")
        res.write("     <p id=" + currentLine[2].replace(/\s/g, '') + 'Modal' + 'Year' + ">" + currentLine[3] + "</p>\n")
        res.write("     <p id=" + currentLine[2].replace(/\s/g, '') + 'Modal' + 'Status' + ">" + currentLine[4] + "</p>\n")
        res.write("     <p id=" + currentLine[2].replace(/\s/g, '') + 'Modal' + 'Rating' + ">" + currentLine[5] + "</p>\n")
        res.write("     </div>\n")
        res.write("</div>\n")
    }
    res.write("</div>\n");

    res.write("<script>");
    //https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal for .js code to open popups when a button is pressed
    for (l of lines) {
        let currentLine = l.split('|');
        res.write(" var " + currentLine[2].replace(/\s/g, '') + 'Modal' + " = document.getElementById(" + "'" + currentLine[2].replace(/\s/g, '') + 'Modal' + "'" + ");\n");
    }
    res.write(" \n");
    for (l of lines) {
        let currentLine = l.split('|');
        res.write(" var " + currentLine[2].replace(/\s/g, '') + " = document.getElementById(" + "'" + currentLine[2].replace(/\s/g, '') + "'" + ");\n");
    }
    res.write(" \n");
    for (l of lines) {
        let currentLine = l.split('|');
        res.write(currentLine[2].replace(/\s/g, '') + ".onclick = function() {" + currentLine[2].replace(/\s/g, '') + 'Modal' + ".style.display = 'block';} \n");
    }
    for (l of lines) {
        let currentLine = l.split('|');
        res.write(currentLine[2].replace(/\s/g, '') + "02" +  ".onclick = function() {" + currentLine[2].replace(/\s/g, '') + 'Modal' + ".style.display = 'block';} \n");
    }
    res.write(" \n");
    //https://stackoverflow.com/questions/45393553/window-onclick-functionevent-only-works-for-first-item for window.addeventlistener instead of window.onclick which works only for one window
    for (l of lines) {
        let currentLine = l.split('|');
        res.write("window.addEventListener('click', function(event) {  if (event.target == " + currentLine[2].replace(/\s/g, '') + 'Modal' + ") { " + currentLine[2].replace(/\s/g, '') + 'Modal' + ".style.display = 'none';}}) \n")
    }



    res.write("function sort() {\n");
    res.write(" selectValue = document.getElementById('sortBy').value;\n");
    res.write(" if (selectValue == 'bookalphabetic') { \n");
    res.write("     document.getElementById('buttonPlaceStandard').style.display = 'none'\n")
    res.write("     document.getElementById('buttonPlaceTitle').style.display = 'block'\n")
    res.write(" };\n");
    res.write(" if (selectValue == 'nothing') { \n");
    res.write("     document.getElementById('buttonPlaceStandard').style.display = 'block'\n")
    res.write("     document.getElementById('buttonPlaceTitle').style.display = 'none'\n")
    res.write(" };\n");
    res.write("};\n");


    //Hela idén med att ha osynliga divs för att byta ut varandra med är för att jag gav upp med det jag försökte med nedan.
    //Jag kunde inte få det att uppdatera knapparna med rätt information, det var som att den struntade i vilken ordning jag hade
    //titlar i. Ingen lärdom från det heller så det är lite tråkigt, men jag hittade en lösning i alla fall.



    /* res.write(" if (selectValue == 'year') { \n");
    res.write("     var dictYear = {\n");
    for (l of lines) {
        let currentLine = l.split('|');
        res.write("        " + "'" + currentLine[2].replace(/\s/g, '') + "':" + currentLine[3] + ", \n");
    }
    res.write("     };\n");

    //https://stackoverflow.com/questions/25500316/sort-a-dictionary-by-value-in-javascript for sorting function
    res.write("     var keyValues = [];\n")
    res.write("     for (var key in dictYear) {keyValues.push([key, dictYear[key]])};");
    res.write("     keyValues.sort(function compare(kv1, kv2) { return kv1[1] - kv2[1]});\n");

    res.write("     var itemsNew = []\n");
    res.write("     var itemsOriginal = []\n");
    for (l of lines) {
        let currentLine = l.split('|');
        res.write("itemsOriginal.push(" + "'" + currentLine[2].replace(/\s/g, '') + "'" + ")\n");
    }

    //res.write("     console.log(Object.values(items));");
    res.write("     console.log(itemsOriginal.slice());\n");
    res.write("     for (i = 0; i < itemsOriginal.length; i++) {\n");
    res.write("         document.getElementById(itemsOriginal[i]).innerText = document.getElementById(keyValues[i][0] + 'ModalTitle').innerText;\n");
    res.write("         itemsNew.push(keyValues[i].toString().split(',')[0])\n");
    res.write("     };\n");
    res.write("     for (i = 0; i < keyValues.length; i++) {\n");
    res.write("         document.getElementById(itemsOriginal[i]).id = keyValues[i][0];\n");
    res.write("     };\n");
    res.write("     console.log(itemsNew);\n");
    res.write(" };\n");
    res.write("};\n");
*/

    res.write("</script>");
    res.write("  </body>\n");
    res.write("</html>\n");
}

function addMain(res) {
    res.write("<!DOCTYPE html>\n");
    res.write("<html>\n");
    res.write("  <head>\n");
    res.write("    <meta charset='utf-8'/>\n");
    res.write("     <style>\n");
        //https://www.w3schools.com/css/tryit.asp?filename=trycss_forms for input windows css
    res.write("         body {background-image: url('https://www.penguinrandomhouse.ca/sites/default/files/inline-images/Bold%20Bookshelf.jpg')}\n");
    res.write("         input[type=text], select {width: 100 %; padding: 12px 20px; margin: 8px 0; display: inline - block; border: 1px solid #ccc; border - radius: 4px; box - sizing: border - box;}\n");
    res.write("         input[type=submit] {width: 100 %; background-color: #B3B8FF; color: white; padding: 14px 20px; margin: 8px 0; border: none; border - radius: 4px;cursor: pointer;}\n");
    res.write("         #main {width: 50%;margin: auto; background-color: #FFFFFF;}\n");
    res.write("     </style>\n");
    res.write("  </head>\n");
    res.write("  <body>\n");
    res.write("   <div id='main'>\n");
    res.write("     <form id='form1' action=' /append' method='get'>");
    res.write("         <label for='fullname'>Full Name:</label>");
    res.write("         <input type='text' id='fullname' name='fullname'>");
    res.write("         <br>");
    res.write("         <br>");
    res.write("         <label for='surname'>Surname only:</label>\n");
    res.write("         <input type='text' id='surname' name='surname'>\n");
    res.write("         <br>");
    res.write("         <br>");
    res.write("         <label for='booktitle'>Book title (letters):</label>\n");
    res.write("         <input type='text' id='booktitle' name='booktitle'>\n");
    res.write("         <br>");
    res.write("         <br>");
    res.write("         <label for='year'>Year released:</label>\n");
    res.write("         <input type='text' id='year' name='year'>\n");
    res.write("         <br>");
    res.write("         <br>");
    res.write("         <label for='readstatus'>Read or Not read:</label>\n");
    res.write("         <input type='text' id='readstatus' name='readstatus'>\n");
    res.write("         <br>");
    res.write("         <br>");
    res.write("         <label for='rating'>X/5 (0 if not read):</label>\n");
    res.write("         <input type='text' id='rating' name='rating'>\n");
    res.write("         <br>");
    res.write("         <br>");
    res.write("         <input type='submit' value='Submit'>\n");
    res.write("         <br>");
    res.write("     </form>")
    res.write("   </div>")
    res.write("  </body>\n");
    res.write("</html>\n");
}

function appendMain(res, query) {
    res.write("<!DOCTYPE html>\n");
    res.write("<html>\n");
    res.write("  <head>\n");
    res.write("    <meta charset='utf-8'/>\n");
    res.write("  </head>\n");
    res.write("  <body>\n");

    var fullname = query.fullname;
    var surname = query.surname;
    var booktitle = query.booktitle;
    var year = query.year;
    var readstatus = query.readstatus;
    var rating = query.rating;

    res.write("    <p>Added book with this information: " + fullname + "|" + surname + "|" + booktitle + "|" + year + "|" + readstatus + "|" + rating + "</p>");
    fs.appendFileSync('julFil.txt', fullname + "|" + surname + "|" + booktitle + "|" + year + "|" + readstatus + "|" + rating + "\r\n");

    res.write("  </body>\n");
    res.write("</html>\n");
}

function changeMain(res) {
    let data = fs.readFileSync('julFil.txt');
    let lines = data.toString().split(/\r?\n/);
    lines.pop();

    res.write("<!DOCTYPE html>\n");
    res.write("<html>\n");
    res.write("  <head>\n");
    res.write("    <meta charset='utf-8'/>\n");
    res.write("    <style>")
    res.write("         body {background-image: url('https://www.penguinrandomhouse.ca/sites/default/files/inline-images/Bold%20Bookshelf.jpg')}\n");
    res.write("         input[type=text], select {width: 100 %; padding: 12px 20px; margin: 8px 0; display: inline - block; border: 1px solid #ccc; border - radius: 4px; box - sizing: border - box;}\n");
    res.write("         input[type=submit] {width: 100 %; background-color: #B3B8FF; color: white; padding: 14px 20px; margin: 8px 0; border: none; border - radius: 4px;cursor: pointer;}\n");
    res.write("         #main {width: 50%;margin: auto; background-color: #FFFFFF;}\n");
    res.write("    </style>")
    res.write("  </head>\n");
    res.write("  <body>\n");
    //https://www.w3schools.com/tags/tag_select.asp for the select element
    res.write("   <div id='main'>\n");
    res.write("    <form action=' /edit' method='get'> \n")
    res.write("    <label for='index'>Choose a book:</label>\n");
    res.write("    <select name='index' id='mySelect'>\n");

    var count = 0;
    for (l of lines) {
        let currentLine = l.split('|');
        res.write(" <option value=" + count + ">" + currentLine[2] + "</option> \n");
        count += 1;
    }

    res.write("     </select> \n");
    res.write("         <br>");
    res.write("         <label for='fullname'>Full Name:</label>");
    res.write("         <input type='text' id='fullname' name='fullname'>");
    res.write("         <br>");
    res.write("         <br>");
    res.write("         <label for='surname'>Surname only:</label>\n");
    res.write("         <input type='text' id='surname' name='surname'>\n");
    res.write("         <br>");
    res.write("         <br>");
    res.write("         <label for='booktitle'>Book title (letters):</label>\n");
    res.write("         <input type='text' id='booktitle' name='booktitle'>\n");
    res.write("         <br>");
    res.write("         <br>");
    res.write("         <label for='year'>Year released:</label>\n");
    res.write("         <input type='text' id='year' name='year'>\n");
    res.write("         <br>");
    res.write("         <br>");
    res.write("         <label for='readstatus'>Read or Not read:</label>\n");
    res.write("         <input type='text' id='readstatus' name='readstatus'>\n");
    res.write("         <br>");
    res.write("         <br>");
    res.write("         <label for='rating'>X/5 (0 if not read):</label>\n");
    res.write("         <input type='text' id='rating' name='rating'>\n");
    res.write("         <br>");
    res.write("         <br>");
    res.write("         <input type='submit' value='Submit'>\n");
    res.write("         <br>");
    res.write("     </form>\n")
    res.write("   </div>\n")
    res.write("  <script> \n");
    res.write("  </body>\n");
    res.write("</html>\n");

}

function editMain(res, query) {
    let data = fs.readFileSync('julFil.txt');
    let lines = data.toString().split(/\r?\n/);


    res.write("<!DOCTYPE html>\n");
    res.write("<html>\n");
    res.write("  <head>\n");
    res.write("    <meta charset='utf-8'/>\n");
    res.write("    <style>")

    res.write("    </style>")
    res.write("  </head>\n");
    res.write("  <body>\n");

    var index = query.index;
    var fullname = query.fullname;
    var surname = query.surname;
    var booktitle = query.booktitle;
    var year = query.year;
    var readstatus = query.readstatus;
    var rating = query.rating;

    lines[index] = (fullname + "|" + surname + "|" + booktitle + "|" + year + "|" + readstatus + "|" + rating).toString();
    res.write("    <p>Edited book number: " + index + ". with this information: " + fullname + "|" + surname + "|" + booktitle + "|" + year + "|" + readstatus + "|" + rating + "</p>");

    fs.writeFile('julFil.txt', '', function () { console.log('emptied txt-file') });

    for (i = 0; i < lines.length - 1; i++) {
        if (i == lines.length - 1) {
            fs.appendFileSync('julFil.txt', lines[i]);
        } else {
            fs.appendFileSync('julFil.txt', lines[i] + "\n");
        }
    }

    res.write("  <script> \n");
    res.write("  </script> \n");
    res.write("  </body>\n");
    res.write("</html>\n");
}

function deleteMain(res) {
    let data = fs.readFileSync('julFil.txt');
    let lines = data.toString().split(/\r?\n/);
    lines.pop();

    res.write("<!DOCTYPE html>\n");
    res.write("<html>\n");
    res.write("  <head>\n");
    res.write("    <meta charset='utf-8'/>\n");
    res.write("    <style>")
    res.write("         body {background-image: url('https://www.penguinrandomhouse.ca/sites/default/files/inline-images/Bold%20Bookshelf.jpg')}\n");
    res.write("         input[type=text], select {width: 100 %; padding: 12px 20px; margin: 8px 0; display: inline - block; border: 1px solid #ccc; border - radius: 4px; box - sizing: border - box;}\n");
    res.write("         input[type=submit] {width: 100 %; background-color: #B3B8FF; color: white; padding: 14px 20px; margin: 8px 0; border: none; border - radius: 4px;cursor: pointer;}\n");
    res.write("         #main {width: 50%;margin: auto; background-color: #FFFFFF;}\n");
    res.write("    </style>")
    res.write("  </head>\n");
    res.write("  <body>\n");
    res.write("   <div id='main'>\n");
    res.write("    <form action='/remove' method='get'> \n")
    res.write("    <label for='index'>Choose a book:</label>\n");
    res.write("    <select name='index' id='mySelect'>\n");

    var count = 0;
    for (l of lines) {
        let currentLine = l.split('|');
        res.write("     <option value=" + count + ">" + currentLine[2] + "</option> \n");
        count += 1;
    }
    res.write("         <input type='submit' value='Submit'>\n");
    res.write("         <br>\n");
    res.write("     </select> \n");
    res.write("   </div>\n");
    res.write("  <script> \n");
    res.write("  </script> \n");
    res.write("  </body>\n");
    res.write("</html>\n");
}

function removeMain(res, query) {
    let data = fs.readFileSync('julFil.txt');
    let lines = data.toString().split(/\r?\n/);
    lines.pop();
    var index = query.index;

    res.write("<!DOCTYPE html>\n");
    res.write("<html>\n");
    res.write("  <head>\n");
    res.write("    <meta charset='utf-8'/>\n");
    res.write("    <style>")
    res.write("    </style>")
    res.write("  </head>\n");
    res.write("  <body>\n");

    let currentLine = lines[index].split('|');
    res.write("    <p>Removed book : " + currentLine[2] + ". </p>");

    fs.writeFile('julFil.txt', '', function () { console.log('emptied txt-file') });
    for (i = 0; i < lines.length; i++) {
        if (i == index) {

        } else {
            fs.appendFileSync('julFil.txt', lines[i] + "\n");
        }
    }
    res.write("  <script> \n");
    res.write("  </script> \n");
    res.write("  </body>\n");
    res.write("</html>\n");
}

/* Register server: */
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(req.url);
    var q = url.parse(req.url, true);
    var path = q.pathname;
    console.log("Serving " + req.url);

    if (path == "/") {
        menuMain(res);
    }
    if (path == "/show") {
        showMain(res);
    }
    if (path == "/add") {
        addMain(res);
    }
    if (path == "/append") {
        appendMain(res, q.query);
    }
    if (path == "/change") {
        changeMain(res);
    }
    if (path == "/edit") {
        editMain(res, q.query);
    }
    if (path == "/delete") {
        deleteMain(res);
    }
    if (path == "/remove") {
        removeMain(res, q.query);
    }
    res.end();
}).listen(8080);