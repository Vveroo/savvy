const { Client } = require('pg'); 
// O 'mysql2' si usas MySQL

const client = new Client({
    user: 'ticket_user',
    host: 'localhost',
    database: 'senai_db',
    password: 'ticket_pass',
    port: 5433, 
});

async function createTables() {
    await client.connect();

    // 1. Crear Tabla de Alumnos
    const createAlunosTable = `
        CREATE TABLE IF NOT EXISTS alunos (
            id SERIAL PRIMARY KEY,
            matricula VARCHAR(15) UNIQUE NOT NULL,
            nome VARCHAR(100) NOT NULL,
            email_senai VARCHAR(100) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            turma VARCHAR(50) NOT NULL
        );
    `;
    await client.query(createAlunosTable);

    // 2. Crear Tabla de Menú
    const createMenuTable = `
        CREATE TABLE IF NOT EXISTS menu (
            id SERIAL PRIMARY KEY,
            comida VARCHAR(100) NOT NULL,
            preco NUMERIC(5, 2) NOT NULL
        );
    `;
    await client.query(createMenuTable);
    
    console.log("Tablas 'alumnos' y 'menu' creadas exitosamente.");
    await client.end();
}

createTables().catch(err => console.error("Error al crear tablas:", err));