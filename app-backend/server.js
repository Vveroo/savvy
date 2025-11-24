// server.js

const express = require('express');
const { Client } = require('pg');

const app = express();
const port = 3000;

// =====================================================
// 1. CONFIGURAÇÃO DA CONEXÃO AO BANCO (Docker)
// =====================================================
const client = new Client({
    user: 'ticket_user',         
    host: 'localhost',           
    database: 'senai_db',        
    password: 'ticket_pass',     
    port: 5433:5432, 
});

client.connect()
    .then(() => console.log('✅ Conexão bem-sucedida ao PostgreSQL (Docker).'))
    .catch(err => {
        console.error('❌ Erro ao conectar ao PostgreSQL. Docker está rodando na porta 5433?', err);
    });

app.use(express.json()); 

// =====================================================
// 2. ENDPOINT DE LOGIN (POST: /api/login)
// =====================================================
app.post('/api/login', async (req, res) => {
    const { identifier, password } = req.body; 

    if (!identifier || !password) {
        return res.status(400).json({ message: 'Identificador e senha são requeridos.' });
    }

    try {
        const result = await client.query(
            'SELECT * FROM alunos WHERE matricula = $1 OR email_senai = $1', 
            [identifier] 
        );
        const aluno = result.rows[0];

        if (!aluno) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const isMatch = (password === aluno.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }

        const { password_hash, ...alunoInfo } = aluno;
        
        res.json({ 
            message: 'Login bem-sucedido!', 
            user: alunoInfo,
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// =====================================================
// 3. ENDPOINT DE ESQUECI A SENHA (POST: /api/reset-password)
// =====================================================
// Recebe email e senha provisória, atualiza no banco
app.post('/api/reset-password', async (req, res) => {
    const { email, tempPassword } = req.body;

    if (!email || !tempPassword) {
        return res.status(400).json({ message: 'E-mail e senha provisória são requeridos.' });
    }

    try {
        // Verifica se existe aluno com esse email
        const result = await client.query(
            'SELECT * FROM alunos WHERE email_senai = $1',
            [email]
        );
        const aluno = result.rows[0];

        if (!aluno) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        // Atualiza a senha para o código provisório
        await client.query(
            'UPDATE alunos SET password_hash = $1 WHERE email_senai = $2',
            [tempPassword, email]
        );

        res.json({ message: 'Senha provisória definida com sucesso.' });
    } catch (error) {
        console.error('Erro ao redefinir senha:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});

// =====================================================
// 4. ENDPOINT DE MENU (GET: /api/menu)
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
// 5. INICIAR SERVIDOR
// =====================================================
app.listen(port, () => {
    console.log(`🚀 Servidor Express rodando em http://localhost:${port}`);
    console.log('🔗 Endpoints: /api/login (POST), /api/reset-password (POST), /api/menu (GET)');
});
