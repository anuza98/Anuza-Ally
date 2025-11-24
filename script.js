// Mobile nav toggle
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");
if (toggle && nav) {
	toggle.addEventListener("click", () => {
		const isOpen = nav.classList.toggle("open");
		toggle.setAttribute("aria-expanded", String(isOpen));
	});
}

// Smooth scroll for same-page links (but not project links)
document.addEventListener("click", (e) => {
	const target = e.target.closest('a[href^="#"]');
	if (target && !target.classList.contains('project-link')) {
		const href = target.getAttribute("href");
		if (!href) return;
		const el = document.querySelector(href);
		if (el) {
			e.preventDefault();
			el.scrollIntoView({ behavior: "smooth", block: "start" });
			nav?.classList.remove("open");
			toggle?.setAttribute("aria-expanded", "false");
		}
	}
});

// Current year in footer
const yearEl = document.getElementById("year");
if (yearEl) {
	yearEl.textContent = String(new Date().getFullYear());
}

// Initialize Lucide icons
function initIcons() {
	if (window.lucide && typeof window.lucide.createIcons === "function") {
		window.lucide.createIcons();
	}
}

if (window.lucide && typeof window.lucide.createIcons === "function") {
	initIcons();
} else {
	window.addEventListener("load", () => {
		initIcons();
	});
}

// Project Gallery Modal
const projectModal = document.getElementById("project-modal");
const modalClose = document.querySelector(".modal-close");
const modalOverlay = document.querySelector(".modal-overlay");
const modalTitle = document.querySelector(".modal-title");
const modalGallery = document.getElementById("modal-gallery");
const projectLinks = document.querySelectorAll(".project-link");

// Image files for each project (based on folder structure)
const projectImages = {
	"Logo Design": [
		"assets/Works/Logo Design/image_original (3).Jpg",
		"assets/Works/Logo Design/image_original (4).Jpg",
		"assets/Works/Logo Design/image_original (5).Jpg",
		"assets/Works/Logo Design/Twiga Logo.png",
		"assets/Works/Logo Design/Untitled design.png",
		"assets/Works/Logo Design/Venture.png"
	],
	"Visual Identity (Branding) Design": [
		"assets/Works/Visual Identity (Branding) Design/Flyer Design/image_original (1).Jpg",
		"assets/Works/Visual Identity (Branding) Design/Flyer Design/image_original (2).Jpg",
		"assets/Works/Visual Identity (Branding) Design/Flyer Design/image_original (6).Jpg",
		"assets/Works/Visual Identity (Branding) Design/Flyer Design/image_original.Jpg",
		"assets/Works/Visual Identity (Branding) Design/Posters/electric-fence1.png",
		"assets/Works/Visual Identity (Branding) Design/Posters/Security-camera.png",
		"assets/Works/Visual Identity (Branding) Design/Posters/Security-Guard.jpg",
		"assets/Works/Visual Identity (Branding) Design/Twiga poster.png",
		"assets/Works/Visual Identity (Branding) Design/Twiga.png",
		"assets/Works/Visual Identity (Branding) Design/venture 1.png",
		"assets/Works/Visual Identity (Branding) Design/venture 2.png"
	],
	"Motion Graphics": [
		"assets/Works/Motion Graphics/Anuza Profile.mp4"
	],
	"Web Design": []
};

function openModal(projectName) {
	modalTitle.textContent = projectName;
	modalGallery.innerHTML = "";
	
	const images = projectImages[projectName] || [];
	
	if (images.length === 0) {
		modalGallery.innerHTML = `<p style="color: var(--muted); text-align: center; padding: 40px;">No projects available yet. Check back soon!</p>`;
	} else {
		images.forEach((src, index) => {
			const isVideo = src.toLowerCase().endsWith('.mp4') || src.toLowerCase().endsWith('.webm') || src.toLowerCase().endsWith('.mov');
			
			if (isVideo) {
				const video = document.createElement("video");
				video.src = src;
				video.controls = true;
				video.style.width = "100%";
				video.style.height = "auto";
				video.style.borderRadius = "12px";
				modalGallery.appendChild(video);
			} else {
				const img = document.createElement("img");
				img.src = src;
				img.alt = `${projectName} project ${index + 1}`;
				img.loading = "lazy";
				img.onerror = function() {
					this.style.display = "none";
				};
				modalGallery.appendChild(img);
			}
		});
	}
	
	projectModal.classList.add("active");
	projectModal.setAttribute("aria-hidden", "false");
	document.body.style.overflow = "hidden";
	initIcons();
}

function closeModal() {
	projectModal.classList.remove("active");
	projectModal.setAttribute("aria-hidden", "true");
	document.body.style.overflow = "";
}

// Event listeners
projectLinks.forEach(link => {
	link.addEventListener("click", (e) => {
		e.preventDefault();
		const projectName = link.getAttribute("data-project");
		if (projectName) {
			openModal(projectName);
		}
	});
});

if (modalClose) {
	modalClose.addEventListener("click", closeModal);
}

if (modalOverlay) {
	modalOverlay.addEventListener("click", closeModal);
}

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && projectModal && projectModal.classList.contains("active")) {
		closeModal();
	}
});


