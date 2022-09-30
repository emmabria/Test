using System;
using System.Collections.Generic;

namespace Test.Db.Models
{
    public partial class Suscriptor
    {
        public int IdSuscriptor { get; set; }
        public string Nombre { get; set; } = null!;
        public string Apellido { get; set; } = null!;
        public string NumeroDocumento { get; set; } = null!;
        public int TipoDocumento { get; set; }
        public string Direccion { get; set; } = null!;
        public string Telefono { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string NombreUsuario { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}
