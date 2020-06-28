﻿using MonyUCAB.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MonyUCAB.DAO.Psql
{
    public class OperacionTarjetaDAOPsql : DAOPsql, IOperacionTarjetaDAO
    {
        public void actualizar()
        {
            throw new NotImplementedException();
        }

        public OperacionTarjetaDTO buscarOperacionTarjeta(int idOperacionTarjeta)
        {
            comando.CommandText = string.Format(
            "SELECT " +
                "opc.idoperaciontarjeta," +
                "opc.IdUsuarioReceptor," +
                "opc.idtarjeta," +
                "opc.fecha," +
                "opc.hora," +
                "opc.monto," +
                "opc.referencia " +
            "FROM operaciontarjeta opc " +
            "WHERE opc.idoperaciontarjeta = {0}", idOperacionTarjeta);
            conexion.Open();
            filas = comando.ExecuteReader();
            OperacionTarjetaDTO operacionTarjetaDTO = null;
            if (filas.Read())
            {
                operacionTarjetaDTO = new OperacionTarjetaDTO
                {
                    Idoperaciontarjeta = filas.GetInt32(0),
                    IdUsuarioReceptor = filas.GetInt32(1),
                    Idtarjeta = filas.GetInt32(2),
                    Fecha = filas.GetDateTime(3),
                    Hora = filas.GetTimeSpan(4),
                    Monto = filas.GetFloat(5),
                    Referencia = filas.GetInt32(6),
                };
            }
            filas.Close();
            conexion.Close();
            return operacionTarjetaDTO;
        }

        public List<OperacionTarjetaDTO> buscarOperacionesTarjetas(int idUsuario)
        {
            comando.CommandText = string.Format(
            "SELECT " +
                "opc.idoperaciontarjeta," +
                "opc.IdUsuarioReceptor," +
                "opc.idtarjeta," +
                "opc.fecha," +
                "opc.hora," +
                "opc.monto," +
                "opc.referencia " +
            "FROM tarjeta tar, operaciontarjeta opc " +
            "WHERE tar.idtarjeta = opc.idtarjeta " +
            "AND tar.idusuario = {0} " +
            "UNION " +
            "SELECT " +
                "opc.idoperaciontarjeta," +
                "opc.IdUsuarioReceptor," +
                "opc.idtarjeta," +
                "opc.fecha," +
                "opc.hora," +
                "opc.monto," +
                "opc.referencia " +
            "FROM operaciontarjeta opc " +
            "WHERE opc.IdUsuarioReceptor = {0} " +
            "ORDER BY idoperaciontarjeta DESC", idUsuario);
            conexion.Open();
            filas = comando.ExecuteReader();
            List<OperacionTarjetaDTO> operacionTarjetaDTOs = new List<OperacionTarjetaDTO>();
            while (filas.Read())
            {
                operacionTarjetaDTOs.Add(new OperacionTarjetaDTO
                {
                    Idoperaciontarjeta = filas.GetInt32(0),
                    IdUsuarioReceptor = filas.GetInt32(1),
                    Idtarjeta = filas.GetInt32(2),
                    Fecha = filas.GetDateTime(3),
                    Hora = filas.GetTimeSpan(4),
                    Monto = filas.GetFloat(5),
                    Referencia = filas.GetInt32(6),
            });
            }
            filas.Close();
            conexion.Close();
            return operacionTarjetaDTOs;
        }

        public void crear()
        {
            throw new NotImplementedException();
        }

        public void eliminar()
        {
            throw new NotImplementedException();
        }

        public void realizar(int idTarjeta, string usuarioReceptor, float monto, int referencia)
        {
            comando.CommandText = string.Format(
                "insert into operaciontarjeta(" +
                    "idtarjeta," +
                    "idusuarioreceptor," +
                    "fecha," +
                    "hora," +
                    "monto," +
                    "referencia" +
                ") " +
                "values" +
                "({0}, (SELECT us.idusuario FROM usuario us WHERE us.usuario = '{1}'), now(), CURRENT_TIMESTAMP, {2}, {3})",
                idTarjeta, usuarioReceptor, monto, referencia);
            conexion.Open();
            comando.ExecuteNonQuery();
            conexion.Close();
        }

         public List<OperacionTarjetaDTO> FiltrarByFechas(int idusuario,string fechainicio, string fechafinal)
        {
            comando.CommandText = string.Format(
            "SELECT " +
            "op.fecha, " +
            "op.hora, " + 
            "op.monto, " +
            "op.referencia " +
            "FROM operaciontarjeta op, usuario us, tarjeta ta " +
            "WHERE op.fecha between to_date('{1}','yyyy-MM-dd') and to_date('{2}','yyyy-MM-dd') " +
            "AND us.idusuario = {0} " +
            "AND us.idusuario = ta.idusuario ", idusuario,fechainicio, fechafinal
                );
            conexion.Open();
            filas = comando.ExecuteReader();
            List<OperacionTarjetaDTO> operacionTarjetaDTOs = new List<OperacionTarjetaDTO>();
            while (filas.Read())
            {
                operacionTarjetaDTOs.Add (new OperacionTarjetaDTO
                {
                    Fecha = filas.GetDateTime(0),
                    Hora = filas.GetTimeSpan(1),
                    Monto = filas.GetInt32(2),
                    Referencia = filas.GetInt32(3),
                });
                    
            }
            filas.Close();
            conexion.Close();
            return operacionTarjetaDTOs;
        }
    }
}