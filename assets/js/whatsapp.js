  /**
   * Whatsapp chat
   */
  // Whatsapp Chat Widget by www.bloggermix.com

  document.addEventListener('DOMContentLoaded', () => {
    "use strict";
  document.addEventListener("click", function (event) {
    if (event.target.id === "send-it") {
      var chatInput = document.getElementById("chat-input");
      if (chatInput.value !== "") {
        var phoneNumber = document.getElementById("get-number").textContent;
        var message = document.getElementById("chat-input").value;
        var whatsappWebURL = "https://web.whatsapp.com/send";
        var phone = phoneNumber;
        var text = "&text=" + message;
        if (
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          )
        ) {
          whatsappWebURL = "whatsapp://send";
        }
        var whatsappURL = whatsappWebURL + "?phone=" + phone + text;
        window.open(whatsappURL, "_blank");
      }
    }
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("informasi")) {
      document.getElementById("get-number").textContent =
        event.target.querySelector(".my-number").textContent;
      document
        .querySelectorAll(".start-chat, .get-new")
        .forEach(function (element) {
          element.classList.add("show");
          element.classList.remove("hide");
        });
      document
        .querySelectorAll(".home-chat, .head-home")
        .forEach(function (element) {
          element.classList.add("hide");
          element.classList.remove("show");
        });
      document.getElementById("get-nama").textContent =
        event.target.querySelector(".info-chat .chat-nama").textContent;
      document.getElementById("get-label").textContent =
        event.target.querySelector(".info-chat .chat-label").textContent;
    }
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("close-chat")) {
      document.getElementById("whatsapp-chat").classList.add("hide");
      document.getElementById("whatsapp-chat").classList.remove("show");
    }
  });

  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("chat-toggler")) {
      if (document.getElementById("whatsapp-chat").classList.contains("show")) {
        document.getElementById("whatsapp-chat").classList.add("hide");
        document.getElementById("whatsapp-chat").classList.remove("show");
      } else {
        document.getElementById("whatsapp-chat").classList.add("show");
        document.getElementById("whatsapp-chat").classList.remove("hide");
      }
    }
  });

  /**
   * Get current time
   */
  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";

    if (hours > 12) {
      hours -= 12;
    }

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    const currentTime = hours + ":" + minutes + " " + ampm;

    document.getElementById("current-time").textContent = currentTime;
  }

  getCurrentTime();
  setInterval(getCurrentTime, 60000);

  // Add a click event listener to the dropdown button
  document
    .getElementById("languageDropdown")
    .addEventListener("click", function () {
      var dropdownMenu = document.querySelector(".dropdown-menu");
      if (
        dropdownMenu.style.display === "none" ||
        dropdownMenu.style.display === ""
      ) {
        dropdownMenu.style.display = "block";
      } else {
        dropdownMenu.style.display = "none";
      }
    });

  /**
   * Whatsapp send message
   */
  document.getElementById("send-button").addEventListener("click", function () {
    const message = document.getElementById("message").value;
    const phoneNumber = "+254712345678"; // Replace with the recipient's phone number

    const apiToken = "YOUR_API_TOKEN";
    const apiUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}&source=web&data-id=${apiToken}`;
    window.open(apiUrl);
  });
});