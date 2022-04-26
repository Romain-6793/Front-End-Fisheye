
const sendButton = document.querySelectorAll(".send_button");
const modalbg = document.getElementById("contact_modal");
const modalbg2 = document.getElementById("confirm_modal");
const close2 = document.querySelectorAll(".close2");

sendButton.forEach((button) => button.addEventListener("click", launchSubmit));
close2.forEach((button) => button.addEventListener("click", () => {
    document.forms[0].reset();
    closeModal2();
}))

let rightFirstName;
let rightLastName;
let rightMail;
let rightMessage;

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    const likesPopup = document.getElementById("likes_popup");
    likesPopup.style.display = "none";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    const likesPopup = document.getElementById("likes_popup");
    likesPopup.style.display = "block";
}

function closeModal2() {
    const modal = document.getElementById("confirm_modal");
    modal.style.display = "none";
    const likesPopup = document.getElementById("likes_popup");
    likesPopup.style.display = "block";
}

function isMyFirstNameTrue(myFirstName) {
    if ((myFirstName.length >= 2) && (!myFirstName.match(/^[\d]+$/))) {
        rightFirstName = true;
        document.getElementById("formData1").setAttribute("data-error", "false");
        document.getElementById("formData1").setAttribute("data-error-visible", "false");
    } else {
        rightFirstName = false;
        document.getElementById("formData1").setAttribute("data-error", "Veuillez saisir un prénom valide");
        document.getElementById("formData1").setAttribute("data-error-visible", "true");
    }

}

// Même principe avec le nom de famille que pour la fonction du prénom.

function isMyLastNameTrue(myLastName) {
    if ((myLastName.length >= 2) && (!myLastName.match(/^[\d]+$/))) {
        rightLastName = true;
        document.getElementById("formData2").setAttribute("data-error", "false");
        document.getElementById("formData2").setAttribute("data-error-visible", "false");
    } else {
        rightLastName = false;
        document.getElementById("formData2").setAttribute("data-error", "Veuillez saisir un nom valide");
        document.getElementById("formData2").setAttribute("data-error-visible", "true");
    }
}

function isMailTrue(myMail) {
    if (myMail.match(/^[a-zA-Z0-9_+\.]+@[a-zA-Z0-9]+\.[a-z]+$/)) {
        rightMail = true;
        document.getElementById("formData3").setAttribute("data-error", "false");
        document.getElementById("formData3").setAttribute("data-error-visible", "false");
    } else {
        rightMail = false;
        document.getElementById("formData3").setAttribute("data-error", "Veuillez saisir une adresse e-mail valide");
        document.getElementById("formData3").setAttribute("data-error-visible", "true");
    }

}

function isMyMessageCorrect(myMessage) {
    if (myMessage.length >= 2) {
        rightMessage = true;
        document.getElementById("formData4").setAttribute("data-error", "false");
        document.getElementById("formData4").setAttribute("data-error-visible", "false");
    } else {
        rightMessage = false;
        document.getElementById("formData4").setAttribute("data-error", "Votre message doit contenir au moins deux caractères");
        document.getElementById("formData4").setAttribute("data-error-visible", "true");
    }

}


function launchSubmit(e) {
    e.preventDefault();
    const firstNameData = document.querySelector(".firstname").value;
    isMyFirstNameTrue(firstNameData);
    const lastNameData = document.querySelector(".lastname").value;
    isMyLastNameTrue(lastNameData);
    const mailData = document.querySelector(".mailadress").value;
    isMailTrue(mailData);
    const messageData = document.querySelector(".input_message").value;
    isMyMessageCorrect(messageData);

    if ((rightFirstName) && (rightLastName) && (rightMail)) {
        modalbg.style.display = "none";
        modalbg2.style.display = "block";
    }

}

