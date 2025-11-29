// app.js — lógica completa para The Boss (con imágenes locales)

// ---------- Config ----------
const BUSINESS_PHONE = '573115990064'; // <- reemplaza por el número real (sin '+')
const DELIVERY_FEE = 0; // tarifa por defecto de domicilio

// ---------- Datos de ejemplo ----------
// ---------- Datos de ejemplo ----------
const products = [
  { 
    id: 'b1',
    category: 'hamburguesas',
    title: '3 Carnes',
    price: 28000,
    desc: 'Pan brioche, pernil de cerdo, filete de pollo, carne artesanal, queso, cebolla, ensalada, tomate y salsa de la casa.',
    image: 'images/3Carnes.png',
    ingredients: ['Pan Brioche','Pernil de cerdo','Filete de pollo','Carne artesanal','Queso','Cebolla','Ensalada','Tomate','Salsa de la casa'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b13',
    category: 'hamburguesas',
    title: 'Ranchera',
    price: 25000,
    desc: 'Pan brioche, lechuga, tomate, carne, queso asado, ranchera asada, picadillo de piña y salsa de la casa.',
    image: 'images/Ranchera.png',
    ingredients: ['Pan brioche','Lechuga','Tomate','Carne','Queso asado','Ranchera asada','Picadillo de piña','Salsa de la casa'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b2',
    category: 'hamburguesas',
    title: 'TociBurger',
    price: 24000,
    desc: 'Pan brioche, lechuga, guacamole, tomate, carne artesanal, queso mozzarella, maduritos, trozos de tocino, salsa de la casa y cebolla caramelizada.',
    image: 'images/TociBurger.png',
    ingredients: ['Pan Brioche','Lechuga','Guacamole','Tomate','Carne Artesanal','Queso Mozzarella','Maduritos','Trozos de tocino','Salsa de la casa','Cebolla caramelizada'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b3',
    category: 'hamburguesas',
    title: 'Triple Carne',
    price: 23000,
    desc: 'Pan brioche, 3 carnes artesanales, pollo desmechado, queso, tocineta, aros de cebolla, ensalada, tomate y salsa de la casa.',
    image: 'images/TripleCarne.png',
    ingredients: ['Pan Brioche','Carne Artesanal x3','Queso','Cebolla','Tomate','Salsa de la casa'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b4',
    category: 'hamburguesas',
    title: 'Super',
    price: 21000,
    desc: 'Pan brioche, 2 carnes artesanales, pollo desmechado, queso, tocineta, aros de cebolla, ensalada, tomate, salsa de la casa + papas a la francesa.',
    image: 'images/Super.png',
    ingredients: ['Pan Brioche','Carne Artesanal','Pollo Desmechado','Queso','Tocineta','Cebolla','Ensalada','Tomate','Salsa de la casa'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b5',
    category: 'hamburguesas',
    title: 'Royal',
    price: 21000,
     desc: 'Pan brioche, lechuga, guacamole, tomate, pollo en salsa, carne artesanal, salsa de la casa, queso a la plancha, cebolla con tocineta caramelizada, trozos de pollo y ranchera',
    image: 'images/Royal.png',
    ingredients: ['Pan Brioche','Lechuga','Guacamole','Tomate','Carne Artesanal','Tocineta','Queso salado','Salsa tártara','Cebolla grille'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b6',
    category: 'hamburguesas',
    title: 'Combinada',
    price: 20000,
    desc: 'Pan brioche, carne artesanal, filete de pollo, queso, tocineta, ensalada, tomate, salsa de la casa y aros de cebolla.',
    image: 'images/combinada.png',
    ingredients: ['Pan Brioche','Carne Artesanal','Filete de Pollo','Tocineta','Queso','Ensalada','Tomate','Salsa de la casa'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b7',
    category: 'hamburguesas',
    title: 'Doble Carne',
    price: 19000,
    desc: 'Pan brioche, doble carne artesanal, queso, pollo desmechado, tocineta, cebolla, ensalada, tomate y salsa de la casa.',
    image: 'images/DobleCarne.png',
    ingredients: ['Pan Brioche','Carne Artesanal x2','Queso','Cebolla','Salsa de la casa'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b8',
    category: 'hamburguesas',
    title: 'Paisa',
    price: 18500,
    desc: 'Pan brioche, carne artesanal, pollo desmechado, queso, tocineta, maicitos, salchicha ranchera, ensalada, tomate, salsa de la casa y aros de cebolla.',
    image: 'images/paisa.png',
    ingredients: ['Pan Brioche','Carne Artesanal','Pollo desmechado','Queso','Tocineta','Salsa tártara','Cebolla grille'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b14',
    category: 'hamburguesas',
    title: 'Pernil de Cerdo',
    price: 17000,
    desc: 'Pan brioche, pernil de cerdo, queso, tocineta, aros de cebolla, ensalada, tomate y salsa de la casa.',
    image: 'images/hamburgesa14.png',
    ingredients: ['Pan Brioche','Pernil de cerdo','Queso','Tocineta','Cebolla','Tomate','Salsa de la casa'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b9',
    category: 'hamburguesas',
    title: 'Quesuda',
    price: 17000,
    desc: 'Pan brioche, carne artesanal, queso, tocineta, aros de cebolla, ensalada, tomate y salsa de la casa cubierta de queso.',
    image: 'images/hamburgesa9.png',
    ingredients: ['Pan Brioche','Carne Artesanal','Doble queso','Cebolla','Ensalada','Tomate','Salsa de la casa'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b10',
    category: 'hamburguesas',
    title: 'Mixta',
    price: 16000,
    desc: 'Pan brioche, carne artesanal, pollo desmechado, queso, tocineta, ensalada, tomate y salsa de la casa.',
    image: 'images/mixta.png',
    ingredients: ['Pan Brioche','Filete de Pollo','Carne Artesanal','Queso','Tomate','Ensalada','Salsa de la casa'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b11',
    category: 'hamburguesas',
    title: 'Filete de Pollo',
    price: 15500,
    desc: 'Pan brioche, filete de pollo, queso, tocineta, ensalada, tomate y salsa de la casa.',
    image: 'images/hamburgesa11.png',
    ingredients: ['Pan Brioche','Filete de Pollo','Queso','Cebolla','Ensalada','Tomate','Salsa de la casa'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },

  { 
    id: 'b12',
    category: 'hamburguesas',
    title: 'Tradicional',
    price: 15000,
    desc: 'Pan brioche, carne artesanal, queso, tocineta, ensalada, tomate y salsa de la casa.',
    image: 'images/hamburgesa12.png',
    ingredients: ['Pan Brioche','Carne Artesanal','Queso','Cebolla','Ensalada','Tomate','Salsa de la casa'],
    extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
  },
  // === PERROS ===
{  
  id: 'p1',
  category: 'perros',
  title: 'Perra Dog',
  price: 18000,
  desc: 'Salchicha suiza con ensalada, ripio de papas, salsas, tocineta y queso gratinado.',
  image: 'images/perraDog.png',
  ingredients: ['Salchicha suiza', 'Ensalada', 'Ripio de papas', 'Salsas', 'Tocineta', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{  
  id: 'p2',
  category: 'perros',
  title: 'Paisa',
  price: 17000,
  desc: 'Salchicha americana con pollo desmechado, maicitos, ensalada, salsas y ripio de papas.',
  image: 'images/perroPaisa.png',
  ingredients: ['Salchicha americana', 'Pollo desmechado', 'Maicitos', 'Ensalada', 'Ripio de papas', 'Salsas'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{  
  id: 'p3',
  category: 'perros',
  title: 'Quesudo',
  price: 16000,
  desc: 'Salchicha americana con ensalada, ripio de papas, salsas, tocineta y cubierta de queso.',
  image: 'images/Quesudo.png',
  ingredients: ['Salchicha americana', 'Ensalada', 'Ripio de papas', 'Salsas', 'Tocineta', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{  
  id: 'p4',
  category: 'perros',
  title: 'Doble Americano',
  price: 15500,
  desc: 'Dos salchichas americanas con ensalada, ripio de papas, tocineta, salsas y queso gratinado.',
  image: 'images/p4.png',
  ingredients: ['2 Salchichas americanas', 'Ensalada', 'Ripio de papas', 'Tocineta', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{  
  id: 'p5',
  category: 'perros',
  title: 'Ranchero',
  price: 13500,
  desc: 'Salchicha ranchera con ensalada, ripio de papas, salsas y queso gratinado.',
  image: 'images/ranchero.png',
  ingredients: ['Salchicha ranchera', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{  
  id: 'p6',
  category: 'perros',
  title: 'Doble Salchicha',
  price: 13000,
  desc: 'Dos salchichas con ensalada, ripio de papas, salsas y queso gratinado.',
  image: 'images/p6.png',
  ingredients: ['2 Salchichas', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{  
  id: 'p7',
  category: 'perros',
  title: 'Americano',
  price: 12500,
  desc: 'Salchicha americana con ensalada, ripio de papas, salsas y queso gratinado.',
  image: 'images/p7.png',
  ingredients: ['Salchicha americana', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{  
  id: 'p8',
  category: 'perros',
  title: 'Tradicional',
  price: 11000,
  desc: 'Salchicha con ensalada, ripio de papas, salsas y queso gratinado.',
  image: 'images/tradicional.png',
  ingredients: ['Salchicha', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
// === SANDWICHES ===
{ 
  id: 's1',
  category: 'sandwiches',
  title: 'Sandwich Pernil',
  price: 19000,
  desc: 'Pernil de cerdo, lechuga, tomate, guacamole, tocineta y queso.',
  image: 'images/SandwichPernil.png',
  ingredients: ['Pernil de cerdo', 'Lechuga', 'Tomate', 'Guacamole', 'Tocineta', 'Queso'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 's2',
  category: 'sandwiches',
  title: 'Sandwich Combinado',
  price: 18500,
  desc: 'Filete de pollo, carne artesanal, lechuga, tomate, salsa de maíz, tocineta, queso y guacamole.',
  image: 'images/Sandwichcombinado.png',
  ingredients: ['Filete de pollo', 'Carne artesanal', 'Lechuga', 'Tomate', 'Salsa de maíz', 'Tocineta', 'Queso', 'Guacamole'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 's3',
  category: 'sandwiches',
  title: 'Sandwich Mixto',
  price: 17500,
  desc: 'Pollo desmechado, carne artesanal, lechuga, tomate, guacamole, salsa de maíz, tocineta y queso.',
  image: 'images/SandwichMixto.png',
  ingredients: ['Pollo desmechado', 'Carne artesanal', 'Lechuga', 'Tomate', 'Guacamole', 'Salsa de maíz', 'Tocineta', 'Queso'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 's4',
  category: 'sandwiches',
  title: 'Sandwich Filete de Pollo',
  price: 17000,
  desc: 'Filete de pollo, lechuga, tomate, guacamole, tocineta y queso.',
  image: 'images/SandwichFiletedePollo.png',
  ingredients: ['Filete de pollo', 'Lechuga', 'Tomate', 'Guacamole', 'Tocineta', 'Queso'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 's5',
  category: 'sandwiches',
  title: 'Sandwich Pollo Desmechado',
  price: 16000,
  desc: 'Pollo desmechado, lechuga, tomate, guacamole, salsa de maíz, tocineta y queso.',
  image: 'images/SandwichPolloDesmechado.png',
  ingredients: ['Pollo desmechado', 'Lechuga', 'Tomate', 'Guacamole', 'Salsa de maíz', 'Tocineta', 'Queso'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},


// === CARNES ===
{ 
  id: 'c1',
  category: 'carnes',
  title: 'Churrasco',
  price: 30000,
  desc: 'Papas a la francesa, arepa con queso y tomate.',
  image: 'images/carne1.png',
  ingredients: ['Churrasco', 'Papas a la francesa', 'Arepa con queso', 'Tomate'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'c2',
  category: 'carnes',
  title: 'Asado Mixto',
  price: 30000,
  desc: 'Carne de res, cerdo y filete de pollo con papas y tomate.',
  image: 'images/carne2.png',
  ingredients: ['Carne de res', 'Cerdo', 'Filete de pollo', 'Papas', 'Tomate'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'c3',
  category: 'carnes',
  title: 'Carne de Cerdo Asada',
  price: 21000,
  desc: 'Papas a la francesa, arepa y tomate.',
  image: 'images/carne3.png',
  ingredients: ['Carne de cerdo', 'Papas a la francesa', 'Arepa', 'Tomate'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'c4',
  category: 'carnes',
  title: 'Filete de Pollo a la Plancha',
  price: 20000,
  desc: 'Filete de pollo con papas a la francesa, arepa y tomate.',
  image: 'images/FileteDePollo.png',
  ingredients: ['Filete de pollo', 'Papas a la francesa', 'Arepa', 'Tomate'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'c5',
  category: 'carnes',
  title: 'Chuzo Mixto',
  price: 17000,
  desc: 'Carne de res y cerdo con arepa y papas.',
  image: 'images/chuzomixto.png',
  ingredients: ['Carne de res', 'Carne de cerdo', 'Arepa', 'Papas a la francesa'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'c6',
  category: 'carnes',
  title: 'Chuzo de Cerdo',
  price: 15000,
  desc: 'Chuzo de cerdo con papas a la francesa, arepa y tomate.',
  image: 'images/chuzodecerdo.png',
  ingredients: ['Cerdo', 'Papas a la francesa', 'Arepa', 'Tomate'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'c7',
  category: 'carnes',
  title: 'Suiza',
  price: 15000,
  desc: 'Papas a la francesa, arepa y tomate.',
  image: 'images/carne7.png',
  ingredients: ['Carne', 'Papas a la francesa', 'Arepa', 'Tomate'],
 extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'c8',
  category: 'carnes',
  title: 'Chuzo de Pollo',
  price: 14000,
  desc: 'Chuzo de pollo con papas a la francesa, arepa y tomate.',
  image: 'images/carne8.png',
  ingredients: ['Pollo', 'Papas a la francesa', 'Arepa', 'Tomate'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
// === PATACONES ===
{ 
  id: 'pt1',
  category: 'patacones',
  title: 'Patacón Quesudo Mixto',
  price: 22000,
  desc: 'Tocineta, pollo desmechado, carne desmechada, ensalada, ripio de papas, salsas y cubierta de queso.',
  image: 'images/PataconQuesudo.png',
  ingredients: ['Tocineta', 'Pollo desmechado', 'Carne desmechada', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'pt2',
  category: 'patacones',
  title: 'Patacón Mixto Desmechado',
  price: 20000,
  desc: 'Tocineta, pollo desmechado, carne desmechada, ensalada, ripio de papas, salsas y queso gratinado.',
  image: 'images/patacon2.png',
  ingredients: ['Tocineta', 'Pollo desmechado', 'Carne desmechada', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'pt3',
  category: 'patacones',
  title: 'Patacón Mixto Dog',
  price: 18000,
  desc: 'Tocineta, pollo desmechado, carne, ensalada, ripio de papas, salsas y queso gratinado.',
  image: 'images/patacon3.png',
  ingredients: ['Tocineta', 'Pollo desmechado', 'Carne', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'pt4',
  category: 'patacones',
  title: 'Patacón Pollo Desmechado',
  price: 17000,
  desc: 'Pollo desmechado, tocineta, ensalada, ripio de papas, salsas y queso gratinado.',
  image: 'images/PataconPolloDesmechado.png',
  ingredients: ['Pollo desmechado', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'pt5',
  category: 'patacones',
  title: 'Patacón Carne Desmechada',
  price: 17000,
  desc: 'Carne desmechada, tocineta, ensalada, ripio de papas, salsas y queso gratinado.',
  image: 'images/PataconCarneDesmechada.png',
  ingredients: ['Carne desmechada', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'pt6',
  category: 'patacones',
  title: 'Pataburger',
  price: 16000,
  desc: 'Plátano maduro, tocineta, pollo desmechado, carne artesanal, ensalada, cebolla caramelizada, salsa de la casa y queso.',
  image: 'images/Pataburger.png',
  ingredients: ['Plátano maduro', 'Tocineta', 'Pollo desmechado', 'Carne artesanal', 'Ensalada', 'Cebolla caramelizada', 'Salsa de la casa', 'Queso'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
// === MAICITOS ===
{ 
  id: 'm1',
  category: 'maicitos',
  title: 'Maicitos Mixto',
  price: 16000,
  desc: 'Maicitos con pollo desmechado, carne desmechada, tocineta y queso gratinado.',
  image: 'images/maicito1.png',
  ingredients: ['Maicitos', 'Pollo desmechado', 'Carne desmechada', 'Tocineta', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'm2',
  category: 'maicitos',
  title: 'Maicitos Rancheros',
  price: 15000,
  desc: 'Maicitos con pollo, salchicha ranchera, tocineta y queso.',
  image: 'images/maicitosrancheros.png',
  ingredients: ['Maicitos', 'Pollo', 'Salchicha ranchera', 'Tocineta', 'Queso'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'm3',
  category: 'maicitos',
  title: 'Maicitos Hawaiano',
  price: 14500,
  desc: 'Maicitos con pollo, tocineta, queso y piña.',
  image: 'images/maicito3.png',
  ingredients: ['Maicitos', 'Pollo', 'Tocineta', 'Queso', 'Piña'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'm4',
  category: 'maicitos',
  title: 'Maicitos Dog',
  price: 14000,
  desc: 'Maicitos con pollo, tocineta y queso.',
  image: 'images/maicito4.png',
  ingredients: ['Maicitos', 'Pollo', 'Tocineta', 'Queso'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
// === SALCHIPAPAS ===
{ 
  id: 'sa1',
  category: 'salchipapa',
  title: 'Salchicostilla',
  price: 29000,
  desc: 'Papas a la francesa, salchicha, carne desmechada, pollo desmechado, costilla, madurito, tocineta, guacamole, queso y maicitos.',
  image: 'images/Salchicostilla.png',
  sizes: [
    { id: 'sa1-n', label: 'Normal', price: 29000, image: 'images/Salchicostilla.png' },
    { id: 'sa1-f', label: 'Familiar', price: 57000, image: 'images/Salchicostilla.png' }
  ],
  ingredients: ['Papas a la francesa', 'Salchicha', 'Carne desmechada', 'Pollo desmechado', 'Costilla', 'Madurito', 'Tocineta', 'Guacamole', 'Queso', 'Maicitos'],
  extras: [
    { name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },
    { name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },
    { name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },
    { name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },
    { name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }
  ]
},

{ 
  id: 'sa2',
  category: 'salchipapa',
  title: 'Salchitoci',
  price: 29000,
  desc: 'Papas a la francesa con salchicha, carne desmechada, pollo desmechado, madurito, tocineta carnuda, guacamole, picadillo, queso y maicitos.',
  image: 'images/salchitoci.png',
  sizes: [
    { id: 'sa2-n', label: 'Normal', price: 29000, image: 'images/salchitoci.png' },
    { id: 'sa2-f', label: 'Familiar', price: 57000, image: 'images/salchitoci.png' }
  ],
  ingredients: ['Papas a la francesa', 'Salchicha', 'Carne desmechada', 'Pollo desmechado', 'Madurito', 'Tocineta carnuda', 'Guacamole', 'Picadillo', 'Queso', 'Maicitos'],
  extras: [
    { name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },
    { name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },
    { name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },
    { name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },
    { name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }
  ]
},

{ 
  id: 'sa3',
  category: 'salchipapa',
  title: 'Salchiranchera',
  price: 27000,
  desc: 'Papas con carne, salchicha ranchera, pollo desmechado, suiza, madurito, tocineta, guacamole y maicitos.',
  image: 'images/salchiranchera.png',
  sizes: [
    { id: 'sa3-n', label: 'Normal', price: 27000, image: 'images/salchiranchera.png' },
    { id: 'sa3-f', label: 'Familiar', price: 56000, image: 'images/salchiranchera.png' }
  ],
  ingredients: ['Papas a la francesa', 'Carne', 'Salchicha ranchera', 'Pollo desmechado', 'Suiza', 'Madurito', 'Tocineta', 'Guacamole', 'Maicitos'],
  extras: [
    { name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },
    { name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },
    { name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },
    { name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },
    { name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }
  ]
},

{ 
  id: 'sa4',
  category: 'salchipapa',
  title: 'Salchiquesuda',
  price: 26000,
  desc: 'Papas a la francesa con carne desmechada, pollo desmechado, madurito, tocineta y cubierta de queso gratinado.',
  image: 'images/salchipapa4.png',
  sizes: [
    { id: 'sa4-n', label: 'Normal', price: 26000, image: 'images/salchipapa4.png' },
    { id: 'sa4-f', label: 'Familiar', price: 54000, image: 'images/salchipapa4.png' }
  ],
  ingredients: ['Papas a la francesa', 'Carne desmechada', 'Pollo desmechado', 'Madurito', 'Tocineta', 'Queso gratinado'],
  extras: [
    { name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },
    { name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },
    { name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },
    { name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },
    { name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }
  ]
},

{ 
  id: 'sa5',
  category: 'salchipapa',
  title: 'Salchipaisa',
  price: 25000,
  desc: 'Papas con salchicha, carne, salchicha suiza, pollo, huevo de codorniz, madurito, tocineta, guacamole y maicitos.',
  image: 'images/Salchipaisa.png',
  sizes: [
    { id: 'sa5-n', label: 'Normal', price: 25000, image: 'images/Salchipaisa.png' },
    { id: 'sa5-f', label: 'Familiar', price: 52000, image: 'images/Salchipaisa.png' }
  ],
  ingredients: ['Papas a la francesa', 'Salchicha', 'Carne', 'Suiza', 'Pollo', 'Huevo de codorniz', 'Madurito', 'Tocineta', 'Guacamole', 'Maicitos'],
  extras: [
    { name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },
    { name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },
    { name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },
    { name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },
    { name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }
  ]
},

{ 
  id: 'sa6',
  category: 'salchipapa',
  title: 'Salchimixta',
  price: 23000,
  desc: 'Papas a la francesa con salchicha, carne desmechada, pollo desmechado, huevo de codorniz, madurito, tocineta y guacamole.',
  image: 'images/salchipapa6.png',
  sizes: [
    { id: 'sa6-n', label: 'Normal', price: 23000, image: 'images/salchipapa6.png' },
    { id: 'sa6-f', label: 'Familiar', price: 50000, image: 'images/salchipapa6.png' }
  ],
  ingredients: ['Papas a la francesa', 'Salchicha', 'Carne desmechada', 'Pollo desmechado', 'Huevo de codorniz', 'Madurito', 'Tocineta', 'Guacamole'],
  extras: [
    { name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },
    { name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },
    { name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },
    { name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },
    { name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }
  ]
},

{ 
  id: 'sa7',
  category: 'salchipapa',
  title: 'Salchipapa Dog',
  price: 16000,
  desc: 'Papas a la francesa con salchicha, queso gratinado y huevo de codorniz.',
  image: 'images/salchipapa.png',
  ingredients: ['Papas a la francesa', 'Salchicha', 'Queso gratinado', 'Huevo de codorniz'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
// === DORILOCOS ===
{
  id: 'd1',
  category: 'dorilocos',
  title: 'Dorilocos',
  price: 15000,
  desc: 'Pollo desmechado, carne desmechada, queso, tocineta, maicitos, picadillo de cebolla y tomate, guacamole.',
  image: 'images/dorilocos1.png',
  ingredients: ['Pollo desmechado', 'Carne desmechada', 'Queso', 'Tocineta', 'Maicitos', 'Cebolla', 'Tomate', 'Guacamole'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},

// === AREPAS ===
{ 
  id: 'a1',
  category: 'arepas',
  title: 'Doble Carne Dog',
  price: 17500,
  desc: 'Arepa con tocineta, pollo desmechado, dos carnes, ensalada, ripio de papas, salsas, tomate y queso gratinado.',
  image: 'images/Arepadoblecarne.png',
  ingredients: ['Arepa asada', 'Tocineta', 'Pollo desmechado', '2 Carnes', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'a2',
  category: 'arepas', 
  title: 'Quesuda Dog',
  price: 17000,
  desc: 'Arepa con tocineta, carne artesanal, tomate, ensalada, ripio de papas, salsas y cubierta de queso.',
  image: 'images/arepa2.png',
  ingredients: ['Arepa asada', 'Tocineta', 'Carne artesanal', 'Tomate', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'a3',
  category: 'arepas',
  title: 'Rellena',
  price: 15000,
  desc: 'Arepa con queso, pollo desmechado, carne desmechada, chicharrón, guiso, guacamole, maduritos y salchicha ranchera.',
  image: 'images/arepa3.png',
  ingredients: ['Arepa asada', 'Queso', 'Pollo desmechado', 'Carne desmechada', 'Chicharrón', 'Guiso', 'Guacamole', 'Maduritos', 'Salchicha ranchera'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'a4',
  category: 'arepas',
  title: 'Mixta Dog',
  price: 15500,
  desc: 'Arepa con tocineta, pollo desmechado, carne artesanal, ensalada, ripio de papas, salsas, queso gratinado y tomate.',
  image: 'images/arepa4.png',
  ingredients: ['Arepa asada', 'Tocineta', 'Pollo desmechado', 'Carne artesanal', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado', 'Tomate'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'a5',
  category: 'arepas',
  title: 'Paisa Dog',
  price: 16000,
  desc: 'Arepa con carne, ensalada, ripio de papas, salsas, queso gratinado, tomate, tocineta y maicitos.',
  image: 'images/arepa5.png',
  ingredients: ['Arepa asada', 'Carne', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado', 'Tomate', 'Maicitos'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'a6',
  category: 'arepas',
  title: 'Con Filete Dog',
  price: 14000,
  desc: 'Arepa con tocineta, filete de pollo, ensalada, tomate, ripio de papas, salsas y queso gratinado.',
  image: 'images/arepafiletedepollo.png',
  ingredients: ['Arepa asada', 'Tocineta', 'Filete de pollo', 'Ensalada', 'Tomate', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'a7',
  category: 'arepas',
  title: 'Arepaburger',
  price: 15000,
  desc: 'Arepa con carne, ensalada, ripio de papa, salsas y queso gratinado.',
  image: 'images/Arepaburger.png',
  ingredients: ['Arepa asada', 'Carne', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{ 
  id: 'a8',
  category: 'arepas',
  title: 'Con Pollo Dog',
  price: 15000,
  desc: 'Arepa con pollo desmechado, ensalada, ripio de papas, salsas y queso gratinado.',
  image: 'images/arepa8.png',
  ingredients: ['Arepa asada', 'Pollo desmechado', 'Ensalada', 'Ripio de papas', 'Salsas', 'Queso gratinado'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},


// === BURRITOS ===
{
  id: 'b1',
  category: 'burritos',
  title: 'Pernil de Cerdo',
  price: 16000,
  desc: 'Burrito de pernil de cerdo con queso, maicitos, picadillo de lechuga, tomate y guacamole.',
  image: 'images/burrito1.png',
  ingredients: ['Tortilla', 'Pernil de cerdo', 'Queso', 'Maicitos', 'Lechuga', 'Tomate', 'Guacamole'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{
  id: 'b2',
  category: 'burritos',
  title: 'Mixto',
  price: 15500,
  desc: 'Burrito mixto con pollo desmechado, carne desmechada, queso, maicitos, picadillo de lechuga, tomate y guacamole.',
  image: 'images/burrito2.png',
  ingredients: ['Tortilla', 'Pollo desmechado', 'Carne desmechada', 'Queso', 'Maicitos', 'Lechuga', 'Tomate', 'Guacamole'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
{
  id: 'b3',
  category: 'burritos',
  title: 'Pollo y Tocineta',
  price: 14500,
  desc: 'Burrito con pollo desmechado, tocineta, queso, maicitos, picadillo de lechuga, tomate, y guacamole.',
  image: 'images/burrito3.png',
  ingredients: ['Tortilla', 'Pollo desmechado', 'Tocineta', 'Queso', 'Maicitos', 'Lechuga', 'Tomate', 'Guacamole'],
  extras: [{ name:'Maicitos',price:2500 },{ name:'Pollo esmechado',price:5000 },{ name:'Carne esmechada',price:5500 },{ name:'Tocino',price:9000 },{ name:'Costilla',price:8000 },{ name:'Porción de papas a la francesa',price:7000 },{ name:'Unidad de huevo de codorniz',price:1500 },{ name:'Huevos de codorniz 5 unidades',price:4000 },{ name:'Queso',price:3000 },{ name:'Tocineta',price:3000 }]
},
//JUGOS
{
  id: 'j1',
  category: 'Jugos',
  title: 'Jugo de Mango',
  price: 6000,
  desc: 'Refrescante jugo natural de mango preparado al momento.',
  ingredients: ['Mango fresco', 'Azúcar', 'Hielo'],
  image: 'images/jugo1.png',
  sizes: [
    {
      id: 'j1-agua',
      label: 'En agua',
      price: 6000,
      image: 'images/jugo1.png'
    },
    {
      id: 'j1-leche',
      label: 'En leche',
      price: 7000,
      image: 'images/jugo1.png'
    }
  ]
},
{
  id: 'j2',
  category: 'Jugos',
  title: 'Jugo de Fresa',
  price: 6000,
  desc: 'Jugo natural de fresa con un sabor dulce y fresco.',
  ingredients: ['Fresas', 'Azúcar', 'Hielo'],
  image: 'images/jugo2.png',
  sizes: [
    {
      id: 'j2-agua',
      label: 'En agua',
      price: 6000,
      image: 'images/jugo2.png'
    },
    {
      id: 'j2-leche',
      label: 'En leche',
      price: 7000,
      image: 'images/jugo2.png'
    }
  ]
},
{
  id: 'j3',
  category: 'Jugos',
  title: 'Jugo de Mora',
  price: 6000,
  desc: 'Jugo artesanal de mora, lleno de sabor y color natural.',
  ingredients: ['Mora fresca', 'Azúcar', 'Hielo'],
  image: 'images/jugo3.png',
  sizes: [
    {
      id: 'j3-agua',
      label: 'En agua',
      price: 6000,
      image: 'images/jugo3.png'
    },
    {
      id: 'j3-leche',
      label: 'En leche',
      price: 7000,
      image: 'images/jugo3.png'
    }
  ]
},
{
  id: 'j4',
  category: 'Jugos',
  title: 'Jugo de Maracuyá',
  price: 6000,
  desc: 'Delicioso jugo de maracuyá con su característico toque ácido.',
  ingredients: ['Maracuyá', 'Azúcar', 'Hielo'],
  image: 'images/jugo4.png',
  sizes: [
    {
      id: 'j4-agua',
      label: 'En agua',
      price: 6000,
      image: 'images/jugo4.png'
    },
    {
      id: 'j4-leche',
      label: 'En leche',
      price: 7000,
      image: 'images/jugo4.png'
    }
  ]
},
{
  id: 'j5',
  category: 'Jugos',
  title: 'Jugo de Lulo',
  price: 6000,
  desc: 'Tradicional jugo de lulo colombiano, ácido y refrescante.',
  ingredients: ['Lulo', 'Azúcar', 'Hielo'],
  image: 'images/jugo5.png',
  sizes: [
    {
      id: 'j5-agua',
      label: 'En agua',
      price: 6000,
      image: 'images/jugo5.png'
    },
    {
      id: 'j5-leche',
      label: 'En leche',
      price: 7000,
      image: 'images/jugo5.png'
    }
  ]
},
{
  id: 'j6',
  category: 'Jugos',
  title: 'Jugo de Papaya',
  price: 6000,
  desc: 'Suave jugo natural de papaya, ideal para acompañar tus comidas.',
  ingredients: ['Papaya', 'Azúcar', 'Hielo'],
  image: 'images/jugo6.png',
  sizes: [
    {
      id: 'j6-agua',
      label: 'En agua',
      price: 6000,
      image: 'images/jugo6.png'
    },
    {
      id: 'j6-leche',
      label: 'En leche',
      price: 7000,
      image: 'images/jugo6.png'
    }
  ]
},
{
  id: 'j7',
  category: 'Jugos',
  title: 'Jugo de Sandía',
  price: 6000,
  desc: 'Refrescante jugo de sandía, perfecto para los días calurosos.',
  ingredients: ['Sandía', 'Azúcar', 'Hielo'],
  image: 'images/jugo7.png',
  sizes: [
    {
      id: 'j7-agua',
      label: 'En agua',
      price: 6000,
      image: 'images/jugo7.png'
    },
    {
      id: 'j7-leche',
      label: 'En leche',
      price: 7000,
      image: 'images/jugo7.png'
    }
  ]
},
{
  id: 'j8',
  category: 'Jugos',
  title: 'Jugo de Piña',
  price: 6000,
  desc: 'Jugo tropical de piña, dulce, ácido y muy refrescante.',
  ingredients: ['Piña', 'Azúcar', 'Hielo'],
  image: 'images/jugo8.png',
  sizes: [
    {
      id: 'j8-agua',
      label: 'En agua',
      price: 6000,
      image: 'images/jugo8.png'
    },
    {
      id: 'j8-leche',
      label: 'En leche',
      price: 7000,
      image: 'images/jugo8.png'
    }
  ]
},

// === LIMONADAS ===
{
  id: 'l1',
  category: 'limonadas',
  title: 'Limonada de Coco',
  price: 9000,
  desc: 'Refrescante limonada de coco, cremosa y tropical, disponible en agua o en leche.',
  image: 'images/limonada1.png',
  ingredients: ['Limón', 'Crema de coco', 'Agua o Leche', 'Azúcar', 'Hielo'],
  sizes: [
    {
      id: 'l1-agua',
      label: 'En agua',
      price: 9000,
      image: 'images/limonada1.png'
    },
    {
      id: 'l1-leche',
      label: 'En leche',
      price: 10000,
      image: 'images/limonada1.png'
    }
  ]
},
{
  id: 'l2',
  category: 'limonadas',
  title: 'Limonada de Mango Biche',
  price: 9000,
  desc: 'Limonada con sabor a mango biche, perfecta para los amantes del toque ácido.',
  image: 'images/mangobiche.png',
  ingredients: ['Limón', 'Pulpa de mango biche', 'Azúcar', 'Agua', 'Hielo'],
  sizes: [
    {
      id: 'l2-agua',
      label: 'En agua',
      price: 9000,
      image: 'images/mangobiche.png'
    },
    {
      id: 'l2-leche',
      label: 'En leche',
      price: 10000,
      image: 'images/mangobiche.png'
    }
  ]
},
{
  id: 'l3',
  category: 'limonadas',
  title: 'Limonada de Cereza',
  price: 9000,
  desc: 'Limonada con un toque dulce de cereza, ideal para acompañar tus comidas.',
  image: 'images/limonada3.png',
  ingredients: ['Limón', 'Cereza', 'Azúcar', 'Agua', 'Hielo'],
  sizes: [
    {
      id: 'l3-agua',
      label: 'En agua',
      price: 9000,
      image: 'images/limonada3.png'
    },
    {
      id: 'l3-leche',
      label: 'En leche',
      price: 10000,
      image: 'images/limonada3.png'
    }
  ]
},
{
  id: 'l4',
  category: 'limonadas',
  title: 'Limonada Piña Colada',
  price: 9500,
  desc: 'Exquisita mezcla de limón, piña y coco con un toque tropical.',
  image: 'images/piñacolada.png',
  ingredients: ['Limón', 'Piña', 'Crema de coco', 'Azúcar', 'Agua', 'Hielo'],
  sizes: [
    {
      id: 'l4-agua',
      label: 'En agua',
      price: 9500,
      image: 'images/piñacolada.png'
    },
    {
      id: 'l4-leche',
      label: 'En leche',
      price: 10500,
      image: 'images/piñacolada.png'
    }
  ]
},
{
  id: 'l5',
  category: 'limonadas',
  title: 'Tamarindo Escarchada',
  price: 9500,
  desc: 'Limonada con tamarindo natural y escarcha dulce, refrescante y diferente.',
  image: 'images/tamarindoescarchada.png',
  ingredients: ['Limón', 'Pulpa de tamarindo', 'Azúcar', 'Agua', 'Hielo'],
  sizes: [
    {
      id: 'l5-agua',
      label: 'En agua',
      price: 9500,
      image: 'images/tamarindoescarchada.png'
    },
    {
      id: 'l5-leche',
      label: 'En leche',
      price: 10500,
      image: 'images/tamarindoescarchada.png'
    }
  ]
},
{
  id: 'l6',
  category: 'limonadas',
  title: 'Soda Escarchada',
  price: 9500,
  desc: 'Refrescante soda escarchada con toque cítrico y hielo granizado.',
  image: 'images/limonada6.png',
  ingredients: ['Soda', 'Limón', 'Azúcar', 'Hielo granizado'],
  sizes: [
    {
      id: 'l6-agua',
      label: 'En agua',
      price: 9500,
      image: 'images/limonada6.png'
    },
    {
      id: 'l6-leche',
      label: 'En leche',
      price: 10500,
      image: 'images/limonada6.png'
    }
  ]
}
,
// === GASEOSAS ===
{ //contiene sizes
  id: 'g1',
  category: 'gaseosas',
  title: 'Postobon',
  price: 5000,
  desc: 'Refrescante Postobón sabor tradicional, disponible en presentacion personal y familiar. Pregunta nuestros sabores disponibles',
  image: 'images/postobon.png',
  ingredients: ['Postobón 400ml'],
   sizes: [
    {
      id: 'gaseperso1',
      label: 'personal',
      price: 5000,
      image: 'images/postobon.png'
    },
    {
      id: 'gasefami1',
      label: 'familiar',
      price: 8000,
      image: 'images/postobon.png'
    }
  ]
},
{
  id: 'g2',
  category: 'gaseosas',
  title: 'Sprite',
  price: 5000,
  desc: 'Clásica Sprite con su sabor cítrico único, disponible en presentacion personal.',
  image: 'images/sprite.png',
  ingredients: ['Sprite 1.5L']
},
{//contiene sizes
  id: 'g3',
  category: 'gaseosas',
  title: 'Quatro',
  price: 5000,
  desc: 'Refrescante Quatro con su toque cítrico natural, disponible en presentacion personal y familiar.',
  image: 'images/quatro.png',
  ingredients: ['Quatro 400ml'],
  sizes: [
    {
      id: 'gaseperso3',
      label: 'personal',
      price: 5000,
      image: 'images/quatro.png'
    },
    {
      id: 'gasefami3',
      label: 'familiar',
      price: 8000,
      image: 'images/quatro.png'
    }
  ]
},
{ //contiene sizes
  id: 'g4',
  category: 'gaseosas',
  title: 'Coca-Cola',
  price: 5000,
  desc: 'Tradicional Coca-Cola para acompañar cualquier comida, disponible en presentacion personal y familiar.',
  image: 'images/cocaCola.png',
  ingredients: ['Coca-Cola 1.5L'],
    sizes: [
    {
      id: 'gaseperso4',
      label: 'personal',
      price: 5000,
      image: 'images/cocaCola.png'
    },
    {
      id: 'gasefami4',
      label: 'familiar',
      price: 8000,
      image: 'images/cocaCola.png'
    }
  ]
},
{
  id: 'g5',
  category: 'gaseosas',
  title: 'Bretaña',
  price: 5000,
  desc: 'Clásica Bretaña, refrescante y equilibrada, disponible en presentacion personal.',
  image: 'images/bretana.png',
  ingredients: ['Bretaña 400ml']
},
{
  id: 'g6',
  category: 'gaseosas',
  title: 'H2O',
  price: 5000,
  desc: 'Deliciosa H2O saborizada, perfecta para refrescarte, disponible en presentaciones personal',
  image: 'images/H2O.png',
  ingredients: ['H2O 1.5L']
},
{//contiene sizes
  id: 'g7',
  category: 'gaseosas',
  title: 'Hit',
  price: 5000,
  desc: 'Dulce y refrescante jugo Hit, disponible en presentacion personal y familiar. Pregunta nuestros sabores disponibles',
  image: 'images/hit.png',
  ingredients: ['Hit 400ml'],
      sizes: [
    {
      id: 'hitperso7',
      label: 'personal',
      price: 5000,
      image: 'images/hit.png'
    },
    {
      id: 'hitfami7',
      label: 'familiar',
      price: 8000,
      image: 'images/hit.png'
    }
  ]
},
{
  id: 'g8',
  category: 'gaseosas',
  title: 'Premio',
  price: 5000,
  desc: 'Refrescante gaseosa Premio, disponible en presentacion personal.',
  image: 'images/premio.png',
  ingredients: ['Premio 400ml']
},

//MALTEADAS
{
  id: 'malte1',
  category: 'malteadas',
  title: 'Malteadas',
  price: 12000,
  desc: 'Cremosas malteadas! Pregunta por nuestros Sabores disponibles.',
  image: 'images/malteada1.png',
  ingredients: ['Leche', 'Helado de vainilla', 'Crema batida']
},
/*{
  id: 'm2',
  category: 'malteadas',
  title: 'Malteada de Chocolate',
  price: 12000,
  desc: 'Deliciosa malteada de chocolate con trozos de cacao.',
  image: 'images/malteada2.png',
  ingredients: ['Leche', 'Helado de chocolate', 'Cacao']
},
{
  id: 'm3',
  category: 'malteadas',
  title: 'Malteada de Fresa',
  price: 12000,
  desc: 'Malteada de fresa natural con crema batida.',
  image: 'images/malteada3.png',
  ingredients: ['Leche', 'Fresas naturales', 'Helado de fresa']
},
{
  id: 'm4',
  category: 'malteadas',
  title: 'Malteada de Oreo',
  price: 13000,
  desc: 'Cremosa malteada de vainilla con galletas Oreo trituradas.',
  image: 'images/malteada4.png',
  ingredients: ['Leche', 'Helado de vainilla', 'Galletas Oreo']
},
{
  id: 'm5',
  category: 'malteadas',
  title: 'Malteada de Arequipe',
  price: 13000,
  desc: 'Malteada con helado de vainilla y arequipe artesanal.',
  image: 'images/malteada5.png',
  ingredients: ['Leche', 'Helado de vainilla', 'Arequipe']
},
{
  id: 'm6',
  category: 'malteadas',
  title: 'Malteada de Café',
  price: 13000,
  desc: 'Refrescante malteada con sabor a café colombiano.',
  image: 'images/malteada6.png',
  ingredients: ['Leche', 'Helado de café', 'Café espresso']
},
{
  id: 'm7',
  category: 'malteadas',
  title: 'Malteada de Brownie',
  price: 14000,
  desc: 'Helado de chocolate con trozos de brownie y crema.',
  image: 'images/malteada7.png',
  ingredients: ['Leche', 'Helado de chocolate', 'Brownie']
},
{
  id: 'm8',
  category: 'malteadas',
  title: 'Malteada de Mango',
  price: 12000,
  desc: 'Malteada tropical con mango natural y helado de vainilla.',
  image: 'images/malteada8.png',
  ingredients: ['Leche', 'Mango', 'Helado de vainilla']
}*/
  

//PAPAS
/*{ 
    id: 'pap1',
    category: 'papas',
    title: 'Papas Locas',
    price: 12000,
    desc:'Papas con toppings',
    image: 'images/pap1.png',
    ingredients:['Salsa','Queso'],
    extras:[{name:'Pollo',price:2000}]
  },
  { 
    id: 'pap2',
    category: 'papas',
    title: 'Papas Loki Aventura',
    price: 12000,
    desc:'Papas con toppings',
    image: 'images/pap2.png',
    ingredients:['Salsa','Queso'],
    extras:[{name:'Pollo',price:2000}]
  },
  { 
    id: 'pap3',
    category: 'papas',
    title: 'Loki Papas XL',
    price: 12000,
    desc:'Papas con toppings',
    image: 'images/pap3.png',
    ingredients:['Salsa','Queso'],
    extras:[{name:'Pollo',price:2000}]
  },
  { 
    id: 'pap4',
    category: 'papas',
    title: 'Crazy papas premium',
    price: 12000,
    desc:'Papas con toppings',
    image: 'images/pap4.png',
    ingredients:['Salsa','Queso'],
    extras:[{name:'Pollo',price:2000}]
  },
  { 
    id: 'pap5',
    category: 'papas',
    title: 'Papas Loks ',
    price: 12000,
    desc:'Papas con toppings',
    image: 'images/pap5.png',
    ingredients:['Salsa','Queso'],
    extras:[{name:'Pollo',price:2000}]
  },
  { 
    id: 'pap6',
    category: 'papas',
    title: 'Papas Lokis',
    price: 12000,
    desc:'Papas con toppings',
    image: 'images/pap6.png',
    ingredients:['Salsa','Queso'],
    extras:[{name:'Pollo',price:2000}]
  },
  { 
    id: 'bebi1',
    category: 'gaseosas',
    title: 'Fanta Naranja 330ml',
    price: 4500,
    desc:'Refresco',
    image: 'images/beb1.png',
    ingredients:[],
    extras:[]
  },
  { 
    id: 'bebi2',
    category: 'gaseosas',
    title: 'Coca Cola 1.5L',
    price: 7500,
    desc:'Refresco',
    image: 'images/beb2.png',
    ingredients:[],
    extras:[]
  },
  { 
    id: 'bebi3',
    category: 'gaseosas',
    title: 'Fanta Lata',
    price: 3500,
    desc:'Refresco',
    image: 'images/beb3.png',
    ingredients:[],
    extras:[]
  },
  { 
    id: 'bebi4',
    category: 'gaseosas',
    title: 'Pepsi Lata',
    price: 5500,
    desc:'Refresco',
    image: 'images/beb4.png',
    ingredients:[],
    extras:[]
  },
  { 
    id: 'bebi5',
    category: 'gaseosas',
    title: 'Monster Lata',
    price: 7500,
    desc:'Refresco',
    image: 'images/beb5.png',
    ingredients:[],
    extras:[]
  },
  { 
    id: 'bebi6',
    category: 'gaseosas',
    title: 'Schweppes Lata',
    price: 5500,
    desc:'Refresco',
    image: 'images/beb6.png',
    ingredients:[],
    extras:[]
  },
  { 
    id: 'o1',
    category: 'otros',
    title: 'Nuggets + Papas',
    price: 25000,
    desc:'Con salsa especial',
    image: 'images/otros1.png',
    ingredients:['Salsa'],
    extras: [{ name: 'Maicitos', price: 2000 },{ name: 'Porción de papas a la francesa', price: 3500 },{ name: 'Huevos de codorniz', price: 1500 },{ name: 'Queso', price: 1500 },{ name: 'Tocineta', price: 2500 }]
  }*/
];

const categories = [...new Set(products.map(p=>p.category))];

// ---------- Estado ----------
let cart = JSON.parse(localStorage.getItem('tb_cart') || '[]');
let activeCategory = 'hamburguesas';

// ---------- DOM refs ----------
const catalogEl = document.getElementById('catalog');
const categoriesEl = document.querySelector('.categories');
const navBtns = document.querySelectorAll('.nav-btn');
const cartCountEl = document.getElementById('cart-count');
const cartDrawer = document.getElementById('cart-drawer');
const cartItemsEl = document.getElementById('cart-items');
const cartSubtotalEl = document.getElementById('cart-subtotal');
const cartDeliveryEl = document.getElementById('cart-delivery');
const cartTotalEl = document.getElementById('cart-total');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const checkoutBtn = document.getElementById('checkout-btn');
const productModal = document.getElementById('product-modal');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');
const checkoutModal = document.getElementById('checkout-modal');
const checkoutForm = document.getElementById('checkout-form');
const addressLabel = document.getElementById('address-label');
const checkoutClose = document.getElementById('checkout-close');
const backToCartBtn = document.getElementById('back-to-cart');
const clearCartBtn = document.getElementById('clear-cart');
const searchInput = document.getElementById('search');

// ---------- Init ----------
function init(){
  renderCategories();
  setActiveCategory(activeCategory);
  bindEvents();
  refreshCartUI();
}
init();

// ---------- Render categorías ----------
function renderCategories(){
  categoriesEl.innerHTML = '';
  categories.forEach(cat=>{
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = cat === activeCategory ? 'active' : '';
    btn.dataset.cat = cat;
    btn.textContent = capitalize(cat);
    btn.addEventListener('click', ()=> switchCategory(cat));
    categoriesEl.appendChild(btn);
  });
}

// ---------- Cambiar categoría ----------
function setActiveCategory(cat){
  activeCategory = cat;
  Array.from(document.querySelectorAll('.categories button')).forEach(b=> b.classList.toggle('active', b.dataset.cat === cat));
  Array.from(navBtns).forEach(b=> b.classList.toggle('active', b.dataset.cat === cat));
  renderProducts(cat);
}

function switchCategory(cat){
  const ct = catalogEl;
  ct.classList.remove('fade-in');
  ct.classList.add('fade-out');
  setTimeout(()=>{
    setActiveCategory(cat);
    ct.classList.remove('fade-out');
    ct.classList.add('fade-in');
  }, 180);
}
// ---------- Render productos ----------
function renderProducts(cat) { 
  const q = (searchInput.value || '').trim().toLowerCase();
  const items = products.filter(p => 
    p.category === cat && 
    (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
  );

  catalogEl.innerHTML = '';

  if (items.length === 0) {
    catalogEl.innerHTML = `<div class="no-results">No hay productos</div>`;
    return;
  }

  items.forEach(p => {
    const el = document.createElement('article');
    el.className = 'card';
    el.innerHTML = `
      <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.title)}">
      <div class="title">${escapeHtml(p.title)}</div>
      <div class="desc">${escapeHtml(p.desc)}</div>
      <div class="meta">
        <div class="price">$${numberWithCommas(p.price)}</div>
        <button class="add" data-id="${p.id}">Agregar</button>
      </div>
    `;
    el.querySelector('.add').addEventListener('click', () => openProductModal(p.id));
    catalogEl.appendChild(el);
  });
}


// ---------- MINI MODAL CLEAN ----------
// ---------- FUNCION CORREGIDA: openProductModal ----------
function openProductModal(id, cartIndex = null) {

  const p = products.find(x => x.id === id);
  if (!p) return;

  // ======== NUEVO: tamaño seleccionado (primer tamaño por defecto) ========
  let selectedSize = p.sizes ? p.sizes[0] : { id: p.id, price: p.price, image: p.image, label: '' };

  // === CREAR OVERLAY ===
  const overlay = document.createElement("div");
  overlay.className = "product-overlay";
  
  overlay.innerHTML = `
    <div class="product-sheet">
      <div class="modal-header">
        <span class="close">&times;</span>
      </div>

      <div class="modal-body">
        <div class="image-wrap">
          <img id="product-img" src="${selectedSize.image}" alt="${p.title}">
        </div>

        <div class="info">
          <h2>${p.title}</h2>
          <p>${p.desc}</p>

          ${p.sizes ? `
            <h3>Variedad</h3>
            <div class="size-selector">
              ${p.sizes.map(s => `
                <label class="size-option">
                  <input type="radio" name="size" value="${s.id}" ${s.id === selectedSize.id ? "checked" : ""}>
                  ${s.label} — $${numberWithCommas(s.price)}
                </label>
              `).join("")}
            </div>
          ` : ""}

          ${ p.extras?.length ? `
            <h3>Adiciones</h3>
            <div class="extras-list">
              ${p.extras.map((e, i) => `
                <label>
                  <input type="checkbox" data-id="${e.id}" data-name="${e.name}" data-price="${e.price}">
                  <span>${e.name}</span>
                  <span class="extra-controls" data-index="${i}">
                    <button class="minus-extra">−</button>
                    <span class="extra-qty">0</span>
                    <button class="plus-extra">+</button>
                  </span>
                  <small>+$${numberWithCommas(e.price)}</small>
                </label>
              `).join("")}
            </div>
          ` : "" }

          <div class="quantity">
            <button class="minus">−</button>
            <span class="qty">1</span>
            <button class="plus">+</button>
          </div>

          <button class="add-btn">
            ${cartIndex !== null ? 'Actualizar' : 'Agregar'} 
            <span class="price">$${numberWithCommas(selectedSize.price)}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // ---- Cierre ----
  overlay.querySelector(".close").addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", e => { if (e.target === overlay) overlay.remove(); });

  // ===== VARIABLES =====
  let qty = 1;
  const qtyEl = overlay.querySelector(".qty");
  const priceEl = overlay.querySelector(".price");
  const extrasQty = Array(p.extras?.length || 0).fill(0);
  const extrasInputs = overlay.querySelectorAll(".extras-list input");

  // ===== SI ES EDICIÓN =====
  if (cartIndex !== null) {
    const item = cart[cartIndex];

    // Encontrar el tamaño usado
    if (p.sizes) {
      selectedSize = p.sizes.find(s => s.id === item.sizeId) || p.sizes[0];
      overlay.querySelector("#product-img").src = selectedSize.image;
      overlay.querySelector(`input[value="${selectedSize.id}"]`).checked = true;
    }

    qty = item.qty;
    qtyEl.textContent = qty;

    if (item.extras?.length) {
      item.extras.forEach(e => {
        const idx = p.extras.findIndex(pe => pe.name === e.name);
        if (idx >= 0) extrasQty[idx] = e.qty;
      });
    }

    extrasInputs.forEach((input, i) => {
      input.checked = extrasQty[i] > 0;
      input.closest("label").querySelector(".extra-qty").textContent = extrasQty[i];
    });
  }

  // ===== UPDATE PRICE =====
  function updatePrice() {
    const extrasTotal = (p.extras || [])
      .reduce((sum, e, i) => sum + e.price * extrasQty[i], 0);

    const total = (selectedSize.price + extrasTotal) * qty;
    priceEl.textContent = `$${numberWithCommas(total)}`;
  }

  updatePrice();

  // ===== CAMBIAR TAMAÑO DINÁMICAMENTE =====
  overlay.querySelectorAll("input[name='size']").forEach(radio => {
    radio.addEventListener("change", e => {
      const sizeId = e.target.value;
      selectedSize = p.sizes.find(s => s.id === sizeId);

      overlay.querySelector("#product-img").src = selectedSize.image;

      updatePrice();
    });
  });

  // ===== CANTIDAD =====
  overlay.querySelector(".plus").addEventListener("click", () => { qty++; qtyEl.textContent = qty; updatePrice(); });
  overlay.querySelector(".minus").addEventListener("click", () => { if (qty > 1) qty--; qtyEl.textContent = qty; updatePrice(); });

  // ===== ADICIONES =====

  // *** NUEVO: si el usuario marca el checkbox sin tocar +, qty = 1 automáticamente ***
  extrasInputs.forEach((input, i) => {
    input.addEventListener("change", () => {
      if (input.checked && extrasQty[i] === 0) {
        extrasQty[i] = 1;
        input.closest("label").querySelector(".extra-qty").textContent = 1;
      } else if (!input.checked) {
        extrasQty[i] = 0;
        input.closest("label").querySelector(".extra-qty").textContent = 0;
      }
      updatePrice();
    });
  });

  overlay.querySelectorAll(".plus-extra").forEach(btn => {
    const i = parseInt(btn.parentElement.dataset.index);
    const qtyDisplay = btn.parentElement.querySelector(".extra-qty");

    btn.addEventListener("click", () => {
      extrasQty[i]++;
      qtyDisplay.textContent = extrasQty[i];
      extrasInputs[i].checked = true;
      updatePrice();
    });
  });

  overlay.querySelectorAll(".minus-extra").forEach(btn => {
    const i = parseInt(btn.parentElement.dataset.index);
    const qtyDisplay = btn.parentElement.querySelector(".extra-qty");

    btn.addEventListener("click", () => {
      if (extrasQty[i] > 0) {
        extrasQty[i]--;
        qtyDisplay.textContent = extrasQty[i];
        extrasInputs[i].checked = extrasQty[i] > 0;
        updatePrice();
      }
    });
  });

  // ===== AGREGAR AL CARRITO =====
  overlay.querySelector(".add-btn").addEventListener("click", () => {
    const extras = (p.extras || [])
      .map((e, i) => ({ name: e.name, price: e.price, qty: extrasQty[i] }))
      .filter(e => e.qty > 0);

    const item = {
      productId: p.id,
      sizeId: selectedSize.id,
      title: selectedSize.label ? `${p.title} (${selectedSize.label})` : p.title,
      price: selectedSize.price,
      qty,
      image: selectedSize.image,
      extras
    };

    if (cartIndex !== null) {
      cart[cartIndex] = item;
    } else {
      addToCart(item);
    }

    persistCart();
    refreshCartUI();
    updateCartBadge();
    overlay.remove();
    cartDrawer.classList.remove("hidden");
  });
}





// ---------- Carrito ----------

// Agregar producto al carrito
function addToCart(item) {
  // Si ya existe el mismo producto con las mismas adiciones, solo aumentar cantidad
  const existing = cart.find(c => 
    c.productId === item.productId && 
    JSON.stringify(c.extras) === JSON.stringify(item.extras)
  );

  if (existing) {
    existing.qty += item.qty;
  } else {
    cart.push(item);
  }
  persistCart();
  refreshCartUI();
  updateCartBadge();
}

// Guardar en localStorage
function persistCart() {
  localStorage.setItem('tb_cart', JSON.stringify(cart));
}

// Actualizar contador del ícono del carrito
function updateCartBadge() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCountEl.textContent = count;
}

// Renderizar los ítems del carrito
// ---------- Carrito ----------
// ---------- refreshCartUI CORREGIDA PARA REFLEJAR CAMBIOS ----------
function refreshCartUI() {
  cartItemsEl.innerHTML = '';
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<div class="empty">Tu carrito está vacío 🍔</div>';
    cartSubtotalEl.textContent = '$0';
    cartDeliveryEl.textContent = '$0';
    cartTotalEl.textContent = '$0';
    updateCartBadge();
    return;
  }

  let subtotal = 0;

  cart.forEach((item, idx) => {
    // --- CALCULAR PRECIO REAL DEL ITEM CON EXTRAS ---
    const extrasTotal = item.extras?.reduce((sum, e) => sum + e.price * e.qty, 0) || 0;

    // 🔥 FIX: precio del item sumando adiciones
    const itemTotal = (item.price + extrasTotal) * item.qty;

    subtotal += itemTotal;

    const extrasText = item.extras?.length
      ? item.extras.map(e => `+ ${e.name} x${e.qty} ($${numberWithCommas(e.price * e.qty)})`).join('<br>')
      : '';

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img class="cart-item-img" src="${item.image}" alt="${item.title}">
      <div class="info">
        <h4>${item.title}</h4>
        ${extrasText ? `<small>${extrasText}</small>` : ''}
        <div class="qty-controls">
          <button class="minus">−</button>
          <span>${item.qty}</span>
          <button class="plus">+</button>
        </div>
      </div>
      <div class="price">
        <span>$${numberWithCommas(itemTotal)}</span>
        <button class="remove-btn" title="Eliminar producto">🗑️</button>
      </div>
    `;

    // --- CONTROL DE CANTIDAD ---
    div.querySelector('.plus').addEventListener('click', () => {
      item.qty++;
      persistCart();
      refreshCartUI();
    });

    div.querySelector('.minus').addEventListener('click', () => {
      if (item.qty > 1) {
        item.qty--;
      } else {
        cart.splice(idx, 1);
      }
      persistCart();
      refreshCartUI();
    });

    // --- ELIMINAR PRODUCTO ---
    div.querySelector('.remove-btn').addEventListener('click', () => {
      if (confirm(`¿Eliminar "${item.title}" del carrito?`)) {
        cart.splice(idx, 1);
        persistCart();
        refreshCartUI();
      }
    });

    // --- EDITAR PRODUCTO DESDE EL CARRITO ---
    div.addEventListener('click', (e) => {
      if (!e.target.classList.contains('minus') && !e.target.classList.contains('plus') && !e.target.classList.contains('remove-btn')) {
        cartDrawer.classList.add('hidden'); // esconder carrito
        openProductModal(item.productId, idx); // enviar índice para edición
      }
    });

    cartItemsEl.appendChild(div);
  });

  cartSubtotalEl.textContent = `$${numberWithCommas(subtotal)}`;
  cartDeliveryEl.textContent = `$${numberWithCommas(DELIVERY_FEE)}`;
  cartTotalEl.textContent = `$${numberWithCommas(subtotal + DELIVERY_FEE)}`;
  updateCartBadge();
}














// ---------- Interacciones UI ----------
openCartBtn.addEventListener('click', ()=>{ cartDrawer.classList.remove('hidden'); cartDrawer.setAttribute('aria-hidden','false'); });
closeCartBtn.addEventListener('click', ()=>{ cartDrawer.classList.add('hidden'); cartDrawer.setAttribute('aria-hidden','true'); });
checkoutBtn.addEventListener('click', ()=>{ cartDrawer.classList.add('hidden'); openCheckout(); });
clearCartBtn.addEventListener('click', ()=>{ if(confirm('Vaciar carrito?')){ cart = []; persistCart(); refreshCartUI(); } });

// ---------- Checkout ----------

// ---------- Checkout ----------
function openCheckout() {
  if (cart.length === 0) { 
    alert('El carrito está vacío.'); 
    return; 
  }

  // 🔹 Recalcular subtotal actual (incluyendo extras)
const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);


  const delivery = 0; // por defecto
  const total = subtotal + delivery;

  // 🔹 Actualizar DOM inicial
  document.getElementById('cart-subtotal').textContent = `$${numberWithCommas(subtotal)}`;
  document.getElementById('cart-delivery').textContent = `$${numberWithCommas(delivery)}`;
  document.getElementById('cart-total').textContent = `$${numberWithCommas(total)}`;
  document.getElementById('cart-total-checkout').textContent = `$${numberWithCommas(total)}`;

  // 🔹 Reset formulario
  checkoutForm.reset();
  document.getElementById('address-label').classList.add('hidden');
  document.getElementById('envio-row').classList.add('hidden');

  // 🔹 Mostrar modal
  checkoutModal.classList.remove('hidden');
  checkoutModal.setAttribute('aria-hidden', 'false');

  // 🔹 Recalcular al cambiar método (recoger/domicilio)
  const radios = checkoutForm.querySelectorAll('input[name="method"]');
  radios.forEach(radio => {
    radio.addEventListener('change', () => {
      const method = checkoutForm.querySelector('input[name="method"]:checked')?.value || 'recoger';
      const addressLabel = document.getElementById('address-label');
      const envioRow = document.getElementById('envio-row');
      const deliveryEl = document.getElementById('cart-delivery');
      const totalCheckoutEl = document.getElementById('cart-total-checkout');

      const DELIVERY_FEE = 0;
      const delivery = (method === 'domicilio' && subtotal > 0) ? DELIVERY_FEE : 0;
      const totalUpdated = subtotal + delivery;

      // Mostrar/ocultar campos
      addressLabel.classList.toggle('hidden', method !== 'domicilio');
      envioRow.classList.toggle('hidden', method !== 'domicilio');

      // Actualizar montos
      deliveryEl.textContent = `$${numberWithCommas(delivery)}`;
      totalCheckoutEl.textContent = `$${numberWithCommas(totalUpdated)}`;
    });
  });
}


checkoutClose.addEventListener('click', () => {
  checkoutModal.classList.add('hidden');
  checkoutModal.setAttribute('aria-hidden', 'true');
});

backToCartBtn.addEventListener('click', () => {
  checkoutModal.classList.add('hidden');
  cartDrawer.classList.remove('hidden');
});

// === Calcular totales del checkout ===
function updateCheckoutTotals() {
  const method = checkoutForm.querySelector('input[name="method"]:checked')?.value || 'recoger';
  const envioRow = document.getElementById('envio-row');
  const subtotalEl = document.getElementById('cart-subtotal-checkout');
  const deliveryEl = document.getElementById('cart-delivery-checkout');
  const totalEl = document.getElementById('cart-total-checkout');

  const DELIVERY_FEE = 0; // mismo valor usado en refreshCartUI

  // Mostrar u ocultar campo de dirección
  addressLabel.classList.toggle('hidden', method !== 'domicilio');

  // 🧾 Heredamos los valores que ya calcula refreshCartUI()
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // 🚚 Si el método es domicilio, se suma el envío
  const delivery = method === 'domicilio' && subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  // Mostrar/ocultar fila de envío
  envioRow.classList.toggle('hidden', method !== 'domicilio');

  // ✅ Actualizar DOM (heredado del refreshCartUI, con ajuste solo si hay envío)
  subtotalEl.textContent = document.getElementById('cart-subtotal').textContent;
  deliveryEl.textContent = document.getElementById('cart-delivery').textContent;
  totalEl.textContent = method === 'domicilio'
    ? `$${numberWithCommas(total)}`
    : document.getElementById('cart-total-checkout').textContent;
}


checkoutForm.addEventListener('change', updateCheckoutTotals);






// Envío por WhatsApp
checkoutForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const fd = new FormData(checkoutForm);
  const clientName = fd.get('name')?.trim() || '';
  const clientPhone = fd.get('phone')?.trim() || '';
  const method = fd.get('method') || 'recoger';
  const payment = fd.get('payment') || '';
  const address = fd.get('address')?.trim() || '';
  const notes = fd.get('notes')?.trim() || '';

  let textParts = [];

  // Cabecera
  textParts.push('🧾 *Nuevo Pedido - Arepas Dog Burger 🍔✅*');
  textParts.push(`👤 Cliente: ${clientName}`);
  textParts.push(`📞 Teléfono: ${clientPhone}`);
  textParts.push(`🚚 Tipo: ${method}`);
  if (method === 'domicilio') textParts.push(`🏠 Dirección: ${address}`);
  textParts.push(`💳 Pago: ${payment}`);
  textParts.push('');
  textParts.push('🍔 *Detalle del pedido:*');

  let subtotal = 0;

  cart.forEach(item => {
    // Calcular precio de extras individualmente
    const extras = item.extras || [];
    const extrasLines = extras.map(e => `   ➕ ${e.qty}x ${e.name} ($${numberWithCommas(e.price * e.qty)})`).join('\n');
    const extrasSum = extras.reduce((sum, e) => sum + e.price * e.qty, 0);

    const itemTotal = (item.price + extrasSum) * item.qty;
    subtotal += itemTotal;

    // Mostrar solo precio del artículo base + extras detallados
    textParts.push(`${item.qty}x ${item.title} — *$${numberWithCommas(item.price * item.qty)}*`);
    if (extrasLines) textParts.push(extrasLines);

    // Si hay toppings removidos
    if (item.removed && item.removed.length) {
      textParts.push(`   ⚠️ Toppings removidos: ${item.removed.join(', ')}`);
    }
  });

  const delivery = method === 'domicilio' ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  // Resumen de totales
  textParts.push('');
  textParts.push(`🧮 Subtotal: $${numberWithCommas(subtotal)}`);
  textParts.push(method === 'domicilio'
    ? `🚗 Envío: $${numberWithCommas(delivery)}`
    : '🏪 Envío: Sin costo (recoge en el local)');
  textParts.push(`💰 *Total: $${numberWithCommas(total)}*`);

  if (notes) textParts.push(`📝 Notas: ${notes}`);

  // Construir URL para WhatsApp
  const bp = String(BUSINESS_PHONE || '').replace(/\D/g, '');
  if (!bp || bp.length < 8) {
    alert('Configura BUSINESS_PHONE en app.js con el número del negocio.');
    return;
  }

  const msg = encodeURIComponent(textParts.join('\n'));
  const waUrl = `https://wa.me/${bp}?text=${msg}`;

  window.open(waUrl, '_blank');
});





// ---------- Utilidades ----------
function bindEvents(){
  navBtns.forEach(b=> b.addEventListener('click', ()=> setActiveCategory(b.dataset.cat)));
  cartCountEl.addEventListener('dblclick', ()=> { if(confirm('Vaciar carrito?')){ cart = []; persistCart(); refreshCartUI(); } });
  checkoutModal.addEventListener('click', (e)=> { if(e.target === checkoutModal) checkoutModal.classList.add('hidden'); });
  searchInput.addEventListener('input', ()=> renderProducts(activeCategory));
}

function capitalize(s){ return String(s || '').charAt(0).toUpperCase() + String(s || '').slice(1); }
function numberWithCommas(x){ return String(x).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function escapeHtml(s){ return String(s || '').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }



// ====== MENÚ LATERAL ======
const menuBtn = document.getElementById('menu-btn');
const sideMenu = document.getElementById('side-menu');
const closeMenu = document.getElementById('close-menu');

menuBtn.addEventListener('click', () => {
  // Primero activamos el menú
  sideMenu.classList.add('show');
  sideMenu.style.opacity = 0;
  sideMenu.style.transform = 'translateX(-20px)'; // empieza desplazado
  sideMenu.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  // Forzamos el repaint antes de animar
  requestAnimationFrame(() => {
    sideMenu.style.opacity = 1;
    sideMenu.style.transform = 'translateX(0)';
  });
  sideMenu.classList.remove('hidden');
});


closeMenu.addEventListener('click', () => {
  sideMenu.classList.remove('show');
  setTimeout(() => sideMenu.classList.add('hidden'), 350);
});

// Cerrar tocando fuera del panel
sideMenu.addEventListener('click', (e) => {
  if (e.target === sideMenu) {
    sideMenu.classList.remove('show');
    setTimeout(() => sideMenu.classList.add('hidden'), 350);
  }
});




// ====== FORMULARIO DE PAGO ======

document.addEventListener("DOMContentLoaded", () => {
  const paymentSelect = document.getElementById("payment-method");
  const transferInfo = document.getElementById("transfer-info");
  const methodRadios = document.querySelectorAll('input[name="method"]');
  const addressLabel = document.getElementById("address-label");
  const envioRow = document.getElementById("envio-row");
  const cartDelivery = document.getElementById("cart-delivery");
  const DELIVERY_FEE = 0; // 💰 valor del domicilio
  const accountNumber = document.getElementById("account-number");
  const copyBtn = document.getElementById("copy-account");

  // 🔸 Mostrar u ocultar dirección según método de entrega
  methodRadios.forEach(radio => {
    radio.addEventListener("change", () => {
      if (radio.value === "domicilio" && radio.checked) {
        addressLabel.classList.remove("hidden");
        envioRow.classList.remove("hidden");
        cartDelivery.textContent = `$${DELIVERY_FEE.toLocaleString()}`;
      } else if (radio.value === "recoger" && radio.checked) {
        addressLabel.classList.add("hidden");
        envioRow.classList.add("hidden");
        cartDelivery.textContent = "$0";
      }
    });
  });

  // 🔸 Mostrar info bancaria solo si selecciona transferencia
  paymentSelect.addEventListener("change", () => {
    if (paymentSelect.value === "transferencia") {
      transferInfo.classList.remove("hidden");
    } else {
      transferInfo.classList.add("hidden");
    }
  });

  // 🔸 Copiar número de cuenta
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(accountNumber.textContent.trim())
      .then(() => {
        copyBtn.textContent = "¡Copiado!";
        copyBtn.classList.add("copied");
        setTimeout(() => {
          copyBtn.textContent = "Copiar";
          copyBtn.classList.remove("copied");
        }, 1800);
      })
      .catch(() => alert("No se pudo copiar"));
  });
});


// --- FORM MULTIPASO (compatible con checkout actual) ---
const form = document.getElementById("checkout-form");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");
const nextStep1 = document.getElementById("next-step1");
const backStep2 = document.getElementById("back-step2");
const clientSummary = document.getElementById("client-summary");

if (nextStep1) {
  nextStep1.addEventListener("click", () => {
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    if (!name || !phone) {
      alert("Por favor completa tu nombre y teléfono.");
      return;
    }

    // Mostrar resumen
    clientSummary.innerHTML = `<strong>${name} </strong><span>${phone}</span>`;

    // Animación de transición
    step1.classList.remove("active");
    step2.classList.add("active");
  });
}

if (backStep2) {
  backStep2.addEventListener("click", () => {
    step2.classList.remove("active");
    step1.classList.add("active");
  });
}



const checkoutOverlay = document.getElementById("checkout-modal");
const btnConfirmOrder = document.getElementById("confirm-order"); // botón en el carrito
const btnBackToCart = document.getElementById("back-to-cart");

btnConfirmOrder?.addEventListener("click", () => {
  checkoutOverlay.classList.remove("hidden");
});

btnBackToCart?.addEventListener("click", () => {
  checkoutOverlay.classList.add("hidden");
});


// También cerrar si se toca fuera del panel
checkoutOverlay.addEventListener("click", (e) => {
  if (e.target === checkoutOverlay) {
    checkoutOverlay.classList.remove("show");
  }
});


// ============Descargar QR=================
document.addEventListener("click", (e) => {
  // Usa closest para soportar clicks sobre el SVG interno de FontAwesome
  const btn = e.target.closest && e.target.closest(".qr-download");
  if (!btn) return;

  const imgPath = btn.dataset.img;
  if (!imgPath) {
    console.warn("qr-download sin data-img");
    return;
  }

  // helper para descargar
  const downloadImage = (url) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = url.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Si SweetAlert2 no está disponible, fallback a confirm nativo
  if (typeof Swal === "undefined") {
    console.warn("SweetAlert2 (Swal) no disponible. Usando confirm nativo.");
    const ok = confirm(
      "Puedes pagar escaneando nuestros códigos QR de Nequi o Bancolombia.\n\nTambién puedes descargar los QR. ¿Descargar ahora?"
    );
    if (ok) downloadImage(imgPath);
    return;
  }

  // SweetAlert2 disponible -> mostrar alerta antes de descargar
  Swal.fire({
    icon: "info",
    title: "Pago con QR",
    html: `
      Puedes pagar escaneando nuestros códigos QR de <strong>Nequi</strong> o <strong>Bancolombia</strong>.<br><br>
      También puedes <strong>descargar los QR</strong> dando clic en el icono de descarga.
    `,
    showCancelButton: true,
    confirmButtonText: "Descargar",
    cancelButtonText: "Cancelar",
    background: "#0a0a0a",             // fondo negro
    color: "#ffffff",                   // texto blanco
    confirmButtonColor: "rgb(230, 213, 12)", // botón amarillo neón
    cancelButtonColor: "#555555",       // cancel gris oscuro
    iconColor: "rgb(230, 213, 12)"      // icono amarillo neón
  }).then(result => {
    if (result.isConfirmed) downloadImage(imgPath);
  });
});



// ============Fin de codigo de Descarga QR=================





