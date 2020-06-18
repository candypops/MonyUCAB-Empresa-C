﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MonyUCAB.DTO
{
    public class OperacionTarjetaDTO
    {
		int _Idoperaciontarjeta;
		int _IdUsuarioReceptor;
		int _Idtarjeta;
		DateTime _Fecha;
        TimeSpan _Hora;
		float _Monto;
		string _Referencia;

        public int Idoperaciontarjeta { get => _Idoperaciontarjeta; set => _Idoperaciontarjeta = value; }
        public int IdUsuarioReceptor { get => _IdUsuarioReceptor; set => _IdUsuarioReceptor = value; }
        public int Idtarjeta { get => _Idtarjeta; set => _Idtarjeta = value; }
        public DateTime Fecha { get => _Fecha; set => _Fecha = value; }
        public TimeSpan Hora { get => _Hora; set => _Hora = value; }
        public float Monto { get => _Monto; set => _Monto = value; }
        public string Referencia { get => _Referencia; set => _Referencia = value; }
    }
}