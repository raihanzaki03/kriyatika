// Data produk terpusat
const productsData = [
    {
        id: "tas-anyaman-rotan",
        name: "Tas Anyaman Rotan Estetik",
        image: "Tas-Anyaman-Rotan.jpg", 
        description: "Tas anyaman rotan berkualitas tinggi, handcrafted oleh pengrajin lokal. Ideal untuk gaya kasual dan elegan.",
        price: "Rp 150.000",
        category: "anyaman"
    },
    {
        id: "gelang-kayu-jati",
        name: "Gelang Kayu Jati Unik",
        image: "gelang-kayu-jati.jpg",
        description: "Gelang fashion dari kayu jati pilihan, desain minimalis dan nyaman dipakai.",
        price: "Rp 75.000",
        category: "aksesoris"
    },
    {
        id: "dekorasi-macrame",
        name: "Dekorasi Dinding Macrame",
        image: "Dekorasi-Dinding-Macrame.jpg",
        description: "Hiasan dinding macrame handmade, menambah sentuhan bohemian pada ruangan Anda.",
        price: "Rp 220.000",
        category: "dekorasi"
    },
    {
        id: "tempat-pensil-anyaman",
        name: "Tempat Pensil Anyaman Bambu",
        image: "Tempat-Pensil-Anyaman.jpg",
        description: "Tempat pensil fungsional dari anyaman bambu, cocok untuk meja kerja atau hadiah.",
        price: "Rp 50.000",
        category: "anyaman"
    },
    {
        id: "keranjang-serbaguna",
        name: "Keranjang Anyaman Serbaguna",
        image: "Keranjang-Anyaman-Serbaguna.jpg",
        description: "Keranjang serbaguna dari anyaman mendong, cocok untuk penyimpanan atau dekorasi.",
        price: "Rp 90.000",
        category: "anyaman"
    },
    {
        id: "bros-batik-kayu",
        name: "Bros Batik Kayu",
        image: "Bros-Batik-Kayu.jpeg",
        description: "Bros unik dengan motif batik pada kayu, aksesoris elegan untuk busana Anda.",
        price: "Rp 45.000",
        category: "aksesoris"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('nav ul');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // Optional: Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Bonus: Simple scroll animation
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            } else {
                // Optional: Reset for re-animation on scroll up
                // entry.target.style.opacity = 0;
                // entry.target.style.transform = 'translateY(50px)';
            }
        });
    }, options);

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // --- Fungsi Universal untuk Memuat Produk ---

    // Fungsi untuk memuat produk ke dalam container grid tertentu
    function loadProductsToGrid(containerId, productLimit = null) {
        const productGrid = document.getElementById(containerId);
        if (!productGrid) return;

        productGrid.innerHTML = ''; // Kosongkan grid sebelum menambahkan produk

        let productsToDisplay = productsData;
        if (productLimit) {
            productsToDisplay = productsData.slice(0, productLimit);
        }

        productsToDisplay.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.dataset.category = product.category; // Tambahkan data-category

            productCard.innerHTML = `
                <img src="img/${product.image}" alt="${product.name}">
                <div class="product-card-content">
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                    <a href="detail-produk.html?id=${product.id}" class="btn">Lihat Detail</a>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // --- Logic untuk Setiap Halaman ---

    // Halaman Beranda (index.html)
    if (document.body.classList.contains('homepage')) {
        loadProductsToGrid('product-unggulan-grid', 4); // Tampilkan 4 produk unggulan
    }

    // Halaman Produk (produk.html)
    if (document.body.classList.contains('product-page')) {
        loadProductsToGrid('product-list'); // Muat semua produk

        const filterButtons = document.querySelectorAll('.product-filter .btn');
        const productCards = document.querySelectorAll('#product-list .product-card'); // Ambil setelah diload

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const category = button.dataset.category;

                productCards.forEach(card => {
                    if (category === 'all' || card.dataset.category === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Halaman Detail Produk (detail-produk.html)
    if (document.body.classList.contains('detail-product-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        const product = productsData.find(p => p.id === productId);

        if (product) {
            document.getElementById('detail-product-image').src = `img/${product.image}`;
            document.getElementById('detail-product-name').innerText = product.name;
            document.getElementById('detail-product-description').innerText = product.description;
            document.getElementById('detail-product-price').innerText = `Harga: ${product.price}`;

            const whatsappBtn = document.querySelector('.whatsapp-btn');
            whatsappBtn.href = `https://wa.me/6281234567890?text=Halo%20KriyaKita,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(product.name)}`;
        } else {
            document.getElementById('detail-product-name').innerText = "Produk Tidak Ditemukan";
            document.getElementById('detail-product-description').innerText = "Mohon maaf, produk yang Anda cari tidak tersedia.";
            document.getElementById('detail-product-price').innerText = "";
            document.querySelector('.whatsapp-btn').style.display = 'none';
        }
    }
});