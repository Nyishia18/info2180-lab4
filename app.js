window.onload = () => {
  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", () => {
    fetch("superheroes.php")
    fetch(`superheroes.php?query=${encodeURIComponent(inputValue)}`)
      .then(response => response.text())
      .then(data => {
        alert(data); // show superhero list
      })
      .catch(error => console.error("Error:", error));
  });
};
