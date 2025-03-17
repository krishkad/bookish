import Swal from "sweetalert2";


export const displaySuccessAlert = (message) => {
    Swal.fire({
        title: '',
        titleText: message,
        icon: 'success'
    });
}


export const triggerErrorAlert = (message) => {
    Swal.fire({
        title: '',
        titleText: message,
        icon: 'error'
    })
}

export const confirmDeletion = () => {
    return Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });
}


export const showInfo = (message) => {
    Swal.fire({
        titleText: message,
        icon: 'info'
    })
}

export const showPasswordNeedsAlert = (reqs) => {

    const passwordNeeds  = `Password must be at least ${reqs.minLength} characters long,
                    contain at least one uppercase letter, one lowercase letter, one number, and one special character.`
    
    triggerErrorAlert(passwordNeeds);
}