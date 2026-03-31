const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const criarBanco = async () => {
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  //TABELA INCIDENTES

  await db.exec(`
        CREATE TABLE IF NOT EXISTS incidentes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tipo_problema TEXT,
            localizacao TEXT,
            descricao TEXT,
            prioridade TEXT,
            nome_solicitante TEXT,
            data_registro TEXT,
            hora_registro TEXT,
            status_resolucao TEXT DEFAULT "Pendente"
        )
        `);

  console.log(
    "Banco de dados configurado: A tabela de registros urbanos está pronta",
  );

  //CREATE

  const checagem = await db.get(`SELECT COUNT(*) AS total FROM incidentes`);

  if (checagem.total === 0) {
    await db.exec(`
  INSERT INTO incidentes(tipo_problema,  localizacao,  descricao,   prioridade,  nome_solicitante, data_registro, hora_registro) VALUES
("iluminação", "Rua das Flores, 123, Bairro das Margaridas", "poste queimado há dias", "Média" , "Maria Joana", "16/03/2026", "19:15"),
 ('Vazamento de água', 'Rua das Camélias, 52', 'Vazamento de água constante próximo ao bueiro.', 'Alta', 'Julia Martins', '16/03/2026', '10:00'),
 ("Falta de água", "Rua T, 146, Jardim Imbarie", "Moradores sem água", "Alta", "Dona Fofoca", "16/03/2026", "10:00"),
 ("Pavimentação", "Avenida C, Bairro D", "Calçada em mau estado", "Alta", "Maria Oliveira", "14/03/2026", "14:30" ), 
 ("Coleta de lixo", "Rua E, Bairro F", "Lixo acumulado há semanas", "Média", "Carlos Silva", "15/03/2026", "09:45" ),
 ("Sinalização", "Avenida G, Bairro H", "Semáforo com defeito", "Alta", "Ana Souza", "16/03/2026", "11:20" ),
 ("Transporte público", "Terminal Rodoviário, Bairro I", "Atrasos frequentes nos ônibus", "Média", "Ana Clara", "15/03/2026", "16:00" ),
 ("Áreas verdes", "Parque J, Bairro K", "Manutenção deficiente das áreas verdes", "Baixa", "Luciana Costa", "14/03/2026", "13:00" ),
 ("Segurança pública", "Rua L, Bairro M", "Aumento de assaltos na região", "Alta", "Ricardo Almeida", "16/03/2026", "18:45" ),
 ("Saúde pública", "Unidade de Saúde N, Bairro O", "Falta de medicamentos essenciais", "Alta", "Fernanda Lima", "15/03/2026", "12:30" )
`);

  } else {
    console.log(`Banco de dados pronto com ${checagem.total} de incidentes`);

  }

  //READ

  const todosOsIncidentes = await db.all("SELECT * FROM incidentes");

  console.table(todosOsIncidentes);


//EXEMPLO DE SELECT ESPECÍFICO

const chamadosAna = await db.all(`SELECT * FROM incidentes WHERE nome_solicitante = "Ana Clara" `);

console.table(chamadosAna);

//UPDATE

await db.run(`
  UPDATE incidentes 
  SET status_resolucao = "Em Análise"
   WHERE data_registro = "16/03/2026"
   `);

   console.log("Todas as reclamações do dia 16/03/2026 tiveram uma atualização");
  
  //UPDATE

  await db.run(`
  UPDATE incidentes 
  SET status_resolucao = "Resolvido"
   WHERE tipo_problema = "transporte público"
   `);
   console.log("Problema de transporte público Resolvido");


//DELETE

await db.run(`
DELETE FROM incidentes
WHERE id = 7
`);
console.log("Incidente com id 7 removido");



//RELATÓRIO/SELECT FINAL
console.log("Relatório atualizado(Final)");

const relatorioFinal = await db.all(`SELECT * FROM incidentes`);
console.table(relatorioFinal);


return db;
  };

module.exports = { criarBanco};
