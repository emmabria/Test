//#region Global Vars
var PassEncode = 'EncodeChallenge';
var Action = 0;
var UpdateEnabled = false;
var EnabledRegisterSuscripcion = false;
var idCurrentSuscriptor=0;
//#endregion


//#region Load Page

$(document).ready(function () {

    LoadSelectDocumentType();


});


//#endregion


//#region Load Document Type

LoadSelectDocumentType = () => {

    $('#SelectDocumentType').append('<option value="1">DNI</option>');

}

//#endregion



//#region Search

$('#btnSearch').click(function () {


    SearchUser();

});


SearchUser = () => {

    ClearFrm();

    let IdDocumentType = $('#SelectDocumentType').val();
    let DocumentNumber = $('#IptDocumentNumber').val();

    let par = {
        TipoDocumento: IdDocumentType,
        NumeroDocumento: String(DocumentNumber)
    }



    $.ajax({
        type: "POST",
        url: "/Subscriptions/SearchUser",
        data: JSON.stringify(par),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {


            if (data == null) {

                ztoast("No se encontro suscriptor<br> Puede darse de alta clickeando el botón<br> <b>NUEVO</b>", {
                    title: 'Atención',
                    type: 'warning',
                    position: 'top-right',
                    duration: 5000
                });
                UpdateEnabled = false;
                EnabledRegisterSuscripcion = false;
                idCurrentSuscriptor = 0;
                $('#IptStatus').val('No suscripto');

            } else {
                UpdateEnabled = true;
                EnabledRegisterSuscripcion = true;
                ztoast("Suscriptor encontrado", {
                    title: 'Éxito',
                    type: 'success',
                    position: 'top-right',
                    duration: 3000
                });

                idCurrentSuscriptor = data.IdSuscriptor;

                $('#IptName').val(data.nombre);
                $('#IptLastname').val(data.apellido);
                $('#IptAddress').val(data.direccion);
                $('#IptEmail').val(data.email);
                $('#IptPhone').val(data.telefono);
                $('#IptStatus').val('Suscripto');
                $('#IptUserName').val(data.nombreUsuario);


                let pass_decrypted = CryptoJS.AES.decrypt('U2FsdGVkX19ue4bo0vc4xJO0NMbCOX6hCG7xwBIfb8Y=', PassEncode);
                let pass = pass_decrypted.toString(CryptoJS.enc.Utf8);

         

                $('#IptPassword').val(pass);
            }





        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            console.log(xmlHttpRequest.responseText);
            console.log(textStatus);
            console.log(errorThrown);

        },
        beforeSend: function () {

            $(".se-pre-con").show();
        },
        complete: function () {

            $(".se-pre-con").hide();

        }
    })

}


//#endregion


//#region Actions


ClearFrm = () => {

    $('#IptName').val('');
    $('#IptLastname').val('');
    $('#IptAddress').val('');
    $('#IptEmail').val('');
    $('#IptPhone').val('');
    $('#IptStatus').val('');
    $('#IptUserName').val('');
    $('#IptPassword').val('');


}


$('#btnCancel').click(function () {

    Action = 0;
    ClearFrm();
    $('#IptDocumentNumber').val('');

});


$('#btnUpdate').click(function () {


   
        

    if (UpdateEnabled== true) {
        Action = 2;

        $('#SelectDocumentType').attr('disabled', true);
        $('#IptDocumentNumber').attr('disabled', true);

        EnabledFrm();
        $('#IptUserName').attr('disabled', true);
    } else {
        ztoast("Primero ingrese un Tipo y Número de Documento y haga la busqueda correspondiente</b>", {
            title: 'Atención',
            type: 'warning',
            position: 'top-right',
            duration: 5000
        });
    }
  


});



$('#btnNew').click(function () {


    Action = 1;
    ClearFrm();
    EnabledFrm();
    $('#IptUserName').attr('disabled', false);


});




EnabledFrm = () => {

    $('#IptName').attr('disabled', false);
    $('#IptLastname').attr('disabled', false);
    $('#IptAddress').attr('disabled', false);
    $('#IptEmail').attr('disabled', false);
    $('#IptPhone').attr('disabled', false);
    $('#IptPassword').attr('disabled', false);

}




//#endregion


//#region Validate Email

validateEmail = (valor) => {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(valor)) {
        return true;
    } else {
        return false;
    }
}


//#endregion


//#region Register/Update User

$('#btnSave').click(function () {

    let name = $('#IptName').val();
    let lastName = $('#IptLastname').val();
    let documentNumber = $('#IptDocumentNumber').val();
    let idDocumentType = $('#SelectDocumentType').val();
    let address = $('#IptAddress').val();
    let phone = $('#IptPhone').val();
    let email = $('#IptEmail').val();
    let userName = $('#IptUserName').val();
    let pass = $('#IptPassword').val();

  

    let password = CryptoJS.AES.encrypt(String(pass), PassEncode);



    if (Action == 1) {

        ValidateCreate(name, lastName, documentNumber, idDocumentType, address, phone, email, userName, password);

    } else if (Action == 2) {

        ValidateUpdate(name, lastName, documentNumber, idDocumentType, address, phone, email, userName, password);

    }





});

