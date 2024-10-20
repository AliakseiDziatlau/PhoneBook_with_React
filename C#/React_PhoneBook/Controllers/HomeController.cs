using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React_PhoneBook.Models;
using React_PhoneBook.Services;

namespace React_PhoneBook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;

        private ApplicationContext db;

        public HomeController(ILogger<HomeController> logger, ApplicationContext context)
        {
            db = context;
            _logger = logger;
        }

        [HttpGet("getitem")]
        public IActionResult GetPhoneItems()
        {
            try
            {
                var phoneItems = db.Person.ToList();
                return Ok(phoneItems);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Ошибка при получении данных из базы.");
                return StatusCode(500, "Ошибка при получении данных.");
            }
        }

        [HttpPost("updateitem")]
        public IActionResult UpdateElement([FromBody] PersonItem phoneItem)
        {
            if (phoneItem == null || phoneItem.Id == 0)
            {
                return BadRequest("Invalid phone item.");
            }

            var existingItem = db.Person.Find(phoneItem.Id);
            if (existingItem == null)
            {
                return NotFound("Phone item not found.");
            }

            existingItem.Name = phoneItem.Name;
            existingItem.Phone_number = phoneItem.Phone_number;
            existingItem.Country = phoneItem.Country;
            existingItem.City = phoneItem.City;
            existingItem.Street = phoneItem.Street;
            existingItem.Phone_number = phoneItem.Phone_number;
            existingItem.Email = phoneItem.Email;

            db.SaveChanges();

            return Ok();
        }

        [HttpPost("additem")]
        public IActionResult AddElement(PersonItem phoneItem)
        {
            if (phoneItem == null)
            {
                return BadRequest("Invalid phone item.");
            }

            db.Person.Add(phoneItem);
            db.SaveChanges();

            return CreatedAtAction(nameof(AddElement), new { id = phoneItem.Id }, phoneItem);
        }

        [HttpPost("deleteitem")]
        public IActionResult DeletePhone([FromBody] int id)
        {
            try
            {
                PersonItem item = new PersonItem()
                {
                    Id = id
                };

                db.Person.Attach(item);
                db.Person.Remove(item);
                db.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("filteritems")]
        public IActionResult GetFilteredList([FromBody] PhoneItemFilter PhoneItemFilter)
        {
            IQueryable<PersonItem> _listPhone = db.Person;

            // Фильтрация по имени
            if (!string.IsNullOrEmpty(PhoneItemFilter.Name))
            {
                _listPhone = _listPhone.Where(x => x.Name.Contains(PhoneItemFilter.Name));
            }

            // Фильтрация по номеру телефона
            if (!string.IsNullOrEmpty(PhoneItemFilter.Phone))
            {
                _listPhone = _listPhone.Where(x => x.Phone_number.Contains(PhoneItemFilter.Phone));
            }

            // Фильтрация по стране
            if (!string.IsNullOrEmpty(PhoneItemFilter.Country))
            {
                _listPhone = _listPhone.Where(x => x.Country.Contains(PhoneItemFilter.Country));
            }

            // Фильтрация по улице
            if (!string.IsNullOrEmpty(PhoneItemFilter.Street))
            {
                _listPhone = _listPhone.Where(x => x.Street.Contains(PhoneItemFilter.Street));
            }

            // Преобразование в список
            var filteredList = _listPhone.ToList();

            // Возвращаем новый отфильтрованный список в формате JSON
            return Ok(filteredList);
        }

    }
}
