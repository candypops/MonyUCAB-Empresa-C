﻿using MonyUCAB.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MonyUCAB.DAO
{
    interface IContrasenaDAO
    {
        void registrarContrasena(int idUsuario, string contrasena);
        void CambiarPassword(int idusuario, string nuevaPass, string viejaPass);
        ContrasenaDTO buscarcontrasenavieja(int idusuario);
    }
}
