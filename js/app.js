// 
// Función AUTO INVOCADA que ejecuta nuestro código...
// 
(function(){
    // 
    // Variables y Objetos Generales..
    // 
    var app = document.getElementById('app'); // accedemos al ID= "app"...
    var inputCaracteres = document.getElementById('numero-caracteres');
    // OBJETO de configuración...
    var configuracion = {
        caracteres: parseInt(inputCaracteres.value),
        simbolos: true,
        numeros: true,
        mayusculas: true,
        minusculas: true
    }
    // OBJETO caracteres...
    var caracteres = {
        numeros: '0 1 2 3 4 5 6 7 8 9',
        simbolos: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < ; > . ? /',
        mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }
    // 
    // Eventos...
    // 

    // Evento para evitar que app haga un submit...
    app.addEventListener('submit', function(e){
        e.preventDefault();
    })
    // Busca el elemento 'btn-mas-uno' dentro de la lista de los elementos...
    // para sumarle 1 cada vez que se le de click al botón de [+]...
    app.elements.namedItem('btn-mas-uno').addEventListener('click', function(){
        configuracion.caracteres++;
        // console.log(configuracion.caracteres);
        inputCaracteres.value = configuracion.caracteres;
    });
    // Busca el elemento 'btn-menos-uno' dentro de la lista de los elementos...
    // para restarle 1 cada vez que se le de click al botón de [-]...
    app.elements.namedItem('btn-menos-uno').addEventListener('click', function(){
        if (configuracion.caracteres > 1){  // No permite valores negativos...
            configuracion.caracteres--;
            // console.log(configuracion.caracteres);
            inputCaracteres.value = configuracion.caracteres;
        }
    });

    // Copiar el valor del Password cuando se le da Click...
    app.elements.namedItem('input-password').addEventListener('click', function(){
        copiarPassword();
    });

    // 
    // Funciones...
    // 
    function btnToggle(elemento){
        elemento.classList.toggle('false');
        elemento.childNodes[0].classList.toggle('fa-check');
        elemento.childNodes[0].classList.toggle('fa-times');
    }

    // Arreglo para iterar con los estos 3 elementos...
    var arrayElementos = ['btn-simbolos','btn-numeros','btn-mayusculas'];
    
    // Busca el elemento 'btn-simbolos' dentro de la lista de los elementos...
    // para cambiarle su valor y los iconos...
    for (let listElementos of arrayElementos){
        app.elements.namedItem(listElementos).addEventListener('click', function(){
            btnToggle(this);
            let varPos = listElementos.indexOf('-') +1;
            let varSub = listElementos.substring(varPos,listElementos.length)
            configuracion[varSub] = !configuracion[varSub];
            // console.log(configuracion[varSub]);
        });
    }
    app.elements.namedItem('btn-generar').addEventListener('click', function(){
        generarPassword();
    })

    function generarPassword(){
        var caracteresFinales = '';
        var password = '';

        // Buscamos los valores del objeto (caracteres) y los guardamos concatenados en una variable...
        for (let propiedad in configuracion){
            if (configuracion[propiedad] == true){
                caracteresFinales += caracteres[propiedad] + ' ';
            }
        }
        // console.log(caracteresFinales);
        caracteresFinales = caracteresFinales.trim();
        caracteresFinales = caracteresFinales.split(' '); // Arreglo de caracteres...
        // console.log(caracteresFinales);

        // Ejecutar la función al azar acorde al valor del objeto (configuracion.caracteres)...
        for (i=0; i < configuracion.caracteres; i++){
            password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)]
        }
        app.elements.namedItem('input-password').value = password;
    }   

    function copiarPassword(){
        app.elements.namedItem('input-password').select();
        document.execCommand('copy');
        document.getElementById('alerta-copiado').classList.add('active');
        
        setTimeout(function(){
            document.getElementById('alerta-copiado').classList.remove('active');
        }, 2000);
    }
    generarPassword();
}())