// Exemplo de middleware
const exampleMiddleware = (req, res, next) => {
  console.log("Passou pelo middleware de exemplo");
  next();
};

export default exampleMiddleware;
