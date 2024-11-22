document.addEventListener('DOMContentLoaded', function () {
    console.log('Žaluzie Script loaded');

    // Object to store the state of each switch (automatic or manual)
    const switchState = {
        section1: true, // Obývák starts in automatic mode
        section2: true, // Pracovna jih starts in automatic mode
        section3: true, // Pracovna západ starts in automatic mode
        section4: true, // Kuchyň starts in automatic mode
        section5: true, // Jídelna starts in automatic mode
        section6: true, // Ložnice starts in automatic mode
        section7: true, // Pokojík starts in automatic mode
        section8: true  // Wellness starts in automatic mode
    };

    // Function to update indicators and button appearance based on REZIM values
    function updateSectionIndicators(obyvakAuto, pracJihAuto, pracZapAuto, kuchynAuto, jidelnaAuto, lozniceAuto, pokojAuto, wellnessAuto,
        obyvakNahoru, obyvakDolu, pracJihNahoru, pracJihDolu, pracZapNahoru, pracZapDolu, kuchynNahoru, kuchynDolu, jidelnaNahoru, jidelnaDolu,
        lozniceNahoru, lozniceDolu, pokojNahoru, pokojDolu, wellnessNahoru, wellnessDolu) {

        function updateButton(button, auto, nahoru, dolu, upButton, downButton) {
            if (auto === 1) {
                button.style.backgroundColor = 'rgb(0, 255, 0)'; // Green for automatic
                button.style.fontWeight = 'bold';
                button.querySelector('.zal_zmena_rezimu').textContent = 'A'; // Automatic mode
            } else {
                button.style.backgroundColor = 'rgb(0, 123, 255)'; // Blue for manual
                button.style.fontWeight = 'bold';
                button.querySelector('.zal_zmena_rezimu').textContent = 'R'; // Manual mode
            }

            // Update UP button
            if (nahoru === 1) {
                upButton.style.backgroundColor = 'rgb(0, 255, 0)'; // Active state for UP
                upButton.querySelector('b').style.color = 'black';
            } else {
                upButton.style.backgroundColor = 'rgb(128, 128, 128)'; // Inactive state
                upButton.querySelector('b').style.color = 'white';
            }

            // Update DOWN button
            if (dolu === 1) {
                downButton.style.backgroundColor = 'rgb(0, 255, 0)'; // Active state for DOWN
                downButton.querySelector('b').style.color = 'black';
            } else {
                downButton.style.backgroundColor = 'rgb(128, 128, 128)'; // Inactive state
                downButton.querySelector('b').style.color = 'white';
            }
        }

        // Update each section with the corresponding values
        updateButton(document.getElementById('section1switch'), obyvakAuto, obyvakNahoru, obyvakDolu, document.getElementById('upButton1'), document.getElementById('downButton1'));
        updateButton(document.getElementById('section2switch'), pracJihAuto, pracJihNahoru, pracJihDolu, document.getElementById('upButton2'), document.getElementById('downButton2'));
        updateButton(document.getElementById('section3switch'), pracZapAuto, pracZapNahoru, pracZapDolu, document.getElementById('upButton3'), document.getElementById('downButton3'));
        updateButton(document.getElementById('section4switch'), kuchynAuto, kuchynNahoru, kuchynDolu, document.getElementById('upButton4'), document.getElementById('downButton4'));
        updateButton(document.getElementById('section5switch'), jidelnaAuto, jidelnaNahoru, jidelnaDolu, document.getElementById('upButton5'), document.getElementById('downButton5'));
        updateButton(document.getElementById('section6switch'), lozniceAuto, lozniceNahoru, lozniceDolu, document.getElementById('upButton6'), document.getElementById('downButton6'));
        updateButton(document.getElementById('section7switch'), pokojAuto, pokojNahoru, pokojDolu, document.getElementById('upButton7'), document.getElementById('downButton7'));
        updateButton(document.getElementById('section8switch'), wellnessAuto, wellnessNahoru, wellnessDolu, document.getElementById('upButton8'), document.getElementById('downButton8'));
    }

    // Fetch the status data from the server
    async function fetchStatusData() {
        try {
            const statusResponse = await fetch('status.htm');
            const statusData = await statusResponse.json();

            // Update the indicators and buttons based on the fetched data
            updateSectionIndicators(
                statusData.OBYVAK_AUTO,
                statusData.PRAC_J_AUTO,
                statusData.PRAC_Z_AUTO,
                statusData.KUCHYN_AUTO,
                statusData.JIDELNA_AUTO,
                statusData.LOZNICE_AUTO,
                statusData.POKOJ_AUTO,
                statusData.WELLNESS_AUTO,
                statusData.OBYVAK_NAHORU,
                statusData.OBYVAK_DOLU,
                statusData.PRAC_J_NAHORU,
                statusData.PRAC_J_DOLU,
                statusData.PRAC_Z_NAHORU,
                statusData.PRAC_Z_DOLU,
                statusData.KUCHYN_NAHORU,
                statusData.KUCHYN_DOLU,
                statusData.JIDELNA_NAHORU,
                statusData.JIDELNA_DOLU,
                statusData.LOZNICE_NAHORU,
                statusData.LOZNICE_DOLU,
                statusData.POKOJ_NAHORU,
                statusData.POKOJ_DOLU,
                statusData.WELLNESS_NAHORU,
                statusData.WELLNESS_DOLU
            );
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Set up switch button handlers to toggle modes
    function setupSwitch(switchId, autoFormClass, switchKey) {
        const switchButton = document.getElementById(switchId);
        switchButton.addEventListener('click', function (event) {
            event.preventDefault();
            const autoForm = document.querySelector(autoFormClass);
            if (autoForm) {
                autoForm.submit(); // Submit the form to toggle mode
            }
            switchState[switchKey] = !switchState[switchKey]; // Toggle the state locally
        });
    }

    // Apply form logic to all switches
    setupSwitch('section1switch', '.autoForm1', 'section1'); // Obývák
    setupSwitch('section2switch', '.autoForm2', 'section2'); // Pracovna jih
    setupSwitch('section3switch', '.autoForm3', 'section3'); // Pracovna západ
    setupSwitch('section4switch', '.autoForm4', 'section4'); // Kuchyň
    setupSwitch('section5switch', '.autoForm5', 'section5'); // Jídelna
    setupSwitch('section6switch', '.autoForm6', 'section6'); // Ložnice
    setupSwitch('section7switch', '.autoForm7', 'section7'); // Pokojík
    setupSwitch('section8switch', '.autoForm8', 'section8'); // Wellness

    // Start refreshing the status
    function startRefresh() {
        setInterval(fetchStatusData, 500); // Poll every 500ms
    }

    // Start the polling process
    startRefresh();
});
