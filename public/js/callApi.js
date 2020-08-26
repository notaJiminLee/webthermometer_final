//import axios from "axios";
// $(document).ready(function () {
//     $.getJSON('https://localhost:3000/', function (data) {
//     console.log('hi' + data);
//     })
// });

// $(document).ready(function () {

// $.ajax({
//     type: "GET",
//     url: 'http://127.0.0.1:3000/',
//     dataType: 'json',
//     async: false,
//     success: function (response) {
//         console.log('성공');
//     }
    
// });

// $(document).ready(function (){
//     console.log('보여라');
// })
// import lists from "./../../list.json"

fetch('https://192.168.0.4:8080/')
// fetch 는 프로미스를 리턴하므로
// then / catch 구문을 사용할 수 있다.
.then(data => {
    return data.json();
})
.then(post => {
    console.log("hi" + post.title);
})

// $.getJSON('https://192.168.0.4:8080/', function(json) {
//     console.log(json); // this will show the info it in firebug console
// });

// axios.get('https://localhost:3000/', {
//     params: {
//       temp: 'temp'
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });  



//select Box 날짜 설정
// function todayDate() {
//     var date = new Date();
//     today = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
//     console.log(today);
//     $("#SelectDate").attr('value',today);
//     $("#SelectDate").attr('max',today);
// }

// //검색되 리스트 렌더링
// function setList(response) {
//     for (let i = 0; i < response.length; i++) {
//         $(".tablebody").append(
//             "<div class='studentSection' id='1234' name='지민'>" +
//             "<div class='cardId' id='" + response[i].webpath + "'></div>" +
//             "<div class='section date'>" + today + "</div>" +

//             "</div>"
//         );
//         // 1. 37.5도 보다 높으면 .studentSection over 로 클래스를 바꾼다.
//         // 2. 37.5도 보다 높으면 i를 id로 가지는 studentSection 클래스에 over을 추가한다.
//         if(response[i].temp > BASICTEMP){
//             $("#"+ i).attr("class","studentSection over");
//         }
//     }
// }