using System;
using System.Collections.Generic;

namespace Test.Db.Models
{
    public partial class Suscripcion
    {
        public int IdAsociacion { get; set; }
        public int IdSuscriptor { get; set; }
        public DateTime FechaAlta { get; set; }
        public DateTime FechaFin { get; set; }
        public string MotivoFin { get; set; } = null!;
    }
}
