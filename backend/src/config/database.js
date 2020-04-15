module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  port: '5432',
  database: 'eventmanager',
  define: {
    timestamps: true,
    underscored: true,
  },
}