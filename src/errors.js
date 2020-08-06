module.exports.RecordNotFoundError = class RecordNotFoundError extends Error {
  constructor(entity, id) {
    super();
    this.ErrorName = 'RecordNotFoundError';
    this.message = `${entity} not found with uuid ${id}`
  }
}