ValidateCreate = (name, lastName, documentNumber, idDocumentType, address, phone, email, userName, password) => {

    if (name == '') {

        ztoast("Ingrese un nombre, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });

    } else if (lastName == '') {

        ztoast("Ingrese un apellido, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });


    } else if (documentNumber == '') {

        ztoast("Ingrese un Número de Documento, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });


    } else if (address == '') {

        ztoast("Ingrese una dirección, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });

    } else if (email == '') {

        ztoast("Ingrese un email, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });

    } else if (validateEmail(email) == false) {

        ztoast("Ingrese un email válido, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });


    } else if (phone == '') {


        ztoast("Ingrese un teléfono, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });


    } else if (userName == '') {


        ztoast("Ingrese un usuario, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });

    } else if (password == '') {


        ztoast("Ingrese una contraseña, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });

    } else {
        Create(name, lastName, documentNumber, idDocumentType, address, phone, email, userName, password);
    }


}

Create = (name, lastName, documentNumber, idDocumentType, address, phone, email, userName, password) => {


    let par = {
        IdSuscriptor: 0,
        Nombre: name,
        Apellido: lastName,
        NumeroDocumento: String(documentNumber),
        TipoDocumento: idDocumentType,
        Direccion: address,
        Telefono: phone,
        Email: email,
        NombreUsuario: userName,
        Password: String(password)
    }

    $.ajax({
        type: "POST",
        url: "/Subscriptions/AddSuscriptor",
        data: JSON.stringify(par),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {


            if (data == 201) {
                // 201 username is use
                ztoast("Nombre de usuario en uso", {
                    title: 'Error',
                    type: 'error',
                    position: 'top-right',
                    duration: 3000

                });

            } else if (data == 202) {

                // 202 documentNumber and type is use
                ztoast("Tipo y/o Número de Documento en uso", {
                    title: 'Error',
                    type: 'error',
                    position: 'top-right',
                    duration: 3000


                });

            } else if (data == 200) {
                //200 success
                ztoast("Suscriptor registrado correctamente", {
                    title: 'Éxito',
                    type: 'success',
                    position: 'top-right',
                    duration: 3000
                });

            }







        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
         
            ztoast("No se pudo crear", {
                title: 'Error',
                type: 'error',
                position: 'top-right',
                duration: 3000


            });

        },
        beforeSend: function () {

            $(".se-pre-con").show();
        },
        complete: function () {

            $(".se-pre-con").hide();

        }
    })


}

ValidateUpdate = (name, lastName, documentNumber, idDocumentType, address, phone, email, userName, password) => {

    if (name == '') {

        ztoast("Ingrese un nombre, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });

    } else if (lastName == '') {

        ztoast("Ingrese un apellido, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });


    } else if (documentNumber == '') {

        ztoast("Ingrese un Número de Documento, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });


    } else if (address == '') {

        ztoast("Ingrese una dirección, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });

    } else if (email == '') {

        ztoast("Ingrese un email, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });

    } else if (validateEmail(email) == false) {

        ztoast("Ingrese un email válido, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });


    } else if (phone == '') {


        ztoast("Ingrese un teléfono, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });



    } else if (password == '') {


        ztoast("Ingrese una contraseña, por favor", {
            title: 'Error',
            type: 'error',
            position: 'top-right',
            duration: 3000
        });

    } else {
        Update(name, lastName, documentNumber, idDocumentType, address, phone, email, userName, password);
    }


}

Update = (name, lastName, documentNumber, idDocumentType, address, phone, email, userName, password) => {

    let par = {
        IdSuscriptor: 0,
        Nombre: name,
        Apellido: lastName,
        NumeroDocumento: String(documentNumber),
        TipoDocumento: idDocumentType,
        Direccion: address,
        Telefono: phone,
        Email: email,
        NombreUsuario: userName,
        Password: String(password)
    }

    $.ajax({
        type: "POST",
        url: "/Subscriptions/UpdateSuscriptor",
        data: JSON.stringify(par),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {


             if (data == 200) {
                //200 success
                ztoast("Suscriptor modificado correctamente", {
                    title: 'Éxito',
                    type: 'success',
                    position: 'top-right',
                    duration: 3000
                });

            }







        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {

            ztoast("No se pudo modificar", {
                title: 'Error',
                type: 'error',
                position: 'top-right',
                duration: 3000


            });


        },
        beforeSend: function () {

            $(".se-pre-con").show();
        },
        complete: function () {

            $(".se-pre-con").hide();

        }
    })

}

//#endregion


//#region Suscripcion


$('#btnRegister').click(function () {

    if (EnabledRegisterSuscripcion==true) {

        CreateSuscripcion();

    } else {
        ztoast("Primero ingrese un Tipo y Número de Documento y haga la busqueda correspondiente</b>", {
            title: 'Atención',
            type: 'warning',
            position: 'top-right',
            duration: 5000
        });
    }


});



CreateSuscripcion = () => {

    let dateNow = new Date();

    let par = {
        IdAsociacion:0,
        IdSuscriptor: idCurrentSuscriptor,
        FechaAlta: dateNow,
        FechaFin: dateNow,
        MotivoFin: '' 
    }

    $.ajax({
        type: "POST",
        url: "/Subscriptions/AddSuscripcion",
        data: JSON.stringify(par),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {


             if (data == 201) {

                // 201 current subscription

                ztoast("Ya posee una suscripción vigente", {
                    title: 'Error',
                    type: 'error',
                    position: 'top-right',
                    duration: 3000


                });

            } else if (data == 200) {
                //200 success
                ztoast("Suscripción registrada correctamente", {
                    title: 'Éxito',
                    type: 'success',
                    position: 'top-right',
                    duration: 3000
                });

            }







        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {

            ztoast("No se pudo registrar la suscripción", {
                title: 'Error',
                type: 'error',
                position: 'top-right',
                duration: 3000


            });

        },
        beforeSend: function () {

            $(".se-pre-con").show();
        },
        complete: function () {

            $(".se-pre-con").hide();

        }
    })

}



//endregion




$(window).on('load', function () {
    $(".se-pre-con").fadeOut("slow");
});

