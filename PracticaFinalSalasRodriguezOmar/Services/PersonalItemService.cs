using Microsoft.Extensions.Options;
using MongoDB.Driver;
using PracticaFinalSalasRodriguezOmar.Databases;
using PracticaFinalSalasRodriguezOmar.Models;

namespace PracticaFinalSalasRodriguezOmar.services
{
	public class PersonalItemService
	{
        private readonly IMongoCollection<PersonaItemModel> _personalItemCollection;


        public PersonalItemService(IOptions<MongoConnection> mongoConnection)
        {
            var mongoClient = new MongoClient(mongoConnection.Value.Connection);
            var mongoDatabase = mongoClient.GetDatabase(mongoConnection.Value.DatabaseName);
            this._personalItemCollection = mongoDatabase.GetCollection<PersonaItemModel>(mongoConnection.Value.CollectionName);
        }

        // GET
        public async Task<List<PersonaItemModel>> Get()
        {
            return await this._personalItemCollection.Find(_ => true).ToListAsync();
        }

        // GET BY ID
        public async Task<PersonaItemModel?> GetById(string id)
        {
            return await this._personalItemCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        }

        // POST
        public async Task Create(PersonaItemModel foodModel)
        {
            await this._personalItemCollection.InsertOneAsync(foodModel);
        }

        // PATCH
        public async Task Patch(string id, PersonaItemModel updateFoodModel)
        {
            await this._personalItemCollection.ReplaceOneAsync(x => x.Id == id, updateFoodModel);
        }

        // DELETE BY ID
        public async Task DeleteById(string id)
        {
            await this._personalItemCollection.DeleteOneAsync(x => x.Id == id);
        }
    }
}

