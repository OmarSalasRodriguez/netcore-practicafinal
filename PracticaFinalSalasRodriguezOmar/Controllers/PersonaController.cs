using System;
using Microsoft.AspNetCore.Mvc;
using PracticaFinalSalasRodriguezOmar.services;
using PracticaFinalSalasRodriguezOmar.Models;

namespace PracticaFinalSalasRodriguezOmar.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonaController : ControllerBase
	{
        private readonly PersonalItemService _personalItemService;

        public PersonaController(PersonalItemService foodService)
        {
            this._personalItemService = foodService;
        }

        // GET
        [HttpGet]
        public async Task<List<PersonaItemModel>> Get()
        {
            return await this._personalItemService.Get();
        }

        // GET BY ID
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<PersonaItemModel>> GetById(string id)
        {
            var foodModel = await this._personalItemService.GetById(id);
            if (foodModel is null) return NotFound();

            return foodModel;
        }

        // POST
        [HttpPost]
        public async Task<IActionResult> Post(PersonaItemModel newFoodModel)
        {
            await _personalItemService.Create(newFoodModel);
            return CreatedAtAction(nameof(Get), new { id = newFoodModel.Id }, newFoodModel);
        }

        // PATCH
        [HttpPatch("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, PersonaItemModel updateFoodModel)
        {
            var foodModel = await this._personalItemService.GetById(id);
            if (foodModel is null) return NotFound();

            updateFoodModel.Id = foodModel.Id;

            await this._personalItemService.Patch(id, updateFoodModel);
            return NoContent();
        }

        // DELETE
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var foodModel = await this._personalItemService.GetById(id);
            if (foodModel is null) return NotFound();

            await this._personalItemService.DeleteById(id);

            return NoContent();
        }
    }
}

