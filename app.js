document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    const searchField = document.getElementById('searchField');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const query = searchField.value.trim().toLowerCase();

        // Always fetch the full list from PHP
        fetch('superheroes.php')
            .then(response => response.text())
            .then(data => {
                // Create a temporary DOM to parse PHP output
                const parser = new DOMParser();
                const htmlDoc = parser.parseFromString(data, 'text/html');
                const heroList = Array.from(htmlDoc.querySelectorAll('li'))
                    .map(li => li.textContent.trim());

                // If no query, show full list
                if (!query) {
                    resultDiv.innerHTML = `<ul>${heroList.map(hero => `<li>${hero}</li>`).join('')}</ul>`;
                    return;
                }

                // Match alias or name
                const heroes = {
                    "captain america": {
                        alias: "Captain America",
                        name: "Steve Rogers",
                        bio: "Recipient of the Super-Soldier serum, World War II hero Steve Rogers fights for American ideals as one of the world’s mightiest heroes and the leader of the Avengers."
                    },
                    "ironman": {
                        alias: "Ironman",
                        name: "Tony Stark",
                        bio: "Genius. Billionaire. Playboy. Philanthropist. Tony Stark's confidence is only matched by his high-flying abilities as the hero called Iron Man."
                    },
                    "spiderman": {
                        alias: "Spiderman",
                        name: "Peter Parker",
                        bio: "Bitten by a radioactive spider, Peter Parker’s arachnid abilities give him amazing powers he uses to help others, while his personal life continues to offer plenty of obstacles."
                    },
                    "captain marvel": {
                        alias: "Captain Marvel",
                        name: "Carol Danvers",
                        bio: "Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races."
                    },
                    "black widow": {
                        alias: "Black Widow",
                        name: "Natasha Romanov",
                        bio: "Despite super spy Natasha Romanoff’s checkered past, she’s become one of S.H.I.E.L.D.’s most deadly assassins and a frequent member of the Avengers."
                    },
                    "hulk": {
                        alias: "Hulk",
                        name: "Bruce Banner",
                        bio: "Dr. Bruce Banner lives a life caught between the soft-spoken scientist he’s always been and the uncontrollable green monster powered by his rage."
                    },
                    "hawkeye": {
                        alias: "Hawkeye",
                        name: "Clint Barton",
                        bio: "A master marksman and longtime friend of Black Widow, Clint Barton serves as the Avengers’ amazing archer."
                    },
                    "black panther": {
                        alias: "Black Panther",
                        name: "T'challa",
                        bio: "T’Challa is the king of the secretive and highly advanced African nation of Wakanda - as well as the powerful warrior known as the Black Panther."
                    },
                    "thor": {
                        alias: "Thor",
                        name: "Thor Odinson",
                        bio: "The son of Odin uses his mighty abilities as the God of Thunder to protect his home Asgard and planet Earth alike."
                    },
                    "scarlett witch": {
                        alias: "Scarlett Witch",
                        name: "Wanda Maximoff",
                        bio: "Notably powerful, Wanda Maximoff has fought both against and with the Avengers, attempting to hone her abilities and do what she believes is right to help the world."
                    }
                };

                const hero = heroes[query];

                if (hero) {
                    resultDiv.innerHTML = `
                        <h3>${hero.alias.toUpperCase()}</h3>
                        <h4>A.K.A ${hero.name.toUpperCase()}</h4>
                        <p>${hero.bio}</p>
                    `;
                } else {
                    resultDiv.innerHTML = `<p style="color:red;font-weight:bold;">SUPERHERO NOT FOUND</p>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                resultDiv.innerHTML = `<p style="color:red;">Error loading superheroes.</p>`;
            });
    });
});
