function readFile(input) {
    //let fileName = event.target.files[0].name;
    let file = input.files[0];
    let reader = new FileReader();
    reader.readAsText(file);
    reader.onload = function() {
        user.fileName = input.files[0].name;
        user.fileText = reader.result;
    };
    reader.onerror = function() {
        user.fileText = reader.error;
    };
    //return fileName;
}
let userJson;
let user = {};
function log(e) {
    e.preventDefault();
    $(document).ready(function() {
    user.name = $("#name").val();
    user.surname = $("#surname").val();
    user.age = $("#age").val();
    user.country = $("#country").val();
    user.gender = $("input[type=radio]:checked").val();
    user.phone = $("#phone").val();
    user.email = $("#email").val();
    userJson = JSON.stringify(user, null, 5);
    console.log(userJson);
    //prompt("is it okay?")
    }) // ready ends
}
