/**
 * Captura el parámetro id
 */
//Variable que guarda la ubicación actual
const query = location.search;
//Variable que instancia la clase URLSearchParams
const params = new URLSearchParams(query);
//Variable que captura el id
const id = params.get('id');
console.log(id);

/**
 * Renderizar dinámicamente la vista de detalle
 */

//Definir funcion printDetail
function printDetails(id){
    const product = products.find(product => product.id == id);

    const detailsTemplate = `
        <section class="product-images-block">
            <div class="product-images">
            ${product.photo.map((photo) => `<img class="mini-img" src="${photo}" alt="${product.title}" onclick="changeMini(event)" />`).join('')}
            </div>
            <img
              class="big-img"
              id="big-img"
              src="${product.photo[2]}"
              alt="MacBook Pro 13'4"
            />
          </section>
          <div class="product-description-block">
            <h1 class="product-title">${product.title}</h1>
            <form class="product-selector">
              <fieldset class="product-fieldset">
                <label class="product-label" for="color">Color</label>
                <select
                  class="product-select"
                  type="text"
                  placeholder="Selecciona un color"
                  id="color"
                >
                ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
                </select>
              </fieldset>
            </form>
            <div class="product-description">
              <span class="product-label">Descripción</span>
              <p>
                ${product.description}
              </p>
            </div>
          </div>
          <div class="product-checkout-block">
            <div class="checkout-container">
              <span class="checkout-total-label">Total:</span>
              <h2 id="price" class="checkout-total-price">$${product.price}</h2>
              <p class="checkout-description">
                ${product.taxPolicy}
              </p>
              <ul class="checkout-policy-list">
                <li>
                  <span class="policy-icon"
                    ><img src="./assets/truck.png" alt="Truck"
                  /></span>
                  <span class="policy-desc"
                    >Agrega el producto al carrito para conocer los costos de
                    envío</span
                  >
                </li>
                <li>
                  <span class="policy-icon"
                    ><img src="./assets/plane.png" alt="Plane"
                  /></span>
                  <span class="policy-desc"
                    >Recibí aproximadamente entre 10 y 15 días hábiles,
                    seleccionando envío normal</span
                  >
                </li>
              </ul>
              <div class="checkout-process">
                <div class="top">
                  <input type="number" min="1" value="1" onclick="changePrice(event)" />
                  <button type="button" class="cart-btn">
                    Añadir al Carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
    `
    const detailsSelector = document.querySelector("#details");
    detailsSelector.innerHTML = detailsTemplate;
}

/**
 * Definir función para cambiar imagen
 */
function changeMini(event){
  //Traer el src de la imagen seleccionada
  const selectedSrc = event.target.src;
  //Traer el selector de la imagen grande
  const bigSelector = document.querySelector("#big-img");
  //Cambiar el src de la imagen grande
  bigSelector.src = selectedSrc;
}

/**
 * Definir funcion para cambiar precio
 */
function changePrice(event){
  //traer la cantidad del input de tipo number
  const quantity = event.target.value;
  //traer el producto
  const product = products.find(product => product.id == id);
  //traer el selector del precio
  const priceSelector = document.querySelector("#price");
  //cambiar el precio total
  priceSelector.innerHTML = `$${quantity * product.price}`;
}

printDetails(id);
