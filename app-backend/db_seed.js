// db_seed.js - Generador de Datos Aleatorios e Inicialización

const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker'); 

// =====================================================
// 1. CREDENCIALES (DEBEN COINCIDIR CON DOCKER Y server.js)
// =====================================================
const client = new Client({
    user: 'ticket_user',         
    host: 'localhost',           
    database: 'senai_db',        
    password: 'ticket_pass',     
    port: 5433, // <--- ¡PUERTO AJUSTADO!
});

// Cambiado de NUM_ALUMNOS a NUM_ALUNOS para consistencia
const NUM_ALUNOS = 50; 
const NUM_PLATOS = 10;
const SENAI_DOMAINS = ['@senai.br', '@aluno.senai.com'];

async function generateData() {
    try {
        await client.connect();
        console.log('✅ Conexión para seeding exitosa en puerto 5433.');

        // --- Generar Alunos ---
        console.log('⏳ Generando alunos aleatorios...');
        // Cambiado de alumnosData a alunosData
        const alunosData = [];
        
        // Contraseña de prueba CLAVE para el login: '123456'
        const testPasswordHash = await bcrypt.hash('123456', 10); 
        
        // 1. Insertar un aluno de prueba fijo para un login seguro
        alunosData.push(`('A9999', 'Aluno Teste', 'test@senai.br', '${testPasswordHash}', 'T000')`);


        for (let i = 0; i < NUM_ALUNOS - 1; i++) {
            const nome = faker.person.fullName();
            const matricula = faker.string.alphanumeric(10).toUpperCase();
            const domain = faker.helpers.arrayElement(SENAI_DOMAINS);
            // El email se basa en el nombre y el dominio SENAI
            const email_senai = faker.internet.email({ firstName: nome.split(' ')[0], domain }); 
            const turma = faker.helpers.arrayElement(['T101', 'T102', 'T201', 'T202', 'T301', 'T302']);
            
            // Usamos el hash de '123456' para todos
            const password_hash = testPasswordHash; 
            
            alunosData.push(`('${matricula}', '${nome.replace(/'/g, "''")}', '${email_senai}', '${password_hash}', '${turma}')`);
        }

        const insertAlunosQuery = `
            INSERT INTO alunos (matricula, nome, email_senai, password_hash, turma) 
            VALUES ${alunosData.join(', ')} 
            ON CONFLICT (email_senai) DO NOTHING;
        `;
        await client.query(insertAlunosQuery);
        // Usando NUM_ALUNOS en el mensaje de éxito
        console.log(`✅ ${NUM_ALUNOS} alunos insertados (incluyendo 'test@senai.br').`);


        // --- Generar Menú ---
        console.log('⏳ Generando platos de menú aleatorios...');
        const menuData = [];
        for (let i = 0; i < NUM_PLATOS; i++) {
            const comida = faker.commerce.productName();
            const preco = faker.commerce.price({ min: 5, max: 30, dec: 2 }); 
            
            // Usando 'preco' (portugués) para ser consistente con la tabla
            menuData.push(`('${comida.replace(/'/g, "''")}', ${preco})`);
        }

        const insertMenuQuery = `
            INSERT INTO menu (comida, preco) 
            VALUES ${menuData.join(', ')};
        `;
        await client.query(insertMenuQuery);
        console.log(`✅ ${NUM_PLATOS} platos de menú insertados.`);

    } catch (err) {
        console.error("❌ Error al generar datos de prueba:", err);
    } finally {
        if (client._connected) {
            await client.end();
        }
    }
}

generateData();