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

                return Ok();
            }
        }

        [HttpGet]
        [Route("files")]
        public async Task<IActionResult> GetFiles()
        {
            var files = await _hpDbcontext.MedicalFiles.Select(f => new
            {
                f.Id,
                f.FileName
            }).ToListAsync();

            return Ok(files);
        }

        [HttpGet]
        [Route("download/{id}")]
        public async Task<IActionResult> DownloadFile(int id)
        {
            var file = await _hpDbcontext.MedicalFiles.FindAsync(id);
            if (file == null)
            {
                return NotFound();
            }

            return File(file.Content, file.FileName);
        }
    }
}