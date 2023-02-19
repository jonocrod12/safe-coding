//Inputs Variables
const name_input = document.querySelector("#name");
const lastName_input = document.querySelector("#lastName");
const age_input = document.querySelector("#age");
const gender_input = document.querySelector("#gender");

//Buttons Variables
const buttonAdd = document.querySelector("#add-button");
const add_submit = document.querySelector("#add_submit");
const buttondel = document.getElementById("delete-all");

const form = document.querySelector('form');

const content_div = document.getElementById("content");
const content_table = document.getElementById("data-table")

//DOM
document.addEventListener('DOMContentLoaded', () => {
     
    //localStorage
    const data = JSON.parse( localStorage.getItem("data") );

    if (data === null) {
        const par = document.createElement("p");
        const text_par = document.createTextNode("No hay elementos para mostrar.")
        par.appendChild(text_par);
        content_div.append(par);
    } else {
        render(data)
    }

    //Funtion Add
    buttonAdd.addEventListener('click', (e) => {
        e.preventDefault();
        const  data = JSON.parse( localStorage.getItem("data") ) || [];

        const name = name_input.value;
        const lastName = lastName_input.value;
        const age = age_input.value;
        const gender = gender_input.value;
        
        // JSON
        const person = { 
            name,
            "lastName": lastName,
            "age": age,
            "gender": gender
        }

        data.push(person);
        console.log(person);
        localStorage.setItem('data', JSON.stringify(data));
        content_div.innerHTML = ''; 

        // Reder Div
        render( data)
        console.log(data);
    })

})

function render(data) {
    for(let i = 0; i < data.length; i++) {

            // Create div element
            const div_person = document.createElement("div");
            const person_title = document.createTextNode(`${data[i].name}- ${data[i].lastName}  `);
            div_person.classList.add("div-board");
            // create button delete
            const button_delete = document.createElement("button");
            const text_button_delete = document.createTextNode("Eliminar");
            button_delete.appendChild(text_button_delete);
            //add class
            button_delete.classList.add("btn");
            button_delete.className += " btn-outline-danger";
            //button_delete.className += " btn-onData";

            // add section
            const button_update = document.createElement('button');
            const text_button_update = document.createTextNode('Editar');
            button_update.appendChild(text_button_update);
            button_update.classList.add("btn");
            button_update.className += " btn-outline-success";


            button_delete.onclick = () => {
                deleteStorage(i, data)
            }

            button_update.onclick = () => {
                name_input.value = data[i].name;
                lastName_input.value = data[i].lastName;
                age_input.value = data[i].age;
                gender_input.value = data[i].gender;
                buttonAdd.disabled = true;

                // button save
                const button_save = document.createElement('button');
                const text_button_save = document.createTextNode('Guardar');
                button_save.appendChild(text_button_save);
                //add class to button
                button_save.classList.add("btn");
                button_save.className += " btn-info";

                button_save.id = i;

                button_save.onclick = (e) => {
                    e.preventDefault()
                    const person = {
                        "name":name_input.value,
                        "lastName":lastName_input.value, 
                        "age":age_input.value,
                        "gender":gender_input.value
                    }

                    data.splice(i, 1, person); 
                    localStorage.setItem('data', JSON.stringify(data));
                    content_div.innerHTML = "";
                    render(data);
                    button_save.hidden = true;
                    add_button.disabled = false;
                }

                form.appendChild(button_save);
            }

         // add text and button
            div_person.appendChild(person_title);
            div_person.appendChild(button_update);
            div_person.appendChild(button_delete);
            content_div.appendChild(div_person);

        // TABLE
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><input value="${data[i].name}" id="name-${i}" class="inptTable"/></td>
            <td><input value="${data[i].lastName}" id="lastname-${i}" class="inptTable"/></td>
            <td><input value="${data[i].age}" id="age-${i}" class="inptTable"/></td>
            <td><input value="${data[i].gender}" id="gender-${i}" class="inptTable"/></td>
            <td>
                <div class="btns-container">
                <button onclick="saveTable(${i})" class="btn btn-success">Guardar</button>
                <button class="btn btn-danger">Eliminar</button>
                </div>
            </td>
        `;
        document.querySelector("tbody").appendChild(row);
    }
}
// Delete 
function deleteStorage(i, data) {
    data.splice(i, 1);
    localStorage.setItem('data', JSON.stringify(data));
    content_div.innerHTML = '';
    render(data)
}
// save on table
function saveTable(i) {
    const input_table_name = document.querySelector(`#name-${i}`);
    const input_table_lastname = document.querySelector(`#lastname-${i}`);
    const input_table_age = document.querySelector(`#age-${i}`);
    const input_table_gender = document.querySelector(`#gender-${i}`);


    const data = JSON.parse(localStorage.getItem("data")) || [];

    data.splice(i, 1, {
        "name": input_table_name.value,
        "lastName": input_table_lastname.value,
        "age": input_table_age.value,
        "gender": input_table_gender.value
    })
    localStorage.setItem("data", JSON.stringify(data));
    content_div.innerHTML = '';
    document.querySelector("tbody").innerHTML = ''
    render(data);
}