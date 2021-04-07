document.addEventListener('DOMContentLoaded', function() {
    /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
    document.getElementById("dropdownToggle").onclick = function() {
     document.getElementById("profileDropdown").classList.toggle("show");
  }

  document.getElementById("dropdownToggle").addEventListener('click', function (event) {
    event.stopPropagation();
});

  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.profile-dropdown')) {
      console.log(event.target);
      var dropdowns = document.getElementsByClassName("profile-dropdown-cont");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  document.getElementById("tutorDetailsToggle").addEventListener('click', function (event) {
      document.getElementById("tutorDetails").classList.toggle("showTutor");
      document.getElementById("clickGuide").classList.toggle("hide");
      document.getElementById("tutorDetailsToggle").classList.toggle("tutor-outline");
});


});