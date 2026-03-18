const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 1. Configurar servidor para servir arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// 2. Classe HardwareEngine com método de geração de dados
class HardwareEngine {
    gerarDados() {
        return {
            cpu: Math.floor(Math.random() * 101), // 0 a 100%
            ram: Math.floor(Math.random() * 17),  // 0 a 16GB
            temperatura: Math.floor(Math.random() * (90 - 30 + 1)) + 30 // 30°C a 90°C
        };
    }
}

// 3. Endpoint GET em "/api/status"
app.get('/api/status', (req, res) => {
    const engine = new HardwareEngine();
    res.json(engine.gerarDados());
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});