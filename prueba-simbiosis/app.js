const listaUsuarios = document.getElementById('lista-usuarios');
const entradaBusqueda = document.getElementById('entrada-busqueda');
const botonBuscar = document.getElementById('boton-buscar');

let datosUsuarios = [];

// Funcion para mostrar usuarios
function mostrarUsuarios(usuarios) {
  listaUsuarios.innerHTML = '';

  if (usuarios.length === 0) {
    listaUsuarios.innerHTML = '<p>Usuario no encontrado.</p>';
    return;
  }

  usuarios.forEach(usuario => {
    const tarjetaUsuario = document.createElement('div');
    tarjetaUsuario.classList.add('tarjeta-usuario');
    tarjetaUsuario.innerHTML = `
      <h2>${usuario.name}</h2>
      <p>${usuario.email}</p>
    `;
    listaUsuarios.appendChild(tarjetaUsuario);
  });
}

// Funcion para obtener usuarios desde la API
async function obtenerUsuarios() {
  try {
    const respuesta = await fetch('https://jsonplaceholder.typicode.com/users');
    const datos = await respuesta.json();
    datosUsuarios = datos;
    mostrarUsuarios(datosUsuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
}

// Evento "Buscar"
botonBuscar.addEventListener('click', function() {
  const terminoBusqueda = entradaBusqueda.value.trim().toLowerCase();
  const usuariosFiltrados = datosUsuarios.filter(usuario => 
    usuario.name.toLowerCase().includes(terminoBusqueda)
  );
  mostrarUsuarios(usuariosFiltrados);
});

// Inicializar
obtenerUsuarios();
