import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export const errorMessage = (title, message) => {
  MySwal.fire(
    {
      title: title,
      html: message,
      icon: 'error',
    }
  )
}

export const successMessage = (success, messageSuccess) => {
  return MySwal.fire(
    `${success}`,
    `${messageSuccess}`,
    'success'
  )
}

export const warningMessage = (warning, messageWarning) => {
  return Swal.fire(
    `${warning}`,
    `${messageWarning}`,
    'warning'
  )
}
