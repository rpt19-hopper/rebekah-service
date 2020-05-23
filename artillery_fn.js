function genRandomProductId(context, events, done) {
  context.vars.id = Math.floor(Math.random() * 1000000) + 9000000;
  return done();
}

module.exports = { genRandomProductId }