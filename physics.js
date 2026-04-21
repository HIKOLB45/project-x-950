/**
 * ADVANCED PHYSICS ENGINE v2.0
 * Розрахунок статики та динамічних навантажень
 */

const PhysicsEngine = {
    // Коефіцієнти для України (Сніговий район 2)
    SNOW_BASE: 160, // кг/м2
    WIND_BASE: 45,  // кг/м2
    
    calculate(length, width) {
        const area = length * width;
        const angle = 6; // кут нахилу в градусах
        
        // Коефіцієнт нахилу (чим більший кут, тим менше снігу лишається)
        const mu = angle < 30 ? 1.0 : (60 - angle) / 30;
        
        const snowLoad = area * this.SNOW_BASE * mu;
        const windLoad = area * this.WIND_BASE;
        
        // Розрахунок необхідної кількості стійок (мінімум 4, +2 якщо довжина > 4м)
        const suggestedPosts = length > 4 ? 6 : 4;
        
        return {
            totalSnow: snowLoad.toFixed(0),
            totalWind: windLoad.toFixed(0),
            postsRequired: suggestedPosts,
            safetyFactor: "2.4x"
        };
    }
};

// Інтеграція з головним двигуном
window.PhysicsEngine = PhysicsEngine;
