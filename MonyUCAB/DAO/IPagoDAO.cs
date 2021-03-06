﻿using MonyUCAB.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonyUCAB.DAO
{
    interface IPagoDAO
    {
        int solicitar(int idUsuarioSolicitante, string userReceptor, float monto);
        List<PagoDTO> pagosSolicitadosSolicitante(int idUsuarioSolicitante);
        List<PagoDTO> pagosSolicitadosReceptor(int idUsuarioReceptor);
        decimal saldo(int idUsuario);
        void actualizarSolicitudPagada(int referencia);
        void actualizarPagoReintegrado(int idReintegro);
        List<PagoDTO> cierre(int idUsuario);
        void bloquearPago(int referencia);
    }
}
