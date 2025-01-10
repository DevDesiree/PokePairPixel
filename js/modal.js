let paused = true; 

document.addEventListener('DOMContentLoaded', () => {
    Swal.fire({
        title: "Let's Play!",
        text: "Tu misión es encontrar todos los pares antes de que se acabe el tiempo. ¡Buena suerte!",
        icon: 'info',
        confirmButtonText: '¡Entendido!',
        customClass: {
            popup: 'bg-gray-100 rounded-lg text-center',
            title: 'text-xl font-bold text-gray-800',
            confirmButton: 'bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600'
        },
    }).then(() => {
        paused = false;
    });
});



