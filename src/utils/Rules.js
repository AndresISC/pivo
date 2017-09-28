export default{
     isEmpty: (value) => {
      return !!value || 'Campo requerido'
    },
     isValidEmail: (value) => {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) || 'Dirección de correo no válida'
    }
}
