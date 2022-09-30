using Microsoft.AspNetCore.Mvc;

namespace Test.Controllers
{
    public class SubscriptionsController : Controller
    {


        private readonly TestContext _context;

        public SubscriptionsController(TestContext context)
        {

            _context = context;
        }


        public IActionResult Index()
        {
            return View();
        }



        public async Task<ActionResult> SearchUser([FromBody] Suscriptor model)
        {

            try
            {


                var user = _context.Suscriptors.Where(p => p.NumeroDocumento.Equals(model.NumeroDocumento)
                                             && p.TipoDocumento.Equals(model.TipoDocumento))
                                      .Select(t => t).FirstOrDefault();



                return Ok(user);
            }
            catch (Exception)
            {
                return BadRequest();

            }




        }


        public async Task<ActionResult> AddSuscriptor([FromBody] Suscriptor model)
        {

            try
            {
                /*valido user name*/
                var username = _context.Suscriptors.Where(p => p.NombreUsuario.Equals(model.NombreUsuario))
                                 .Select(t => t.NombreUsuario).FirstOrDefault();

                /*valido tipo y number*/
                var user = _context.Suscriptors.Where(p => p.NumeroDocumento.Equals(model.NumeroDocumento)
                                     && p.TipoDocumento.Equals(model.TipoDocumento))
                              .Select(t => t).FirstOrDefault();

                if (username != null)
                {
                    //si username existe 
                    return Ok(201);

                }
                else if (user != null)
                {
                    //si tipo y nro ya existe
                    return Ok(202);

                }
                else
                {

                    _context.Add(model);
                    await _context.SaveChangesAsync();
                    return Ok(200);

                }






            }
            catch (Exception)
            {
                return BadRequest();

            }




        }

        public async Task<ActionResult> UpdateSuscriptor([FromBody] Suscriptor model)
        {

            try
            {


                var user = _context.Suscriptors.Where(u => u.NombreUsuario.Equals(model.NombreUsuario)).First();
                    user.Nombre=model.Nombre;
                    user.Apellido = model.Apellido;
                user.Direccion= model.Direccion;
                user.Telefono= model.Telefono;
                user.Email= model.Email;
                user.Password= model.Password;

                await _context.SaveChangesAsync();
                return Ok(200);






            }
            catch (Exception)
            {
                return BadRequest();

            }




        }



        public async Task<ActionResult> AddSuscripcion([FromBody] Suscripcion model)
        {

            try
            {

            //valido que no tenga ninguna suscripcion
                var suscripcion = _context.Suscripcions.Where(p => p.IdSuscriptor.Equals(model.IdSuscriptor))
                              .Select(t => t).FirstOrDefault();


                //si ya tiene una
                if (suscripcion != null)
                {


                    return Ok(201);

                }
                else
                {

                    _context.Add(model);
                    await _context.SaveChangesAsync();
                    return Ok(200);

                }






            }
            catch (Exception)
            {
                return BadRequest();

            }




        }

        


    }
}
