/**
 * AI VISION MODULE (SIMULATED)
 * Аналіз зображення та екстракція параметрів
 */

document.getElementById('photo-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // Імітація процесу аналізу AI
    const uploadZone = document.querySelector('.upload-zone span');
    uploadZone.innerText = "АНАЛІЗ ОБ'ЄКТА [||||......] 30%";
    
    setTimeout(() => {
        uploadZone.innerText = "ПОШУК КОНТУРІВ [||||||||..] 80%";
        
        setTimeout(() => {
            uploadZone.innerText = "АНАЛІЗ ЗАВЕРШЕНО ✅";
            uploadZone.style.color = "#00f2ff";
            
            // "Витягуємо" випадкові параметри з фото для демонстрації
            // В реальності тут би працював Computer Vision
            const detectedL = (Math.random() * (6 - 3) + 3).toFixed(1);
            const detectedW = (Math.random() * (5 - 3) + 3).toFixed(1);
            
            document.getElementById('length').value = detectedL;
            document.getElementById('width').value = detectedW;
            
            // Оновлюємо 3D сцену
            if (window.updateProject) window.updateProject();
            
            console.log(`AI Detected: ${detectedL}m x ${detectedW}m`);
        }, 1000);
    }, 1000);
});
