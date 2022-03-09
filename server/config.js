const ENV = process.env;

module.exports = {
    mongoUri: ENV['MONGO_URI'],
    PORT: ENV['PORT'] || 8000,
};
