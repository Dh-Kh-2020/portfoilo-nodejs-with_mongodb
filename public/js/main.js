function changeTheme() {    
    var element = document.body;
    element.classList.toggle("theme-mode");
    // var element2=document.getElementById("nav-link-id");
    // var element3=document.getElementById("nav-link-about-id");
    // var element4=document.getElementById("nav-link-services-id");
    // var element5=document.getElementById("nav-link-resume-id");
    // var element6=document.getElementById("changeLanguageBtn") ;
    // var x = document.getElementById("iconsDivId");
    // var y = x.getElementsByTagName("i");
    // var i;

    // if (document.getElementById('toggle-btn')) {
    //     for (i = 0; i < y.length; i++) {
    //         y[i].style.color = "white";
    //     } 
    //     element2.setAttribute('style','color: white');
    //     element3.setAttribute('style','color: white');
    //     element4.setAttribute('style','color: white');
    //     element5.setAttribute('style','color: white');
    //     element6.setAttribute('style','color: white');

    // } else {
    //     for (i = 0; i < y.length; i++) {
    //         y[i].style.color = "black";
    //     } 
    //     element2.setAttribute('style','color: black');
    //     element3.setAttribute('style','color: black');
    //     element4.setAttribute('style','color: black');
    //     element5.setAttribute('style','color: black');
    //     element6.setAttribute('style','color: black');
    // }
}

function validate(){
    var name = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("msg").value;

    var error_message = document.getElementById("error_message");
    error_message.style.padding = "10px";
    
    var text;
    if(name.length < 3 || name.length > 10){
      text = "Sorry! name must be >= 3 and <= 10";
      error_message.innerHTML = text;
      return false;
    }
    if(email.indexOf("@") == -1 || email.length < 6){
      text = "Please Enter valid Email!";
      error_message.innerHTML = text;
      return false;
    }
    if(message.length < 20){
      text = "Sorry! massege must be more than 20 characters";
      error_message.innerHTML = text;
      return false;
    }
    // alert("Form Submitted Successfully!");
    return true;
}
