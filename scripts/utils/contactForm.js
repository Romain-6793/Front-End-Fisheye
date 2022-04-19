
const sendButton = document.querySelector(".contact_button");
const modalbg = document.getElementById("contact_modal");
const modalbg2 = document.getElementById("confirm_modal");

sendButton.addEventListener("click", launchSubmit);

let rightFirstName;
let rightLastName;
let rightMail;

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function closeModal2() {
    const modal = document.getElementById("confirm_modal");
    modal.style.display = "none";
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

function launchSubmit(e) {
    e.preventDefault();
    const firstNameData = document.querySelector(".firstname").value;
    isMyFirstNameTrue(firstNameData);
    const lastNameData = document.querySelector(".lastname").value;
    isMyLastNameTrue(lastNameData);
    const mailData = document.querySelector(".mailadress").value;
    isMailTrue(mailData);

    if ((rightFirstName) && (rightLastName) && (rightMail)) {
        modalbg.style.display = "none";
        modalbg2.style.display = "block";
    }
}

