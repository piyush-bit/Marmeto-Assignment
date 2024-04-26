
let data ;
//fetch https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json').then((res)=>res.json()).then((e)=>{
    data=e;
    Selection("men")   
}).catch((e)=>showError('Error Occured'))

const cardDisplay = document.getElementById('card-display')
const switches = document.querySelectorAll('.category')
const switchesArray = Array.from(switches);



switchesArray.map((e)=>{
    e.addEventListener('click', (e)=>{Selection(e.target.id)})
})

function Selection(id){
    if(id == 'men'){
        markSelect(id)
        cardDisplay.innerHTML = ''
        data.categories[0].category_products.map((e)=>{
            createCard(e)
        })
    }else if(id == 'women'){
        markSelect(id)
        cardDisplay.innerHTML = ''
        data.categories[1].category_products.map((e)=>{
            createCard(e)
        })
    }else if(id == 'kids'){
        markSelect(id)
        cardDisplay.innerHTML = ''
        data.categories[2].category_products.map((e)=>{
            createCard(e)
        })
    }
}

function markSelect(id){
    switchesArray.map((e)=>{
        e.classList.remove('selected')
    })
    document.getElementById(id).classList.add('selected')
}

function showError (msg) {
    cardDisplay.innerHTML = `<h2>${msg}</h2>`
}
const createCard = (product,container=cardDisplay) => {
    // Create elements
    const card = document.createElement('div');
    card.classList.add('card');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    const badge = document.createElement('div');
    badge.classList.add('badge');
    badge.textContent = product.badge_text || ''; // If badge_text is null, display empty string
    const image = document.createElement('img');
    image.setAttribute('src', product.image);
    image.setAttribute('alt', product.title);
    product.badge_text && imageContainer.appendChild(badge);
    imageContainer.appendChild(image);

    const description = document.createElement('div');
    description.classList.add('description');
    const title = document.createElement('div');
    title.classList.add('title');
    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = product.title;
    const brand = document.createElement('p');
    brand.classList.add('brand');
    brand.textContent = product.vendor;
    title.appendChild(name);
    title.appendChild(document.createTextNode('•'));
    title.appendChild(brand);

    const priceTab = document.createElement('div');
    priceTab.classList.add('price-tab');
    const price = document.createElement('div');
    price.classList.add('price');
    price.textContent = 'Rs.' + product.price;
    const original = document.createElement('div');
    original.classList.add('original');
    original.textContent = 'Rs.' + product.compare_at_price;
    const discount = document.createElement('div');
    discount.classList.add('discount');
    const discountPercent = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
    discount.textContent = discountPercent + '% Off'; // Calculating discount percentage
    priceTab.appendChild(price);
    priceTab.appendChild(document.createTextNode('•'));
    priceTab.appendChild(original);
    priceTab.appendChild(document.createTextNode('•'));
    priceTab.appendChild(discount);

    description.appendChild(title);
    description.appendChild(priceTab);

    const button = document.createElement('button');
    button.textContent = 'Add to Cart';

    // Append elements to card
    card.appendChild(imageContainer);
    card.appendChild(description);
    card.appendChild(button);

    // Append card to container
    container.appendChild(card);
}