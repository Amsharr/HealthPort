using HealthPort.API.Data;
using HealthPort.API.DTO;
using HealthPort.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HealthPort.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicalFilesController : Controller
    {
        private readonly hpDbcontext _hpDbcontext;
        public MedicalFilesController(hpDbcontext hpDbcontext)
        {
            _hpDbcontext = hpDbcontext;
        }

        [HttpPost]
        [Route("upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("File is empty");
            }

            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var fileContent = memoryStream.ToArray();

                var medicalFile = new MedicalFiles
                {
                    FileName = file.FileName,
                    Content = fileContent
                };

                _hpDbcontext.MedicalFiles.Add(medicalFile);
                await _hpDbcontext.SaveChangesAsync();

                return Ok("File uploaded successfully");
            }
        }
    }
}