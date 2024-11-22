document.addEventListener('DOMContentLoaded', function () {
    console.log('Bazén Script loaded');

    // Function to update indicators and button appearance based on REZIM values
    function updateSectionIndicators(filtrRun, solRun, tcRun, svetloRun, teplota, filtrRezim, solRezim, tcRezim) {
        const filtrIndicator = document.querySelector('.fil_indicator');
        const solIndicator = document.querySelector('.sol_indicator');
        const tcIndicator = document.querySelector('.tc_indicator');
        const svetloIndicator = document.querySelector('.svetlo-indicator');
        const teplotaElement = document.querySelector('.parametr-teplo');

        // Update filtration indicator
        filtrIndicator.style.backgroundColor = filtrRun ? 'rgb(142,255,0)' : 'rgb(128,128,128)';
        solIndicator.style.backgroundColor = solRun ? 'rgb(142,255,0)' : 'rgb(128,128,128)';
        tcIndicator.style.backgroundColor = tcRun ? 'rgb(142,255,0)' : 'rgb(128,128,128)';
        svetloIndicator.style.backgroundColor = svetloRun ? 'rgb(142,255,0)' : 'rgb(128,128,128)';
        teplotaElement.textContent = `${teplota} °C`;

        // Update button appearance for Filtrace
        const filtrButton = document.getElementById('section1switch');
        if (filtrRezim === 1) {
            filtrButton.style.backgroundColor = 'rgb(0, 255, 0)'; // Green for automatic
            filtrButton.style.fontWeight = 'bold';
            filtrButton.style.color = 'rgb(0, 0, 0)';
            filtrButton.querySelector('.baz_zmena_rezimu').textContent = 'A'; // Automatic
        } else {
            filtrButton.style.backgroundColor = 'rgb(0, 123, 255)'; // Blue for manual
            filtrButton.style.fontWeight = 'bold';
            filtrButton.style.color = 'rgb(255, 255, 255)';
            filtrButton.querySelector('.baz_zmena_rezimu').textContent = 'R'; // Manual
        }

        // Update button appearance for Solinátor
        const solButton = document.getElementById('section2switch');
        if (solRezim === 1) {
            solButton.style.backgroundColor = 'rgb(0, 255, 0)'; // Green for automatic
            solButton.style.fontWeight = 'bold';
            solButton.style.color = 'rgb(0, 0, 0)';
            solButton.querySelector('.baz_zmena_rezimu').textContent = 'A'; // Automatic
        } else {
            solButton.style.backgroundColor = 'rgb(0, 123, 255)'; // Blue for manual
            solButton.style.fontWeight = 'bold';
            solButton.style.color = 'rgb(255, 255, 255)';
            solButton.querySelector('.baz_zmena_rezimu').textContent = 'R'; // Manual
        }

        // Update button appearance for TČ
        const tcButton = document.getElementById('section3switch');
        if (tcRezim === 1) {
            tcButton.style.backgroundColor = 'rgb(0, 255, 0)'; // Green for automatic
            tcButton.style.fontWeight = 'bold';
            tcButton.style.color = 'rgb(0, 0, 0)';
            tcButton.querySelector('.baz_zmena_rezimu').textContent = 'A'; // Automatic
        } else {
            tcButton.style.backgroundColor = 'rgb(0, 123, 255)'; // Blue for manual
            tcButton.style.fontWeight = 'bold';
            tcButton.style.color = 'rgb(255, 255, 255)';
            tcButton.querySelector('.baz_zmena_rezimu').textContent = 'R'; // Manual
        }
    }

    // Fetch the status data from the server
    async function fetchProcInt() {
        try {
            const statusResponse = await fetch('status.htm');
            const statusData = await statusResponse.json();

            // Update the indicators and buttons based on the fetched data
            updateSectionIndicators(
                statusData.FILTR_INDICATOR,
                statusData.SOL_INDICATOR,
                statusData.TC_INDICATOR,
                statusData.SVETLO_INDICATOR,
                statusData.TEPLOTA,
                statusData.FILTR_REZIM, // Filtrace REZIM
                statusData.SOL_REZIM,   // Solinátor REZIM
                statusData.TC_REZIM     // TČ REZIM
            );
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Function to handle form submissions (always submits the same form with value 1)
    function setupSwitch(switchId, autoFormClass) {
        const switchButton = document.getElementById(switchId);
        switchButton.addEventListener('click', function (event) {
            event.preventDefault();

            // Always submit the form with value 1
            const autoForm = document.querySelector(autoFormClass);
            if (autoForm) {
                autoForm.submit(); // Submit the form
            }
        });
    }

    // Apply form logic to all switches (always submitting value 1)
    setupSwitch('section1switch', '.autoForm1'); // Filtrace
    setupSwitch('section2switch', '.autoForm2'); // Solinátor
    setupSwitch('section3switch', '.autoForm3'); // TČ

    // Start refreshing the status
    function startRefresh() {
        setInterval(fetchProcInt, 500); // Poll every 500ms
    }

    // Start the polling process
    startRefresh();
});
