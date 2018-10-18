document.addEventListener('DOMContentLoaded', () =>{
    let name = document.getElementById('name'),
    email = document.getElementById('email'),
    surname = document.getElementById('surname'),
    phone = document.getElementById('phone'),
    form = document.getElementById('regForm'),
    error = document.querySelectorAll('.error'),
    lotteryBtn = document.querySelector('.new-winner'),
    winnersList = document.querySelector('.winners'),
    submitPart = document.querySelector('.submit-btn'),
    acceptBtn = document.querySelector('.edit-btn'),
    declineBtn = document.querySelector('.decline-edit-btn'),
    editBtn = document.querySelectorAll('.edit-button');
    
    document.querySelector('.submit-btn').addEventListener('click', (e)=>{

        createParticipant(e);
            for(let i = 0; i < document.querySelectorAll('.edit-button').length; i++){
                document.querySelectorAll('.edit-button')[i].addEventListener('click', editParticipant);
            }
           
    });
    lotteryBtn.addEventListener('click', (e) => {

        let listOfParticipants = document.querySelectorAll('.name-lottery');
        if(listOfParticipants.length < 2){
            alert('not enough participants');
        }
        else{
           let lotteryWinner = random(listOfParticipants);
           let arrayListOfParticipants = Array.prototype.slice.call(listOfParticipants);
           let index = arrayListOfParticipants.indexOf(lotteryWinner);

            if(index !== -1 ) 
            {
                arrayListOfParticipants.splice(index, 1);


                if (e.currentTarget.dataset.triggered) {



                    winnersList.innerHTML += '<span class="winner__text">' 
                    + ', ' + listOfParticipants[index].innerHTML+ '</span>' ;
                    listOfParticipants[index].parentNode.parentNode.removeChild(lotteryWinner.parentNode);
                    listOfParticipants = arrayListOfParticipants;
                    return;

                }



                e.currentTarget.dataset.triggered = true;
                winnersList.innerHTML = 'Our winner is: ' + '<span class="winner__text">' +listOfParticipants[index].innerHTML+ '</span>' ;
                listOfParticipants[index].parentNode.parentNode.removeChild(lotteryWinner.parentNode);
                listOfParticipants = arrayListOfParticipants;

            }
            
        }
    });


    for(let i = 0; i < editBtn.length; i++){
        editBtn[i].addEventListener('click', editParticipant);
    }







    function editParticipant(e){
            let currentEdit = e.target,
            parentEl = currentEdit.parentElement.parentElement;
            // editName = parentEl.querySelector('.name-lottery'),
            // editSurname = parentEl.querySelector('.surname-lottery'),
            // editEmail = parentEl.querySelector('.email-lottery'),
            // editPhone = parentEl.querySelector('.phone-lottery');
            name.value = parentEl.querySelector('.name-lottery').innerHTML;
            name.focus();
            moveCursorToEnd(name);
            surname.value = parentEl.querySelector('.surname-lottery').innerHTML;
            email.value = parentEl.querySelector('.email-lottery').innerHTML;
            phone.value = parentEl.querySelector('.phone-lottery').innerHTML;
            submitPart.classList.add('no-display');
            acceptBtn.classList.add('display');
            declineBtn.classList.add('display');


            
            acceptBtn.addEventListener('click', handleEditSubmition);
            declineBtn.addEventListener('click', handleDecline);
           

            function handleEditSubmition(e){
                e.preventDefault();
                if (!name.checkValidity()) {
                    document.querySelectorAll(".error")[0].innerHTML = name.validationMessage;
                }
                else if (!surname.checkValidity()) {
                    document.querySelectorAll(".error")[1].innerHTML = surname.validationMessage;
                }
                else if (!email.checkValidity()) {
                    document.querySelectorAll(".error")[2].innerHTML = email.validationMessage;
                }
                else{
                    parentEl.querySelector('.name-lottery').innerHTML = name.value;
                    parentEl.querySelector('.surname-lottery').innerHTML = surname.value;
                    parentEl.querySelector('.email-lottery').innerHTML = email.value;
                    parentEl.querySelector('.phone-lottery').innerHTML = phone.value;
                    form.reset();
                    console.log(parentEl);
                    
                }
                
                submitPart.classList.remove('no-display');
                acceptBtn.classList.toggle('display');
                declineBtn.classList.toggle('display');
                acceptBtn.removeEventListener('click', handleEditSubmition);
                declineBtn.removeEventListener('click', handleDecline);
        }

        function handleDecline(e){
            e.preventDefault();
            form.reset();
            submitPart.classList.remove('no-display');
            acceptBtn.classList.toggle('display');
            declineBtn.classList.toggle('display');
            acceptBtn.removeEventListener('click', handleEditSubmition);
            declineBtn.removeEventListener('click', handleDecline);
        }
            
    }
    function createParticipant(e){
        e.preventDefault();
        if (!name.checkValidity()) {
            document.querySelectorAll(".error")[0].innerHTML = name.validationMessage;
        }
        else if (!surname.checkValidity()) {
            document.querySelectorAll(".error")[1].innerHTML = surname.validationMessage;
        }
        else if (!email.checkValidity()) {
            document.querySelectorAll(".error")[2].innerHTML = email.validationMessage;
        }
        else{
            let tBody = document.querySelector('.table tbody');
            tBody.innerHTML += '<tr> \
            <td class="name-lottery">' +name.value+ '</td>\
            <td class="surname-lottery">' +surname.value+ '</td>\
            <td class="email-lottery">' +email.value+ '</td>\
            <td class="phone-lottery">' +phone.value+ '</td>\
            <td><button class="btn btn-info edit-button">Edit</button></td>\
            </tr>';
            for( let i = 0; i < error.length; i++){
                error[i].innerHTML = "";
            }

            form.reset();
            
        }
       
            
}
});


function random(list){
    return list[Math.floor((Math.random()*list.length))];
}

function moveCursorToEnd(el) {
    if (typeof el.selectionStart == "number") {
        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}

