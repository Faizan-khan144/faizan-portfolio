const header = document.getElementById("header");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    if (window.scrollY > 600) {
        backTop.classList.add("visible");
    } else {
        backTop.classList.remove("visible");
    }
});

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
});

document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
    });
});

backTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

const container = document.getElementById("threeContainer");

if (container && typeof THREE !== "undefined") {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight,
        0.1,
        100
    );

    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);

    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(1.35, 1);

    const material = new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        metalness: 0.65,
        roughness: 0.22,
        transparent: true,
        opacity: 0.82,
        wireframe: false
    });

    const object = new THREE.Mesh(geometry, material);
    group.add(object);

    const wireGeometry = new THREE.IcosahedronGeometry(1.48, 1);

    const wireMaterial = new THREE.MeshBasicMaterial({
        color: 0x8b5cf6,
        wireframe: true,
        transparent: true,
        opacity: 0.35
    });

    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    group.add(wire);

    const ringGeometry = new THREE.TorusGeometry(1.85, 0.015, 16, 120);

    const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.5
    });

    const ringOne = new THREE.Mesh(ringGeometry, ringMaterial);
    ringOne.rotation.x = Math.PI / 2.4;
    group.add(ringOne);

    const ringTwo = new THREE.Mesh(
        new THREE.TorusGeometry(2.1, 0.01, 16, 120),
        new THREE.MeshBasicMaterial({
            color: 0x8b5cf6,
            transparent: true,
            opacity: 0.35
        })
    );

    ringTwo.rotation.y = Math.PI / 3;
    group.add(ringTwo);

    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 300;

    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 7;
    }

    particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x67e8f9,
        size: 0.025,
        transparent: true,
        opacity: 0.6
    });

    const particles = new THREE.Points(
        particlesGeometry,
        particlesMaterial
    );

    scene.add(particles);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x22d3ee, 5, 8);
    cyanLight.position.set(3, 3, 4);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 4, 8);
    violetLight.position.set(-3, -2, 3);
    scene.add(violetLight);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", event => {
        mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const time = clock.getElapsedTime();

        object.rotation.x = time * 0.25;
        object.rotation.y = time * 0.35;

        wire.rotation.x = -time * 0.18;
        wire.rotation.y = -time * 0.25;

        ringOne.rotation.z = time * 0.3;
        ringTwo.rotation.x = time * 0.2;
        ringTwo.rotation.z = -time * 0.15;

        particles.rotation.y = time * 0.015;

        group.position.x += (mouseX * 0.25 - group.position.x) * 0.03;
        group.position.y += (-mouseY * 0.2 - group.position.y) * 0.03;

        renderer.render(scene, camera);
    }

    animate();

    function resizeThree() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    window.addEventListener("resize", resizeThree);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
