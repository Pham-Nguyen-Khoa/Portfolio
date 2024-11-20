document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('nav     a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = "."+ this.getAttribute('href').substring(1);
            console.log(targetId)
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Thêm index cho các technical items để tạo hiệu ứng lần lượt
    document.querySelectorAll('.technical li').forEach((item, index) => {
        item.style.setProperty('--index', index);
    });

    // Tạo Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class animate khi phần tử đi vào viewport
                entry.target.classList.add('animate');
                
                if (entry.target.classList.contains('portfolio-container')) {
                    entry.target.querySelectorAll('.video-portfolio, .context-portfolio, .technical li')
                        .forEach(element => {
                            element.classList.add('animate');
                        });
                }
            } else {
                // Xóa class animate khi phần tử đi ra khỏi viewport
                entry.target.classList.remove('animate');
                
                if (entry.target.classList.contains('portfolio-container')) {
                    entry.target.querySelectorAll('.video-portfolio, .context-portfolio, .technical li')
                        .forEach(element => {
                            element.classList.remove('animate');
                        });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    // Theo dõi các phần tử cần animation
    document.querySelectorAll('.portfolio-container-title, .portfolio-container').forEach(element => {
        observer.observe(element);
    });
});



function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 1
    );
}

// Function to handle scroll animations
function handleScrollAnimations() {
    const educationDetails = document.querySelector('.education-details');
    if (educationDetails && isInViewport(educationDetails)) {
        educationDetails.classList.add('animate');
    }
}

// Add scroll event listener
window.addEventListener('scroll', handleScrollAnimations);

// Check on initial load
document.addEventListener('DOMContentLoaded', handleScrollAnimations);






document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Lấy giá trị từ form
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Log ra console để test (sau này có thể thay bằng API call)
    console.log('Form Data:', formData);
    
    // Reset form
    this.reset();
    
    // Hiển thị thông báo thành công (có thể tùy chỉnh)
    alert('Thank you for your message! I will get back to you soon.');
});