// server.js

const express = require('express');
const { Client } = require('pg');
// NOTA: Se ha comentado o quitado bcrypt, ya que las contraseñas están en texto plano.
// const bcrypt = require('bcryptjs'); 

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
    port: 5433, // <--- PUERTO AJUSTADO
});

client.connect()
    .then(() => console.log('✅ Conexión exitosa a PostgreSQL (Docker).'))
    .catch(err => {
        console.error('❌ Error al conectar a PostgreSQL. ¿Docker corriendo en puerto 5433?', err);
    });

app.use(express.json()); 

// =====================================================
// 2. ENDPOINT DE LOGIN (POST: /api/login)
// =====================================================
// Permite iniciar sesión con matricula O email_senai
app.post('/api/login', async (req, res) => {
    // El frontend envía 'identifier' (matrícula o email) y 'password'
    const { identifier, password } = req.body; 

    if (!identifier || !password) {
        return res.status(400).json({ message: 'Identificador e senha são requeridos.' });
    }

    try {
        // Busca al aluno por MATRICULA o por EMAIL_SENAI
        const result = await client.query(
            'SELECT * FROM alunos WHERE matricula = $1 OR email_senai = $1', 
            [identifier] 
        );
        const aluno = result.rows[0];

        if (!aluno) {
            // Usuario no encontrado
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Compara la contraseña (en texto plano)
        // NOTA: Esta es una comparación de texto plano (password === hash),
        // adecuada porque el db_seed ya no cifra las contraseñas.
        const isMatch = (password === aluno.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        // Login exitoso
        const { password_hash, ...alumnoInfo } = aluno;
        
        res.json({ 
            message: 'Login bem-sucedido!', 
            user: alumnoInfo,
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