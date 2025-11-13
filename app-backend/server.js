// server.js - Backend Personalizado para Alumnos SENAI

const express = require('express');
const { Client } = require('pg');
const bcrypt = require('bcryptjs'); // Para comparación de contraseñas seguras

const app = express();
const port = 3000;

// =====================================================
// 1. CONFIGURACIÓN DE LA CONEXIÓN A LA BASE DE DATOS (Docker)
// =====================================================
const client = new Client({
    user: 'ticket_user',         
    host: 'localhost',           // Conexión al contenedor Docker
    database: 'senai_db',        
    password: 'ticket_pass',     
    port: 5433, // <--- PUERTO AJUSTADO: Debe coincidir con tu docker-compose.yml
});

// Intentar la conexión al iniciar el servidor
client.connect()
    .then(() => console.log('✅ Conexión exitosa a PostgreSQL (Docker).'))
    .catch(err => {
        console.error('❌ Error al conectar a PostgreSQL. ¿Docker corriendo en puerto 5433?', err);
    });

// Middleware para procesar solicitudes JSON
app.use(express.json()); 

// =====================================================
// 2. ENDPOINT DE LOGIN (POST: /api/login)
// =====================================================
// Espera { email, password }
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email e senha são requeridos.' });
    }

    try {
        // 1. Busca al alumno por email_senai   
        const result = await client.query('SELECT * FROM alumnos WHERE email_senai = $1', [email]);
        const alumno = result.rows[0];

        if (!alumno) {
            // Usuario no encontrado
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // 2. Compara la contraseña (en texto plano) con el hash almacenado
        const isMatch = await bcrypt.compare(password, alumno.password_hash);

        if (!isMatch) {
            // Contraseña incorrecta
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // 3. Login exitoso: Devuelve los datos del alumno (sin la contraseña)
        const { password_hash, ...alumnoInfo } = alumno;
        
        res.json({ 
            message: 'Login bem-sucedido!', 
            user: alumnoInfo, // Devuelve: id, matricula, nome, email_senai, turma, etc.
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// =====================================================
// 3. ENDPOINT DE MENÚ (GET: /api/menu)
// =====================================================
app.get('/api/menu', async (req, res) => {
    try {
        // Selecciona comida y el precio (columna 'preco' en portugués)
        const result = await client.query('SELECT comida, preco FROM menu ORDER BY comida');
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao obter o menu:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});


// =====================================================
// 4. INICIAR EL SERVIDOR
// =====================================================
app.listen(port, () => {
    console.log(`🚀 Servidor Express escuchando en http://localhost:${port}`);
    console.log('🔗 Endpoints listos: /api/login (POST) y /api/menu (GET)');
});