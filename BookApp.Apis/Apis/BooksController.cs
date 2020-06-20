using BookApp.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BookApp.Apis.Controllers
{
    [ApiController]
    [Route("api/Books")]
    [Produces("application/json")]
    public class BooksController : ControllerBase
    {
        private readonly IBookRepository _repository;
        private readonly ILogger _logger;

        public BooksController(IBookRepository repository, ILoggerFactory loggerFactory)
        {
            this._repository = repository ?? throw new ArgumentNullException(nameof(BooksController));
            this._logger = loggerFactory.CreateLogger(nameof(BooksController));
        }

        #region 출력
        // 출력
        // GET api/Books
        [HttpGet] // [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var models = await _repository.GetAllAsync();
                if (!models.Any())
                {
                    return new NoContentResult(); // 참고용 코드
                }
                return Ok(models); // 200 OK
            }
            catch (Exception e)
            {
                _logger.LogError(e.Message);
                return BadRequest();
            }
        }
        #endregion
    }
}
