import sql from 'mssql'

const config = {
    server: process.env.MSSQL_DB_SERVER, // имя сервера
    database: process.env.MSSQL_DB_NAME, // имя базы данных
    user: process.env.MSSQL_DB_USER, // имя пользователя
    password: process.env.MSSQL_DB_PASSWORD, // пароль
    options: {
      encrypt: false, // использовать шифрование
      tdsVersion: "7_1" // указываем для SQL Server 2000
    }
  };
  const pool = sql.connect(config);

  try {
    // выполнение запроса
    const result = await pool.request()
      .query('SELECT TOP 20 * FROM _PCR');
  
    console.log(result.recordset); // вывод результатов 
  }
  catch (err) {
    console.log(err); // вывод ошибки 
  }

  // закрытие соединения
  sql.close();
