// Rota de Login
const express = require('express');
const app = express(); // Inicializa o Express
app.use(express.json()); // Middleware para interpretar JSON no corpo das requisições

app.post('/api/login', async (req, res) => {
    const { matricula, email, password } = req.body;

    if ((!matricula && !email) || !password) {
        return res.status(400).json({ message: 'Matrícula ou e-mail e senha são obrigatórios.' });
    }

    try {
        // Verifica se o usuário existe com base na matrícula ou e-mail
        const query = `
            SELECT * FROM alunos 
            WHERE (matricula = $1 OR email_senai = $2) AND password_hash = $3
        `;
        const result = await client.query(query, [matricula || null, email || null, password]);
        const aluno = result.rows[0];

        if (!aluno) {
            return res.status(401).json({ message: 'Credenciais inválidas. Verifique sua matrícula/e-mail e senha.' });
        }

        // Retorna os dados do usuário e um token fictício
        const token = `fake-token-${aluno.id}`;
        res.json({
            message: 'Login bem-sucedido!',
            token,
            user: {
                id: aluno.id,
                nome: aluno.nome,
                matricula: aluno.matricula,
                email: aluno.email_senai,
            },
        });
    } catch (error) {
        console.error('Erro ao realizar login:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
});