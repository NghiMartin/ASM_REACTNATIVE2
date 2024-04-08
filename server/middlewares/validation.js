const validateDto = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log({error});
    if (error) {
      const message = error.details[0].message?.replaceAll(`\"`, "");
      return 'error';
    }
    next();
  };
  
  module.exports = validateDto;