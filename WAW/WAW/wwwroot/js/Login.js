function ValidateAndLogIn() {

    var Email = document.getElementById("signinemail").value;
    var Password = document.getElementById("signinpass").value;
   
    

    $.ajax({
        url: 'LogIn/ValidateAndLogIn',

        data: {
            "Email": Email,
            "Password": Password}
      
    }).done(function (res) {
        
        if (res == "Success") {
            $.ajax({
                url: 'LogIn/AddSteps'               
            })
        }
    });

}

function SignUp() {
    alert("Sign Up")


}

 