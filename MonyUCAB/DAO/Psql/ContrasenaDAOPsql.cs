﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using MonyUCAB.DTO;



namespace MonyUCAB.DAO.Psql
{
    public class ContrasenaDAOPsql : DAOPsql, IContrasenaDAO
    {
        

        public void registrarContrasena(int idUsuario, string contrasena)
        {
            comando.CommandText = string.Format(
                "INSERT INTO contrasena(" +
                    "idusuario," +
                    "contrasena," +
                    "intentos_fallidos," +
                    "estatus" +   
                ") " +
                "values" +
                "({0},{1},0,1)",idUsuario, contrasena);
            conexion.Open();
            comando.ExecuteNonQuery();
            conexion.Close();
        }
    }
}