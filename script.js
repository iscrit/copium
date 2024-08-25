document.addEventListener('DOMContentLoaded', () => {
    fetch('files.json')
        .then(response => response.json())
        .then(data => {
            const fileList = document.getElementById('file-list');
            const searchInput = document.getElementById('search');
            const filterSelect = document.getElementById('filter');

            let files = data;

            const renderFiles = (files) => {
                fileList.innerHTML = '';
                files.forEach(file => {
                    const fileEntry = document.createElement('div');
                    fileEntry.className = 'file-entry';

                    const title = document.createElement('h2');
                    title.textContent = file.name;
                    fileEntry.appendChild(title);

                    const description = document.createElement('p');
                    description.textContent = file.description;
                    fileEntry.appendChild(description);

                    const viewMore = document.createElement('a');
                    viewMore.href = file.detailsPage;
                    viewMore.className = 'view-more';
                    viewMore.textContent = 'View More';
                    fileEntry.appendChild(viewMore);

                    fileList.appendChild(fileEntry);
                });
            };

            renderFiles(files);

            searchInput.addEventListener('input', () => {
                const query = searchInput.value.toLowerCase();
                const filteredFiles = files.filter(file =>
                    file.name.toLowerCase().includes(query) ||
                    file.description.toLowerCase().includes(query)
                );
                renderFiles(filteredFiles);
            });

            filterSelect.addEventListener('change', () => {
                const category = filterSelect.value;
                const filteredFiles = category
                    ? files.filter(file => file.category === category)
                    : files;
                renderFiles(filteredFiles);
            });
        });

    // Create stars and add to document
    const numStars = 100;
    const starContainer = document.createElement('div');
    starContainer.id = 'star-field';
    document.body.appendChild(starContainer);

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.position = 'absolute';
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.width = '2px';
        star.style.height = '2px';
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.opacity = Math.random();
        starContainer.appendChild(star);
    }






    // Mousemove event to move stars with the mouse
    document.addEventListener('mousemove', (e) => {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            const x = e.clientX;
            const y = e.clientY;
            const starRect = star.getBoundingClientRect();
            const starX = starRect.left + starRect.width / 2;
            const starY = starRect.top + starRect.height / 2;
            const deltaX = (x - starX) * 0.1;
            const deltaY = (y - starY) * 0.1;

            star.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            
            function startDownload() {
                const progressContainer = document.getElementById('progress-container');
                const progressCircle = document.getElementById('progress-circle');
                const progressText = document.getElementById('progress-text');
                const downloadButton = document.getElementById('download-btn');
                const downloadLink = downloadButton.getAttribute('data-download-link');
            
                // Show the progress container
                progressContainer.style.display = 'block';
            
                let percentage = 0;
                const interval = setInterval(() => {
                    percentage += 10; // Increase by 10% each interval
                    progressText.textContent = `${percentage}%`;
                    if (percentage >= 100) {
                        clearInterval(interval);
                        progressText.textContent = 'Download Complete!';
                        progressCircle.style.borderTopColor = '#4caf50'; // Change color when done
                        // Simulate a completed download by redirecting after a short delay
                        setTimeout(() => {
                            window.location.href = downloadLink; // Redirect to the actual download link
                        }, 1000);
                    }
                }, 500); // Update every 500ms
            }
            


            
        });
    });
});
