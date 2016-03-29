function getTag(url) {
    console.log('NEW TAGS YO');
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        console.log(req);
        handleRes(req);
    }
    req.open('GET', url);
    req.send();
}

function handleRes(req) {
    if (req.readyState !== XMLHttpRequest.DONE) return;
    if (req.status === 200) {
        // console.log(JSON.parse(req.responseText));
        var tagArr = JSON.parse(req.responseText).sendThis;
        tagArr.forEach(function(element, index, array) {
            console.log('Building no.' + index + ' at element: ' + element.tagName);
            buildSol(element);
        })
        $('.selectpicker').selectpicker('refresh');
    }
}

function buildSol(id) {
    document.querySelector("#solCat").innerHTML += tag(id);
}