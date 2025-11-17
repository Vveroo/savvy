// db_seed.js - Generador de Datos Aleatorios e Inicialización

const { Client } = require('pg');
// NOTA: Se ha removido 'bcryptjs' ya que no se cifrarán las contraseñas.
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

const NUM_ALUNOS = 50; 
const NUM_PLATOS = 10;
const SENAI_DOMAINS = ['@senai.br', '@aluno.senai.com'];

// Contraseña de prueba CLAVE para el login del usuario fijo: 'pass'
const TEST_PASSWORD = 'pass'; 

// Función para generar una contraseña aleatoria de 5 dígitos (del 10000 al 99999)
function generateShortPassword() {
    // Genera un número aleatorio entre 10000 y 99999
    return Math.floor(10000 + Math.random() * 90000).toString(); 
}

async function generateData() {
    try {
        await client.connect();
        console.log('✅ Conexión para seeding exitosa en puerto 5433.');

        // --- Generar Alunos ---
        console.log('⏳ Generando alunos aleatorios...');
        const alunosData = [];
        
        // 1. Insertar un aluno de prueba fijo (Contraseña: 'pass' - SIN CIFRAR)
        // La variable que se inserta es el texto plano de la contraseña.
        const fixedPassword = TEST_PASSWORD;
        alunosData.push(`('A9999', 'Aluno Teste', 'test@senai.br', '${fixedPassword}', 'T000')`);


        for (let i = 0; i < NUM_ALUNOS - 1; i++) {
            const nome = faker.person.fullName();
            const matricula = faker.string.alphanumeric(10).toUpperCase();
            const domain = faker.helpers.arrayElement(SENAI_DOMAINS);
            const email_senai = faker.internet.email({ firstName: nome.split(' ')[0], domain }); 
            const turma = faker.helpers.arrayElement(['M1', 'M2', 'M3', 'M4']);
            
            // Generar la contraseña de 5 dígitos (SIN CIFRAR)
            const randomPassword = generateShortPassword(); 
            
            // Insertamos la contraseña en texto plano en la columna password_hash
            alunosData.push(`('${matricula}', '${nome.replace(/'/g, "''")}', '${email_senai}', '${randomPassword}', '${turma}')`);
        }

        const insertAlunosQuery = `
            INSERT INTO alunos (matricula, nome, email_senai, password_hash, turma) 
            VALUES ${alunosData.join(', ')} 
            ON CONFLICT (email_senai) DO NOTHING;
        `;
        await client.query(insertAlunosQuery);
        console.log(`✅ ${NUM_ALUNOS} alunos insertados (Aluno Teste con contraseña '${TEST_PASSWORD}' - SIN CIFRAR).`);


        // --- Generar Menú ---
        console.log('⏳ Generando platos de menú aleatorios...');
        const menuData = [];
        for (let i = 0; i < NUM_PLATOS; i++) {
            const comida = faker.commerce.productName();
            const preco = faker.commerce.price({ min: 5, max: 30, dec: 2 }); 
            
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