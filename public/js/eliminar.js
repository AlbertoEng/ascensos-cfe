

addEventListener('DOMContentLoaded',()=>{
    console.log('Ya me cargue');
    var elementos = document.getElementsByTagName('li');
    console.log(window.location)
    for(elemento of elementos){
        elemento.addEventListener('click',(e)=>{
            window.location.href = encodeURI(`http://localhost:3000/delete-worker/${e.target.innerText}`)
        })
    }
})


// darle la funcionalidad de que al hacer click vaya a buscar a db el dato que
// le corresponde y lo borre
