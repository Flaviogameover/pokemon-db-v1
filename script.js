var pokemon_boxes = document.getElementsByClassName("pokemon-boxes")[0];
var pokemon_qtd = document.getElementById("pokemon_qtd");

pokemon_qtd.addEventListener("keyup",()=>{
    catch_pokemons(parseInt(pokemon_qtd.value));
})

const catch_pokemons = (pokemon_qtd) =>{
    pokemon_boxes.innerHTML = "";
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${pokemon_qtd}`).then(response => response.json()).then(all_pokemons =>{
        let pokemons = [];
        all_pokemons.results.map((val)=>{
                fetch(val.url).then(response => response.json()).then(all_info=>{
                pokemons.push(
                    {
                        name:capitalize(val.name),
                        img:all_info.sprites.front_default,
                        hp:all_info.stats[0].base_stat,
                        attack:all_info.stats[1].base_stat,
                        defense:all_info.stats[2].base_stat,
                        speed:all_info.stats[5].base_stat
                    }
                );
                /*
                <div class="pokemon-box">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png">
                    <p>Charizard</p>
                </div>
                 hp stats[0].base_stat atk stats[1].base_stat def stats[2].base_stat spd stats[5].base_stat
                */


                if(pokemons.length == pokemon_qtd){
                    pokemons.map((val)=>{
                        //pokemon-box-single
                        let pokemon_div_single = document.createElement('div');
                        let pokemon_img_single = document.createElement('img');

                        //pokemon-infobox
                        let pokemon_infobox_single = document.createElement('div');

                        pokemon_div_single.classList.add('pokemon-box');
                        pokemon_infobox_single.classList.add('pokemon-infobox');

                        pokemon_img_single.src = val.img;

                        pokemon_infobox_single.innerHTML = `
                        <p>${val.name}</p>
                        <div class="pokemon-stats-single">
                            <span>HP</span>
                            <span>${val.hp}</span>
                        </div>
                        <div class="pokemon-stats-single">
                            <span>Attack</span>
                            <span>${val.attack}</span>
                        </div>
                        <div class="pokemon-stats-single">
                            <span>Defense</span>
                            <span>${val.defense}</span>
                        </div>
                        <div class="pokemon-stats-single">
                            <span>Speed</span>
                            <span>${val.speed}</span>
                        </div>
                        `;

                        
                        pokemon_div_single.appendChild(pokemon_img_single);
                        pokemon_div_single.appendChild(pokemon_infobox_single);
                        pokemon_boxes.appendChild(pokemon_div_single);
                    });
                }
            });
            
        });
    });
}


const capitalize = (string) => {
    string = string.charAt(0).toUpperCase() + string.slice(1);
    return string;
}