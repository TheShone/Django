import mysql.connector

dataBase= mysql.connector.connect(
    host='localhost',
    user='root',
    password='neca2002',
    auth_plugin='mysql_native_password'
)
cursorObject =dataBase.cursor()
cursorObject.execute("CREATE DATABASE toDo")
