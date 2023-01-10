document
  .getElementById("contact-form")
  .addEventListener("click", function (event) {
    let email = document.querySelector("#email").value;
    let username = document.querySelector("#name").value;
    var data = {
      service_id: "service_j0l7plp",
      template_id: "template_xp2z9de",
      user_id: "v2wktVtvpWLifxNms",
      template_params: {
        username: username,
        email: email,
        "g-recaptcha-response": "03AHJ_ASjnLA214KSNKFJAK12sfKASfehbmfd..."
      }
    };
    $.ajax("https://api.emailjs.com/api/v1.0/email/send", {
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json"
    })
      .done(function () {
        alert("Your mail is sent!");
      })
      .fail(function (error) {
        alert("Oops... " + JSON.stringify(error));
      });
  });
