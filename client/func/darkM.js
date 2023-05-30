//import '../index.css'

document.querySelector('#ativar-modo-escuro').addEventListener('click', () => {
    document.body.classList.toggle('temaEscuro'); 
    const statusModoEscuro = document.body.classList.contains('temaEscuro');
    localStorage.setItem('confirmTemaEscuro', statusModoEscuro);  
});

const init = () => {
    const modoEscuro = localStorage.getItem('confirmTemaEscuro');
    document.body.classList.add(modoEscuro ? 'temaEscuro' : ''); 
    document.querySelector('meta[name = "theme-color"').setAttribute('content', modoEscuro ? '#1a1a2e' : '#fff'); 
}; 

init(); 