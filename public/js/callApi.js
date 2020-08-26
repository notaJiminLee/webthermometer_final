// $(function() {
//     var msgFromServer;
//     $.get( "/data", function( data ) {
//         msgFromServer = data[0].temp;
//         alert( "Received data from server!" );
//         console.log(msgFromServer);
//     });
// });
var response;
var today = new Date();

fetch('/data')
.then(data => {
    return data.json();
})
.then(post => {
    response = post;
    //console.log("hi" + post[0].temp);
    
    setList(response);
})
    
    

$("#filter").click(function () {
    let SelectDate = $("#SelectDate").val();
    today = SelectDate.charAt(2) + SelectDate.charAt(3) + SelectDate.charAt(5) + SelectDate.charAt(6) + SelectDate.charAt(8) + SelectDate.charAt(9);
    console.log(today);

    // 필터에 따른 정보를 모두 받아온다
    fetch('/data?date=' + today)
    .then(data => {
        return data.json();
    })
    .then(post => {
        response = post;
        //console.log("hi" + post[0].temp);
        setList(response);
    })

});

$("#nofilter").click(function () {
    // 필터에 따른 정보를 모두 받아온다
    fetch('/data')
    .then(data => {
        return data.json();
    })
    .then(post => {
        response = post;
        //console.log("hi" + post[0].temp);
        setList(response);
    })

});

//검색되 리스트 렌더링
function setList(response) {
    $(".studentSection").remove();
    for (let i = 0; i < response.length; i++) {
        var resulthour = response[i].webpath.charAt(25) + response[i].webpath.charAt(26);
        resulthour = gethour(resulthour);
        var year = "20" + response[i].webpath.charAt(19) + response[i].webpath.charAt(20);
        var month = response[i].webpath.charAt(21) + response[i].webpath.charAt(22);
        var date = response[i].webpath.charAt(23) + response[i].webpath.charAt(24);
        var minutes = response[i].webpath.charAt(27) + response[i].webpath.charAt(28)
        
        $(".tablebody").append(
            "<div class='studentSection' id='1234' name='지민'>" +
            "<div class='section date'>" + year + "." + month + "." + date + "</div>" +
            "<div class='section times'>" + resulthour + minutes + "분" + "</div>" +
            "<div class='section temp'>" + response[i].temp + "</div>" +
            "<a href='" + response[i].webpath + "' class='section path'>" + response[i].webpath + "</div>" + 
            "</div>"
        );
        // 1. 37.5도 보다 높으면 .studentSection over 로 클래스를 바꾼다.
        // 2. 37.5도 보다 높으면 i를 id로 가지는 studentSection 클래스에 over을 추가한다.
        if(response[i].temp > 37.5){
            $("#"+ i).attr("class","studentSection over");
        }
    }
}

function gethour(hour){
    hour = parseInt(hour);
    if (hour >= 12) {
        hour = "오후 " + (hour - 12).toString() + "시 ";
        return hour;
    }
    else if (hour == 0) {
        hour = "오전 " + "12시 ";
    }
    else if (hour < 12) {
        hour = "오전 " + (hour).toString() + "시 ";
        return hour;
    }
}