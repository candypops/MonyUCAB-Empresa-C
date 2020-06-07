﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using MonyUCAB.DTO;
using Microsoft.SqlServer.Server;

namespace MonyUCAB.DAO
{
    public class UsuarioDAOPsql : DAOPsql, IUsuarioDAO
    {
        public void actualizar()
        {
            throw new NotImplementedException();
        }

        public List<UsuarioDTO> buscar(string user, string contra)
        {
            comando.CommandText = string.Format("SELECT " +
                "us.idusuario," +
                "us.idtipousuario," +
                "us.idtipoidentificacion," +
                "us.usuario," +
                "us.fecha_registro," +
                "us.nro_identificacion," +
                "us.email," +
                "us.telefono,direccion," +
                "us.estatus " +
                "FROM usuario us, contrasena co " +
                "WHERE us.idusuario = co.idusuario " +
                "AND us.usuario = '{0}' " +
                "AND co.contrasena = '{1}'", user, contra);
            conexion.Open();
            filas = comando.ExecuteReader();
            List<UsuarioDTO> listaUsuarios = new List<UsuarioDTO>();
            while (filas.Read())
            {
                listaUsuarios.Add(new UsuarioDTO
                {
                    Idusuario = filas.GetInt32(0),
                    Idtipousuario = filas.GetInt32(1),
                    Idtipoidentificacion = filas.GetInt32(2),
                    Usuario = filas.GetString(3),
                    Fecha_registro = filas.GetDateTime(4),
                    Nro_identificacion = filas.GetInt32(5),
                    Email = filas.GetString(6),
                    Telefono = filas.GetString(7),
                    Direccion = filas.GetString(8),
                    Estatus = filas.GetInt32(9),
                });
            }
            filas.Close();
            conexion.Close();
            return listaUsuarios;
        }

        public void crear()
        {
            throw new NotImplementedException();
        }

        public void eliminar()
        {
            throw new NotImplementedException();
        }
    }
}