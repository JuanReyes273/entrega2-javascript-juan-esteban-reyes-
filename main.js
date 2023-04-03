const carrito = []

const ordenarMenorMayor = () => {
    lugares.sort((a,b) => a.precio - b.precio)
    mostrarLugares()
};

const mostrarLugares = () => {
    const listaLugares = lugares.map(lugar =>{
        return "- "+lugar.nombre+ " -  $"+lugar.precio
    })

    alert("Lista de lugares: "+"\n\n"+listaLugares.join("\n"))
    alquilarLugares(listaLugares)
};

const alquilarLugares = (listaLugares) => { 
    let lugarNombre = ""
    let lugarDias = 0
    let seguirAlquilando = false

    do {
        lugarNombre = prompt("Que lugar deseas alquilar? "+"\n\n"+listaLugares.join("\n"))
        lugarDias =parseInt(prompt("Cuantos dias deseas alquilar? "))

        const lugar = lugares.find(lugar => lugar.nombre.toLowerCase() === lugarNombre.toLowerCase())

        if (lugar) {
            agregarCarrito(lugar, lugar.id, lugarDias)
        } else{
            alert("El lugar no se encuentra disponible!")
        }

        seguirAlquilando = confirm("Desea alguilar algun otro lugar?")
    } while (seguirAlquilando);

    confirmarArquiler()
};

const agregarCarrito = (lugar, lugarId, lugarDias) => {
    const lugarRepetido = carrito.find(lugar => lugar.id === lugarId)
    if (lugarRepetido) {
        lugarRepetido.dias += lugarDias
    } else{
        lugar.dias += lugarDias
        carrito.push(lugar)
    }
    console.log(carrito);
};

const eliminarAlquilerCarrito = (alquilarAEliminar) => {
    carrito.forEach((lugar, index) => {
        if (lugar.nombre.toLowerCase() === alquilarAEliminar.toLowerCase()){
            if (lugar.dias > 1) {
                lugar.dias --
            } else{
                carrito.splice(index, 1)
            }
        }
    })
    confirmarArquiler()
};

const confirmarArquiler = () => {
    const listaCarrito = lugares.map(lugar =>{
        return "- "+lugar.nombre+ " | dias: "+lugar.dias
    })

    const confirmar = confirm("CheckOut: "
        +"\n\n"+listaCarrito.join("\n")
        +"\n\nPara continuar presione 'Aceptar' sino 'Cancelar' para eliminar una estadia"
    )

    if (confirmar) {
        finalizarAlquiler(listaCarrito)
    } else{
        const alquilarAEliminar = prompt("Ingrese el nombre del lugar a eliminar: " )
        eliminarAlquilerCarrito(alquilarAEliminar)
    }
};

const finalizarAlquiler = (listaCarrito) => {
    const diasTotal = carrito.reduce((acc, item) => acc + item.dias, 0)
    const precioTotal = carrito.reduce ((acc, item) => acc + (item.precio * item.dias), 0)

    alert("Detalle de su servicio: "
    +"\n\n"+listaCarrito.join("\n")
    +"\n\nTotal de su estadia: "+diasTotal
    +"\n\nEl total de su compra es: "+precioTotal
    +"\n\nGracias por su estadia!!!"
    )
};

ordenarMenorMayor()