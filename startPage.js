function pageChoice () {
    const pagestyle = document.getElementById('pagestyle').value;

    sessionStorage.setItem("PAGESTYLE", pagestyle);
    console.log(pagestyle)

    window.location.href = './declaration/declaration.html';
}