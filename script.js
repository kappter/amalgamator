// Update current time
function updateTime() {
    const timeElement = document.getElementById('current-time');
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString();
}
setInterval(updateTime, 1000);

// Sample data (replace with actual data from Roget's Thesaurus)
const terms = [
    {
        left: {
            category: "VOLUTION - INTERSOCIAL VOLUNTARY POWERS",
            section: "SECTION III. CONDITIONAL INTERSOCIAL VOLITION",
            subsection: "2. SPECIAL",
            term: "768. PROMISE",
            notes: "768a. release from engagement"
        },
        right: {
            category: "ABSTRACT RELATIONS",
            section: "SECTION VIII. CAUSATION",
            subsection: "2. CONNECTION BETWEEN CAUSE AND EFFECT",
            term: "157. POWER",
            notes: "-"
        }
    },
    // Add more term pairs here
];

// Load terms into the UI
function loadTerms(index) {
    const leftSection = document.querySelectorAll('.section')[0];
    const rightSection = document.querySelectorAll('.section')[1];
    const term = terms[index];

    leftSection.innerHTML = `
        <h2>${term.left.category}</h2>
        <p>${term.left.section}</p>
        <p>${term.left.subsection}</p>
        <p>${term.left.term}</p>
        <p>NOTES: ${term.left.notes}</p>
    `;

    rightSection.innerHTML = `
        <h2>${term.right.category}</h2>
        <p>${term.right.section}</p>
        <p>${term.right.subsection}</p>
        <p>${term.right.term}</p>
        <p>NOTES: ${term.right.notes}</p>
    `;
}

// Handle button clicks
let currentIndex = 0;
loadTerms(currentIndex);

document.getElementById('continue-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % terms.length; // Cycle through terms
    loadTerms(currentIndex);
    document.getElementById('notes-input').value = ''; // Clear notes
});

document.getElementById('not-plausible-btn').addEventListener('click', () => {
    console.log('Not Plausible:', document.getElementById('notes-input').value);
    // Save response and move to next terms
});

document.getElementById('irrelevant-btn').addEventListener('click', () => {
    console.log('Irrelevant:', document.getElementById('notes-input').value);
    // Save response and move to next terms
});

document.getElementById('plausible-btn').addEventListener('click', () => {
    console.log('Plausible:', document.getElementById('notes-input').value);
    // Save response and move to next terms
});

// Update progress bar (example)
function updateProgress(value) {
    const progress = document.getElementById('progress');
    progress.style.width = `${value}%`;
}
updateProgress(50); // Example: set to 50%
