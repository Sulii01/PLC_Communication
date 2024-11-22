document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded');

    let previousMotorRun1 = null;
    let previousMotorRun2 = null;
    let previousAutoRun = null;
    let previousManualRun = null;
    let previousSpolecneRun = null; // Adding a variable to track Společně status

    function updateSectionIndicators(motorRun1, motorRun2, autoRun, manualRun, spolecneRun) {
        const section1Indicator = document.getElementById('section1Indicator');
        const section2Indicator = document.getElementById('section2Indicator');
        const manualIndicator = document.getElementById('manualIndicator');
        const autoIndicator = document.getElementById('autoIndicator');
        const spolecneIndicator = document.getElementById('SpolIndicator'); // Společně indicator
        const daySelectionForm = document.getElementById('myForm');
        const tlacitkaSekce1 = document.querySelector('.tlacitka1');
        const tlacitkaSekce2 = document.querySelector('.tlacitka2');
        const spolstartstop = document.querySelector('.spolecne-start-stop');
        const spolecneAuto = document.querySelector('.spolecne');
        const sectionAuto = document.querySelector('.section');

        // Updating the colors for the indicators
        const isMotorRun1 = motorRun1 === "true" || motorRun1 === true || motorRun1 === "1" || motorRun1 === 1;
        const isMotorRun2 = motorRun2 === "true" || motorRun2 === true || motorRun2 === "1" || motorRun2 === 1;
        const isAutoRun = autoRun === "true" || autoRun === true || autoRun === "1" || autoRun === 1;
        const isManualRun = manualRun === "true" || manualRun === true || manualRun === "1" || manualRun === 1;
        const isSpolecneRun = spolecneRun === "true" || spolecneRun === true || spolecneRun === "1" || spolecneRun === 1;

        // Update section 1 indicator
        if (motorRun1 !== previousMotorRun1) {
            section1Indicator.style.backgroundColor = isMotorRun1 ? 'rgb(142,255,0)' : 'rgb(128,128,128)';
            console.log(`Section 1 indicator set to ${isMotorRun1 ? 'green' : 'grey'}`);
            previousMotorRun1 = motorRun1;
        }

        // Update section 2 indicator
        if (motorRun2 !== previousMotorRun2) {
            section2Indicator.style.backgroundColor = isMotorRun2 ? 'rgb(142,255,0)' : 'rgb(128,128,128)';
            console.log(`Section 2 indicator set to ${isMotorRun2 ? 'green' : 'grey'}`);
            previousMotorRun2 = motorRun2;
        }

        // Update auto indicator
        if (autoRun !== previousAutoRun) {
            autoIndicator.style.backgroundColor = isAutoRun ? 'rgb(142,255,0)' : 'rgb(128,128,128)';
            console.log(`Auto indicator set to ${isAutoRun ? 'green' : 'grey'}`);
            previousAutoRun = autoRun;
        }

        // Update manual indicator
        if (manualRun !== previousManualRun) {
            manualIndicator.style.backgroundColor = isManualRun ? 'rgb(142,255,0)' : 'rgb(128,128,128)';
            console.log(`Manual indicator set to ${isManualRun ? 'green' : 'grey'}`);
            previousManualRun = manualRun;
        }

        // Update Společně indicator
        if (spolecneRun !== previousSpolecneRun) {
            spolecneIndicator.style.backgroundColor = isSpolecneRun ? 'rgb(142,255,0)' : 'rgb(128,128,128)';
            console.log(`Společně indicator set to ${isSpolecneRun ? 'green' : 'grey'}`);
            previousSpolecneRun = spolecneRun;
        }

        // Show or hide the buttons based on manual mode
        if (isManualRun) {
            tlacitkaSekce1.classList.remove('hidden');
            tlacitkaSekce2.classList.remove('hidden');
            spolstartstop.classList.remove('hidden');
            spolecneAuto.classList.remove('space-evenly');
            sectionAuto.classList.remove('space-evenly');
            spolecneAuto.classList.add('space-between');
            sectionAuto.classList.add('space-between');
        } else {
            tlacitkaSekce1.classList.add('hidden');
            tlacitkaSekce2.classList.add('hidden');
            spolstartstop.classList.add('hidden');
            spolecneAuto.classList.remove('space-between');
            sectionAuto.classList.remove('space-between');
            spolecneAuto.classList.add('space-evenly');
            sectionAuto.classList.add('space-evenly');
        }

        // Show day selection only when auto mode is active
        if (isAutoRun) {
            daySelectionForm.classList.remove('hidden');
        } else {
            daySelectionForm.classList.add('hidden');
        }
    }

    // Fetch the status data
    async function fetchProcInt() {
        try {
            const statusResponse = await fetch('status.htm');
            if (!statusResponse.ok) {
                throw new Error(`HTTP error! status: ${statusResponse.status}`);
            }
            const statusData = await statusResponse.json();
            updateSectionIndicators(statusData.SEKCE1_INDICATOR, statusData.SEKCE2_INDICATOR, statusData.AUTO_INDICATOR, statusData.MANUAL_INDICATOR, statusData.SPOLECNE_INDICATOR); // Adding Společně indicator
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function startRefresh() {
        setInterval(fetchProcInt, 500);
    }

    // Function to highlight active navigation button
    function highlightActiveNav() {
        const navButtons = document.querySelectorAll('.nav a button');
        const currentPath = window.location.pathname.split('/').pop();

        navButtons.forEach(button => {
            const buttonHref = button.parentElement.getAttribute('href');
            const buttonPage = buttonHref ? buttonHref.split('/').pop() : '';

            if (buttonPage === currentPath) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    highlightActiveNav(); // Call to highlight active page in navigation
    startRefresh(); // Start refreshing the status
});
