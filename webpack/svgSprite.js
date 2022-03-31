function requireAll(r) {
  r.keys().forEach(r);
}

requireAll(require.context('../src/images/', true, /\.svg$/));
